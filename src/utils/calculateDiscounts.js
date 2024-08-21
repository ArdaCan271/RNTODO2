const calculateDiscountedUnitPrice = (unitPrice, discounts, ratioInPercent) => {
  let discountedPrice = unitPrice;

  if (ratioInPercent) {
    // When discounts are in percentages
    discounts.forEach(( discount ) => {
      discountedPrice *= (1 - parseFloat(discount)) / 100;
    });
  } else {
    // When discounts are direct multipliers
    discounts.forEach(( discount ) => {
      discountedPrice /= parseFloat(discount);
    });
  }  

  return discountedPrice.toFixed(2);
};

export { calculateDiscountedUnitPrice };