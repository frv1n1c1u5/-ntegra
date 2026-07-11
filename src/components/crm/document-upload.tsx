"use client";
import { UploadCloud } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
export function DocumentUpload({caseId}:{caseId:string}) {
  const router=useRouter(); const [status,setStatus]=useState(""); const [busy,setBusy]=useState(false);
  async function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();setBusy(true);setStatus("");const form=new FormData(event.currentTarget);form.set("case_id",caseId);const response=await fetch("/api/documents",{method:"POST",body:form});const result=await response.json();setBusy(false);if(!response.ok){setStatus(result.error||"Falha no envio.");return;}event.currentTarget.reset();setStatus("Documento enviado.");router.refresh();}
  return <form className="document-upload" onSubmit={submit}><label>Categoria<select name="category" defaultValue="lamina"><option value="lamina">Lâmina</option><option value="nota_aplicacao">Nota de aplicação</option><option value="extrato">Extrato</option><option value="conversa">Conversa / e-mail</option><option value="perfil">Perfil do investidor</option><option value="contrato">Contrato</option><option value="relatorio">Relatório</option><option value="outros">Outros</option></select></label><label className="file-picker"><UploadCloud size={20}/><span>Selecionar PDF, imagem ou DOCX<small>Máximo de 20 MB</small></span><input type="file" name="file" required accept=".pdf,.png,.jpg,.jpeg,.docx"/></label><button className="app-button primary" disabled={busy}>{busy?"Enviando...":"Enviar documento"}</button>{status&&<p className="upload-status">{status}</p>}</form>;
}

