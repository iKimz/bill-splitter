/**
 * Standard Thailand PromptPay EMVCo QR Code Payload Generator
 */

function crc16(data: string): string {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    let x = ((crc >> 8) ^ data.charCodeAt(i)) & 0xff;
    x ^= x >> 4;
    crc = ((crc << 8) ^ (x << 12) ^ (x << 5) ^ x) & 0xffff;
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

function formatTag(id: string, value: string): string {
  const len = value.length.toString().padStart(2, '0');
  return `${id}${len}${value}`;
}

export function sanitizePromptPayId(target: string): { type: 'phone' | 'id' | 'invalid'; sanitized: string } {
  const cleaned = target.replace(/[^0-9]/g, '');
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    // Mobile number: 0812345678 -> 0066812345678
    return { type: 'phone', sanitized: `0066${cleaned.substring(1)}` };
  } else if (cleaned.length === 13) {
    // National ID
    return { type: 'id', sanitized: cleaned };
  }
  return { type: 'invalid', sanitized: '' };
}

export function generatePromptPayPayload(target: string, amount?: number): string {
  const { type, sanitized } = sanitizePromptPayId(target);
  if (type === 'invalid') return '';

  const payloadFormat = formatTag('00', '01');
  const initiationMethod = formatTag('01', amount && amount > 0 ? '12' : '11');

  // Merchant account info (ID 29)
  const aid = formatTag('00', 'A000000677010111');
  let targetTag = '';
  if (type === 'phone') {
    targetTag = formatTag('01', sanitized);
  } else {
    targetTag = formatTag('02', sanitized);
  }
  const merchantInfo = formatTag('29', `${aid}${targetTag}`);

  const currency = formatTag('53', '764'); // THB
  const country = formatTag('58', 'TH');

  let amountTag = '';
  if (amount && amount > 0) {
    const formattedAmount = amount.toFixed(2);
    amountTag = formatTag('54', formattedAmount);
  }

  const rawPayload = `${payloadFormat}${initiationMethod}${merchantInfo}${currency}${amountTag}${country}6304`;
  const checksum = crc16(rawPayload);

  return `${rawPayload}${checksum}`;
}
