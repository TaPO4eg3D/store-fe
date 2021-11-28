export interface Currency {
  code: string,
  display: string,
  rate: number,
  title?: string,
  currencyCode?: string
}

export interface CurrencyResponse {
  default: Currency;
  available: Currency[];
}
