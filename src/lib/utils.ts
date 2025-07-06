export function parseExpiryDate(date: string): string {
  const [year, month] = date.split("-");
  return `${year.slice(2, 4)}/${month}`;
}
