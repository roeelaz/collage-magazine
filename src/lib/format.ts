export function formatPrice(agorot: number): string {
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
  }).format(agorot / 100);
}

export function formatHebrewDate(date: Date): string {
  return new Intl.DateTimeFormat("he-IL", { dateStyle: "long" }).format(date);
}
