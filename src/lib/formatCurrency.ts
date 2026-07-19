const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount);
}

/** Discount percentage between a compared-at price and the current price. */
export function getSavingsPercent(comparedAtPrice: number, price: number): number {
  if (comparedAtPrice <= 0) return 0;
  return Math.floor((1 - price / comparedAtPrice) * 100);
}
