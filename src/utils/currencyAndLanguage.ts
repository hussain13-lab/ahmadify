import { CurrencyCode, LanguageCode } from '../types';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rate: number; // Conversion rate relative to GBP (1 GBP)
  flag: string;
}

export interface LanguageConfig {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 1.0, flag: '🇬🇧' },
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.28, flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 1.17, flag: '🇪🇺' },
  { code: 'AED', symbol: 'AED ', name: 'UAE Dirham', rate: 4.70, flag: '🇦🇪' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', rate: 1.74, flag: '🇨🇦' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.94, flag: '🇦🇺' },
  { code: 'SAR', symbol: 'SAR ', name: 'Saudi Riyal', rate: 4.80, flag: '🇸🇦' },
  { code: 'PKR', symbol: 'Rs ', name: 'Pakistani Rupee', rate: 355.0, flag: '🇵🇰' },
];

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: 'en', name: 'English', nativeName: 'English (UK)', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇦🇪' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰' },
];

export function formatCurrencyPrice(amount: number, currencyCode: CurrencyCode = 'GBP'): string {
  const curr = SUPPORTED_CURRENCIES.find((c) => c.code === currencyCode) || SUPPORTED_CURRENCIES[0];
  const converted = amount * curr.rate;
  if (currencyCode === 'PKR') {
    return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${curr.symbol}${converted.toFixed(2)}`;
}
