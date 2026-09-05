const NON_DIGIT_REGEX = /\D/g;

export const DDI_OPTIONS = [
  {
    value: '55',
    label: '🇧🇷 Brasil (+55)',
  },
  {
    value: '1',
    label: '🇺🇸 EUA/Canadá (+1)',
  },
  {
    value: '351',
    label: '🇵🇹 Portugal (+351)',
  },
  {
    value: '34',
    label: '🇪🇸 Espanha (+34)',
  },
  {
    value: '44',
    label: '🇬🇧 Reino Unido (+44)',
  },
  {
    value: '33',
    label: '🇫🇷 França (+33)',
  },
  {
    value: '39',
    label: '🇮🇹 Itália (+39)',
  },
  {
    value: '49',
    label: '🇩🇪 Alemanha (+49)',
  },
  {
    value: '52',
    label: '🇲🇽 México (+52)',
  },
  {
    value: '54',
    label: '🇦🇷 Argentina (+54)',
  },
  {
    value: '56',
    label: '🇨🇱 Chile (+56)',
  },
  {
    value: '57',
    label: '🇨🇴 Colômbia (+57)',
  },
];

export function onlyDigits(value = '') {
  return String(value).replace(NON_DIGIT_REGEX, '');
}

export function getMaxLocalDigits(ddi) {
  const ddiDigits = onlyDigits(ddi);

  // E.164 aceita no máximo 15 dígitos.
  return Math.max(4, 15 - ddiDigits.length);
}

export function normalizePhoneInput(ddi, value) {
  const maxLength = getMaxLocalDigits(ddi);

  return onlyDigits(value).slice(0, maxLength);
}

function formatBrazilianPhone(phone) {
  const digits = phone.slice(0, 11);

  if (digits.length === 0) {
    return '';
  }

  if (digits.length <= 2) {
    return `(${digits}`;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

function formatNorthAmericanPhone(phone) {
  const digits = phone.slice(0, 10);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

function formatGenericPhone(phone) {
  return phone
    .replace(/(\d{3})(?=\d)/g, '$1 ')
    .trim();
}

export function formatPhoneInput(ddi, phone) {
  const normalized = normalizePhoneInput(ddi, phone);

  if (ddi === '55') {
    return formatBrazilianPhone(normalized);
  }

  if (ddi === '1') {
    return formatNorthAmericanPhone(normalized);
  }

  return formatGenericPhone(normalized);
}

export function getFullPhoneNumber(ddi, phone) {
  return `${onlyDigits(ddi)}${onlyDigits(phone)}`;
}

export function validatePhoneNumber(ddi, phone) {
  const localNumber = normalizePhoneInput(ddi, phone);

  if (!localNumber) {
    return {
      valid: false,
      fullNumber: '',
      message: 'Informe o número do WhatsApp.',
    };
  }

  const fullNumber = getFullPhoneNumber(ddi, localNumber);

  if (fullNumber.length < 8) {
    return {
      valid: false,
      fullNumber,
      message: 'O número informado parece incompleto.',
    };
  }

  if (fullNumber.length > 15) {
    return {
      valid: false,
      fullNumber,
      message: 'O número excede o limite internacional de 15 dígitos.',
    };
  }

  return {
    valid: true,
    fullNumber,
    message: '',
  };
}

export function buildWhatsAppLink({
  ddi,
  phone,
  message = '',
}) {
  const validation = validatePhoneNumber(ddi, phone);

  if (!validation.valid) {
    return '';
  }

  const baseUrl = `https://wa.me/${validation.fullNumber}`;

  if (!message) {
    return baseUrl;
  }

  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

export function getQrPayloadByteLength(value) {
  if (!value) {
    return 0;
  }

  if (typeof TextEncoder !== 'undefined') {
    return new TextEncoder().encode(value).length;
  }

  return new Blob([value]).size;
}

export function canGenerateQrCode(value) {
  /*
   * Mantemos margem de segurança abaixo da capacidade máxima
   * para evitar QR excessivamente denso ou falha de renderização.
   */
  return getQrPayloadByteLength(value) <= 2000;
}
