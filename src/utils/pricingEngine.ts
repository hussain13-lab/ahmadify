import { PricingRule, SupplierId, CurrencyCode } from '../types';

export interface PricingCalculationResult {
  supplierCostGbp: number;
  shippingCostGbp: number;
  totalCostGbp: number;
  appliedRuleName: string;
  calculatedPriceGbp: number;
  sellingPriceGbp: number;
  originalPriceGbp: number;
  profitGbp: number;
  profitMarginPercent: number;
  automaticDiscountPercent: number;
}

const CURRENCY_TO_GBP_RATES: Record<CurrencyCode, number> = {
  GBP: 1.0,
  USD: 0.78,
  EUR: 0.86,
  AED: 0.21,
  CAD: 0.58,
  AUD: 0.52,
  PKR: 0.0028,
  SAR: 0.21,
};

export function calculateSellingPrice(
  supplierPrice: number,
  shippingCost: number = 0,
  supplierCurrency: CurrencyCode = 'USD',
  category: string = 'General',
  brand: string = 'General',
  supplierId: SupplierId = 'cj_dropshipping',
  rules: PricingRule[] = []
): PricingCalculationResult {
  // Convert currency to GBP
  const rate = CURRENCY_TO_GBP_RATES[supplierCurrency] || 0.78;
  const supplierCostGbp = Number((supplierPrice * rate).toFixed(2));
  const shippingCostGbp = Number((shippingCost * rate).toFixed(2));
  const totalCostGbp = Number((supplierCostGbp + shippingCostGbp).toFixed(2));

  // Find best matching rule (Specific supplier & category -> Specific supplier -> Specific category -> Global)
  let matchedRule = rules.find(
    (r) => r.active && r.supplierId === supplierId && r.category === category
  );

  if (!matchedRule) {
    matchedRule = rules.find((r) => r.active && r.supplierId === supplierId && r.category === 'all');
  }

  if (!matchedRule) {
    matchedRule = rules.find((r) => r.active && r.category === category && r.supplierId === 'all');
  }

  if (!matchedRule) {
    matchedRule = rules.find((r) => r.active && r.supplierId === 'all' && r.category === 'all');
  }

  // Default rule if no rules defined
  const percentage = matchedRule ? matchedRule.percentageValue : 45;
  const fixed = matchedRule ? matchedRule.fixedValue : 0;
  const rounding = matchedRule ? matchedRule.roundingMode : 'round_99';
  const minProfit = matchedRule ? matchedRule.minProfitMargin : 5.0;
  const includeShipping = matchedRule ? matchedRule.includeShippingInMarkup : true;
  const ruleName = matchedRule ? matchedRule.name : 'Default 45% Markup';
  const autoDiscount = matchedRule ? matchedRule.automaticDiscountPercent : 0;

  const baseForMarkup = includeShipping ? totalCostGbp : supplierCostGbp;
  let rawSellingPrice = baseForMarkup * (1 + percentage / 100) + fixed;

  // Enforce minimum profit guard
  let profit = rawSellingPrice - totalCostGbp;
  if (profit < minProfit) {
    rawSellingPrice = totalCostGbp + minProfit;
    profit = minProfit;
  }

  // Apply rounding mode
  let finalSellingPrice = rawSellingPrice;
  if (rounding === 'round_99') {
    finalSellingPrice = Math.floor(rawSellingPrice) + 0.99;
    if (finalSellingPrice < rawSellingPrice) finalSellingPrice += 1.0;
  } else if (rounding === 'round_95') {
    finalSellingPrice = Math.floor(rawSellingPrice) + 0.95;
    if (finalSellingPrice < rawSellingPrice) finalSellingPrice += 1.0;
  } else {
    finalSellingPrice = Number(rawSellingPrice.toFixed(2));
  }

  // Recalculate exact profit and margin
  const finalProfit = Number((finalSellingPrice - totalCostGbp).toFixed(2));
  const profitMarginPercent = Number(((finalProfit / finalSellingPrice) * 100).toFixed(1));

  // Suggested original price for discount display
  const originalPriceGbp = Number((finalSellingPrice * 1.35).toFixed(2));

  return {
    supplierCostGbp,
    shippingCostGbp,
    totalCostGbp,
    appliedRuleName: ruleName,
    calculatedPriceGbp: Number(rawSellingPrice.toFixed(2)),
    sellingPriceGbp: Number(finalSellingPrice.toFixed(2)),
    originalPriceGbp,
    profitGbp: finalProfit,
    profitMarginPercent,
    automaticDiscountPercent: autoDiscount,
  };
}
