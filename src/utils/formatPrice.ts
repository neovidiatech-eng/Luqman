export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ar-SA').format(price) + ' ر.س'
}
