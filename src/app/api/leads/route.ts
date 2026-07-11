import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { leadSchema, normalizePhone } from "@/lib/leads";

const requests = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 8;

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = requests.get(ip);
  if (!current || current.resetAt < now) {
    requests.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Muitas tentativas. Aguarde alguns minutos." }, { status: 429 });
  }

  const parsed = leadSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Revise os dados informados." }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const normalizedPhone = normalizePhone(parsed.data.phone);
    const { data: duplicate } = await supabase
      .from("leads")
      .select("id")
      .or(`normalized_phone.eq.${normalizedPhone},email.ilike.${parsed.data.email}`)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { data, error } = await supabase
      .from("leads")
      .insert({
        name: parsed.data.name,
        phone: parsed.data.phone,
        normalized_phone: normalizedPhone,
        email: parsed.data.email.toLowerCase(),
        institution: parsed.data.institution,
        issue_type: parsed.data.issueType,
        amount_range: parsed.data.amount,
        urgency: parsed.data.urgency,
        notes: parsed.data.notes,
        consent_at: new Date().toISOString(),
        consent_text_version: "2026-07-v1",
        duplicate_of: duplicate?.id || null
      })
      .select("id")
      .single();

    if (error) throw error;
    return NextResponse.json({ id: data.id, duplicate: Boolean(duplicate) }, { status: 201 });
  } catch (error) {
    console.error("lead_capture_failed", error);
    return NextResponse.json(
      { error: "Não foi possível registrar a triagem agora. Tente novamente." },
      { status: 503 }
    );
  }
}

