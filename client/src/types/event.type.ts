export type TripDetailEvent = {
  id: number;
  date: string;
  title: string;
  localCurrency: string;
  priceLocalCurrency: number;
  priceYourCurrency: number;
  detail: string;
};

export type EventInputForm = {
  title: string;
  date: string;
  localCurrency: string;
  priceLocalCurrency: string;
  detail: string;
};

export type ExchangeRatePreview = {
  localCurrency: string;
  yourCurrency: string;
  appliedExchangeRate: number;
};
