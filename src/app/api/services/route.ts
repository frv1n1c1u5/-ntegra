import { NextResponse } from "next/server";
import { fallbackPublicServices } from "@/lib/services";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  if (!hasSupabaseConfig()) return NextResponse.json(fallbackPublicServices);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("id,slug,name,badge,description,pricing_model,base_price,percentage_rate,price_label_override,price_note,features,featured,sort_order")
    .eq("active", true)
    .eq("public_visible", true)
    .order("sort_order");
  const response = NextResponse.json(error || !data?.length ? fallbackPublicServices : data);
  response.headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  return response;
}
