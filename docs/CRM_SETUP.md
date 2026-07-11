# Configuração do CRM Íntegra

## 1. Criar o projeto Supabase

1. Crie um projeto em `database.new`.
2. No SQL Editor, aplique em ordem os arquivos de `supabase/migrations`.
3. Confirme que o bucket privado `case-documents` foi criado.

## 2. Configurar o ambiente

Copie `.env.example` para `.env.local` e preencha:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (somente servidor)
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

Cadastre as mesmas variáveis na Vercel. Nunca exponha a chave `service_role` com prefixo `NEXT_PUBLIC_`.

## 3. Criar os usuários internos

No Supabase Dashboard, use Authentication > Users > Invite user. Convide apenas os sócios. O trigger da migração cria o perfil interno automaticamente.

## 4. Validar antes da produção

- Envie uma triagem pela landing e confirme o lead no CRM.
- Converta o lead em cliente e caso.
- Envie e baixe um PDF de teste.
- Verifique RLS usando um usuário não cadastrado/inativo.
- Confirme que uma URL antiga de documento expira.
- Teste logout e recuperação da sessão.

## Segurança operacional

- Ative MFA para os usuários internos no Supabase quando disponível no fluxo escolhido.
- Não envie a chave administrativa ao navegador.
- Revise usuários ativos mensalmente.
- Defina política de retenção antes de receber documentos reais.
- O rate limit em memória do formulário é uma proteção inicial; adote um limitador distribuído antes de campanhas de alto volume.

