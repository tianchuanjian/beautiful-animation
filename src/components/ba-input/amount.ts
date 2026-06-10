export function stripThousandSeparators(value: string) {
  return value.replace(/,/g, '');
}

export function sanitizeAmountInput(value: string, decimalPlaces: number) {
  if (!value) {
    return '';
  }

  const normalizedDecimalPlaces = Math.max(0, decimalPlaces);
  const cleaned = stripThousandSeparators(value).replace(/[^\d.]/g, '');

  if (!cleaned) {
    return '';
  }

  const firstDotIndex = cleaned.indexOf('.');
  const hasDot = firstDotIndex !== -1;
  const integerSource = hasDot ? cleaned.slice(0, firstDotIndex) : cleaned;
  const decimalSource = hasDot ? cleaned.slice(firstDotIndex + 1).replace(/\./g, '') : '';

  let integerPart = integerSource.replace(/^0+(?=\d)/, '');

  if (!integerPart && hasDot) {
    integerPart = '0';
  }

  if (normalizedDecimalPlaces === 0) {
    return integerPart;
  }

  if (!hasDot) {
    return integerPart;
  }

  return `${integerPart}.${decimalSource.slice(0, normalizedDecimalPlaces)}`;
}

export function formatAmountDisplay(value: string, useThousandSeparator: boolean) {
  if (!value) {
    return '';
  }

  if (!useThousandSeparator) {
    return value;
  }

  const hasDot = value.includes('.');
  const endsWithDot = value.endsWith('.');
  const [integerPart, decimalPart = ''] = value.split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (endsWithDot) {
    return `${formattedInteger}.`;
  }

  if (hasDot) {
    return `${formattedInteger}.${decimalPart}`;
  }

  return formattedInteger;
}

export function toDisplayValue(value: string | number | null | undefined, decimalPlaces: number, useThousandSeparator: boolean) {
  const raw = value == null ? '' : String(value);
  const sanitized = sanitizeAmountInput(raw, decimalPlaces);

  return formatAmountDisplay(sanitized, useThousandSeparator);
}
