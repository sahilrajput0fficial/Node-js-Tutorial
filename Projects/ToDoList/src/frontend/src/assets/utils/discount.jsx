// price: original price
// discountPercent: discount in percent (e.g., 20 for 20%)
function discount(price, discountPercent) {
  // Make sure both are numbers
  const p = Number(price);
  const d = Number(discountPercent);

  if (isNaN(p) || isNaN(d)) return 0;

  // Calculate discounted price
  return Math.round(p - (p * d) / 100);
}

export default discount;
