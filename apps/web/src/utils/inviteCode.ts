export function isDigit(char: string): boolean {
  return /^\d$/.test(char);
}

export function isValidInviteCode(value: string, expectedLength: number): boolean {
  const isAllDigits = /^\d+$/.test(value);
  return value.length === expectedLength && isAllDigits;
}
