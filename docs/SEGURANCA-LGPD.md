# Programa mínimo de Segurança e LGPD - Íntegra Consultoria

Versão operacional: 2026-07-v1

Este documento é um procedimento interno e não substitui revisão jurídica.

## Responsáveis

- Controlador: preencher razão social e CNPJ após abertura.
- Responsáveis internos: Vinicius Rocha e Emerson Monteiro.
- Canal do titular: WhatsApp oficial +55 51 99938-1379.
- Fornecedores atuais: Vercel (aplicação) e Supabase (autenticação, banco e arquivos).

## Regras de operação

1. Coletar no formulário apenas dados necessários à triagem.
2. Não solicitar extratos, documentos pessoais ou lâminas por formulário público.
3. Compartilhar documentos somente no caso autenticado correspondente.
4. Não baixar documentos em computadores compartilhados.
5. Usar senhas únicas, gerenciador de senhas e MFA no GitHub, Vercel e Supabase.
6. Revisar usuários ativos e acessos a cada trimestre e após qualquer desligamento.
7. Não enviar chaves, senhas, links de recuperação ou documentos pelo chat.
8. Confirmar a identidade antes de entregar cópia, corrigir ou excluir dados.

## Retenção proposta para validação jurídica

- Lead não convertido: revisar após 6 meses; eliminar ou anonimizar em até 12 meses quando não houver justificativa de retenção.
- Caso contratado: conservar durante a execução e pelo prazo legal/contratual ou de defesa de direitos aplicável.
- Documento duplicado, incorreto ou desnecessário: excluir assim que identificado e registrar a ação.
- Logs de auditoria: preservar enquanto necessários à segurança e responsabilização.

## Atendimento a titulares

1. Registrar data, identidade declarada, pedido e canal.
2. Confirmar o recebimento e abrir tarefa no CRM.
3. Validar identidade de forma proporcional ao risco.
4. Localizar dados em leads, clientes, casos, documentos e atividades.
5. Avaliar exceções legais antes de excluir.
6. Responder pelo mesmo canal seguro e registrar a conclusão.

## Incidente de segurança

1. Conter: revogar sessões, chaves e acessos afetados.
2. Preservar evidências: horário, usuários, registros e dados envolvidos.
3. Avaliar natureza, volume, titulares, impacto e medidas já adotadas.
4. Acionar suporte técnico e assessor jurídico.
5. Avaliar comunicação à ANPD e aos titulares conforme regra vigente.
6. Registrar causa raiz, correção e prevenção de recorrência.

## Rotina mensal

- Conferir usuários do Supabase, GitHub e Vercel.
- Revisar tarefas e casos encerrados com documentos excessivos.
- Verificar falhas de login, erros de API e uploads incomuns.
- Confirmar que backups e restauração estão disponíveis no plano contratado.
- Atualizar inventário quando surgir fornecedor, integração ou nova finalidade.

## Pendências antes da captação

- [ ] Preencher razão social e CNPJ no aviso.
- [ ] Validar aviso, contrato e bases legais com advogado.
- [ ] Habilitar MFA em todas as contas administrativas.
- [ ] Definir e testar backup/restauração do Supabase.
- [ ] Criar e-mail corporativo dedicado a privacidade.
- [ ] Configurar proteção/rate limiting persistente no Vercel Firewall.
