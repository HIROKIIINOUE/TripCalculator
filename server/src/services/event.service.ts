// イベントデータに必要な「自国通貨の金額(price_your_currency)」「レート根拠(appliedExchangeRate)」を算出する

import eventModel from "../models/event.model";
import { CreateEventBody, UpdateEventBody } from "../schemas/event.schema";
import { getExchangeRate } from "./exchange-rate.service";

const MAX_EVENT_PRICE = 2147483647;
const CONVERTED_PRICE_TOO_LARGE_MESSAGE = "converted_price_too_large";

// 支払い金額を自国通貨で算出
const calculateYourCurrencyPrice = (
  priceLocalCurrency: number,
  appliedExchangeRate: number,
) => {
  return Math.round(priceLocalCurrency * appliedExchangeRate);
};

const validateConvertedPrice = (priceYourCurrency: number) => {
  if (priceYourCurrency > MAX_EVENT_PRICE) {
    throw new Error(CONVERTED_PRICE_TOO_LARGE_MESSAGE);
  }
};

// controllerからDB追加modelを呼ぶのではなく、ここで必要情報を算出し、ここでDB追加modelを呼ぶ
const createEventWithConvertedPrice = async (
  userId: number,
  tripId: number,
  data: CreateEventBody,
) => {
  const yourCurrency = await eventModel.getYourCurrency(userId, tripId);

  if (!yourCurrency) {
    return null;
  }

  const { rate } = await getExchangeRate(data.localCurrency, yourCurrency);
  const priceYourCurrency = calculateYourCurrencyPrice(
    data.priceLocalCurrency,
    rate,
  );
  validateConvertedPrice(priceYourCurrency);

  const newEvent = await eventModel.add(userId, tripId, {
    ...data,
    priceYourCurrency,
    appliedExchangeRate: rate,
  });

  return newEvent;
};

// 「ローカル通貨」「ユーザ自国通貨」「換算に使う２通貨間の比率」を返す
const getEventExchangeRatePreview = async (
  userId: number,
  tripId: number,
  localCurrency: string,
) => {
  const yourCurrency = await eventModel.getYourCurrency(userId, tripId);

  if (!yourCurrency) {
    return null;
  }

  const exchangeRateResult = await getExchangeRate(localCurrency, yourCurrency);

  return {
    localCurrency: exchangeRateResult.baseCurrency,
    yourCurrency: exchangeRateResult.targetCurrency,
    appliedExchangeRate: exchangeRateResult.rate,
  };
};

// 通貨換金の再計算と更新処理
const updateEventWithConvertedPrice = async (
  userId: number,
  eventId: number,
  data: UpdateEventBody,
) => {
  const targetEvent = await eventModel.getById(userId, eventId);

  if (!targetEvent) {
    return null;
  }

  // ローカル通貨と金額(ローカル)に変更がなければ再計算無しのシンプルな更新処理
  const shouldRecalculate =
    data.localCurrency !== undefined || data.priceLocalCurrency !== undefined;

  if (!shouldRecalculate) {
    return eventModel.update(userId, eventId, data);
  }

  const yourCurrency = await eventModel.getYourCurrency(
    userId,
    targetEvent.tripId,
  );

  if (!yourCurrency) {
    return null;
  }

  const localCurrency = data.localCurrency ?? targetEvent.localCurrency;
  const priceLocalCurrency =
    data.priceLocalCurrency ?? targetEvent.priceLocalCurrency;
  const { rate } = await getExchangeRate(localCurrency, yourCurrency);
  const priceYourCurrency = calculateYourCurrencyPrice(priceLocalCurrency, rate);
  validateConvertedPrice(priceYourCurrency);

  return eventModel.update(userId, eventId, {
    ...data,
    localCurrency,
    priceLocalCurrency,
    priceYourCurrency,
    appliedExchangeRate: rate,
  });
};

export {
  CONVERTED_PRICE_TOO_LARGE_MESSAGE,
  calculateYourCurrencyPrice,
  createEventWithConvertedPrice,
  getEventExchangeRatePreview,
  updateEventWithConvertedPrice,
};
