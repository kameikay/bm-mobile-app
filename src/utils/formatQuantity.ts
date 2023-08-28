export default function formatQuantity(quantity: number): string {
  return quantity.toFixed(2).replace(".", ",");
}
