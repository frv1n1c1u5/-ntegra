import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { leadSchema, normalizePhone } from "@/lib/leads";
const requests=new Map<string,{count:number;resetAt:number}>();const WINDOW_MS=10*60*1000;const MAX_REQUESTS=8;const MAX_BODY_BYTES=16_000;
function limited(ip:string){const now=Date.now();const current=requests.get(ip);if(!current||current.resetAt<now){requests.set(ip,{count:1,resetAt:now+WINDOW_MS});return false}current.count+=1;return current.count>MAX_REQUESTS}
function allowedOrigin(request:NextRequest){const origin=request.headers.get("origin");if(!origin)return true;try{return new URL(origin).host===request.nextUrl.host}catch{return false}}
export async function POST(request:NextRequest){
  if(!allowedOrigin(request))return NextResponse.json({error:"Origem nao permitida."},{status:403});
  if(!request.headers.get("content-type")?.toLowerCase().startsWith("application/json"))return NextResponse.json({error:"Formato de requisicao invalido."},{status:415});
  const declaredLength=Number(request.headers.get("content-length")||0);if(declaredLength>MAX_BODY_BYTES)return NextResponse.json({error:"Requisicao muito grande."},{status:413});
  const ip=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown";if(limited(ip))return NextResponse.json({error:"Muitas tentativas. Aguarde alguns minutos."},{status:429,headers:{"Retry-After":String(WINDOW_MS/1000)}});
  const raw=await request.text();if(new TextEncoder().encode(raw).length>MAX_BODY_BYTES)return NextResponse.json({error:"Requisicao muito grande."},{status:413});
  let body:unknown;try{body=JSON.parse(raw)}catch{return NextResponse.json({error:"Revise os dados informados."},{status:400})}
  const parsed=leadSchema.safeParse(body);if(!parsed.success)return NextResponse.json({error:"Revise os dados informados."},{status:400});
  try{const supabase=createAdminClient();const normalizedPhone=normalizePhone(parsed.data.phone);const email=parsed.data.email.toLowerCase();const[phoneMatch,emailMatch]=await Promise.all([supabase.from("leads").select("id").eq("normalized_phone",normalizedPhone).order("created_at",{ascending:false}).limit(1).maybeSingle(),supabase.from("leads").select("id").ilike("email",email).order("created_at",{ascending:false}).limit(1).maybeSingle()]);const duplicate=phoneMatch.data||emailMatch.data;const{data,error}=await supabase.from("leads").insert({name:parsed.data.name,phone:parsed.data.phone,normalized_phone:normalizedPhone,email,institution:parsed.data.institution,issue_type:parsed.data.issueType,amount_range:parsed.data.amount,urgency:parsed.data.urgency,notes:parsed.data.notes,consent_at:new Date().toISOString(),consent_text_version:"2026-07-v2",duplicate_of:duplicate?.id||null}).select("id").single();if(error)throw error;return NextResponse.json({id:data.id,duplicate:Boolean(duplicate)},{status:201})}catch(error){console.error("lead_capture_failed",error instanceof Error?error.name:"unknown_error");return NextResponse.json({error:"Nao foi possivel registrar a triagem agora. Tente novamente."},{status:503})}
}
