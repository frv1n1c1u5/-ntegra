const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5551999381379";

export const qualifiedWhatsAppMessage = [
  "Olá, Íntegra. Quero solicitar o Dossiê Expresso (R$ 229, entrega em até 48h).",
  "Produto e instituição: ",
  "Prazo ou urgência: ",
  "O que eu preciso entender antes de decidir: ",
].join("\n");

export const qualifiedWhatsAppUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(qualifiedWhatsAppMessage)}`;
