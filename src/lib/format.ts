/** Máscara de telefone brasileiro: (11) 91234-5678 */
export function maskPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** Deixa cada palavra do nome com inicial maiúscula. */
export function maskName(value: string): string {
  return value.replace(/\s+/g, " ").replace(/\b\p{L}/gu, (c) => c.toUpperCase());
}

/** True quando o telefone tem ao menos 10 dígitos (DDD + número). */
export function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 10;
}
