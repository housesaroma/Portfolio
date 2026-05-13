/** Инициалы из полного имени: первые буквы первого и последнего слова. */
export function getInitials(fullName: string, explicit?: string) {
  if (explicit?.trim()) return explicit.trim().toUpperCase();
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0]?.[0];
    const b = parts[parts.length - 1]?.[0];
    if (a && b) return (a + b).toUpperCase();
  }
  return (parts[0]?.slice(0, 2) ?? "?").toUpperCase();
}
