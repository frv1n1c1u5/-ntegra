import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
const allowed=new Set(["application/pdf","image/png","image/jpeg","application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);
const categories=new Set(["lamina","nota_aplicacao","extrato","contrato","suitability","comunicacao","relatorio","outros"]);
async function signatureMatches(file:File){const bytes=new Uint8Array(await file.slice(0,8).arrayBuffer());const starts=(values:number[])=>values.every((value,index)=>bytes[index]===value);if(file.type==="application/pdf")return starts([0x25,0x50,0x44,0x46]);if(file.type==="image/png")return starts([0x89,0x50,0x4e,0x47]);if(file.type==="image/jpeg")return starts([0xff,0xd8,0xff]);if(file.type.includes("wordprocessingml"))return starts([0x50,0x4b,0x03,0x04]);return false}
export async function POST(request:NextRequest){
  const supabase=await createClient();const{data:auth}=await supabase.auth.getUser();if(!auth.user)return NextResponse.json({error:"Nao autorizado."},{status:401});
  const{data:profile}=await supabase.from("profiles").select("status").eq("id",auth.user.id).single();if(profile?.status!=="active")return NextResponse.json({error:"Acesso inativo."},{status:403});
  const form=await request.formData();const file=form.get("file");const caseId=String(form.get("case_id")||"");const category=String(form.get("category")||"outros");
  if(!(file instanceof File)||!caseId)return NextResponse.json({error:"Arquivo ou caso invalido."},{status:400});
  if(file.size<=0||file.size>20*1024*1024||!allowed.has(file.type)||!categories.has(category)||!(await signatureMatches(file)))return NextResponse.json({error:"Formato, categoria ou conteudo do arquivo nao permitido."},{status:400});
  const{data:caseRow}=await supabase.from("cases").select("id,client_id").eq("id",caseId).single();if(!caseRow)return NextResponse.json({error:"Caso nao encontrado."},{status:404});
  const safeName=file.name.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9._-]/g,"-").replace(/\.{2,}/g,".").slice(-100)||"documento";const documentId=crypto.randomUUID();const path=`${caseRow.client_id}/${caseId}/${documentId}-${safeName}`;
  const{error:uploadError}=await supabase.storage.from("case-documents").upload(path,file,{contentType:file.type,upsert:false});if(uploadError)return NextResponse.json({error:"Nao foi possivel armazenar o arquivo."},{status:500});
  const{error:dbError}=await supabase.from("documents").insert({id:documentId,case_id:caseId,category,original_name:file.name.slice(0,180),storage_path:path,mime_type:file.type,size_bytes:file.size,uploaded_by:auth.user.id});if(dbError){await supabase.storage.from("case-documents").remove([path]);return NextResponse.json({error:"Nao foi possivel registrar o documento."},{status:500})}
  await supabase.from("activities").insert({actor_id:auth.user.id,entity_type:"case",entity_id:caseId,action:"document_uploaded",metadata:{document_id:documentId,category,mime_type:file.type,size_bytes:file.size}});return NextResponse.json({id:documentId},{status:201});
}
