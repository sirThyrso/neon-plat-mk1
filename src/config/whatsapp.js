// Número real com DDI e DDD, somente dígitos. Deixe vazio até configurar.
export const WHATSAPP_NUMBER = '5513997391390';
export const GENERAL_CONTACT_MESSAGE = 'Olá! Conheci a NEON//PLAT pelo site e gostaria de saber mais sobre os serviços de platinas.';

export function getWhatsAppUrl(message, number = WHATSAPP_NUMBER) {
  if (!/^[1-9]\d{7,14}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
