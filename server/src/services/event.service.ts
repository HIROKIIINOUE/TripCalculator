// イベントデータに必要な「自国通貨の金額(price_your_currency)」「レート根拠(appliedExchangeRate)」を算出する

import eventModel from "../models/event.model";
import { CreateEventBody } from "../schemas/event.schema";
import { getExchangeRate } from "./exchange-rate.service";

const calculateYourCurrencyPrice = (
  priceLocalCurrency: number,
  appliedExchangeRate: number,
) => {
  return Math.round(priceLocalCurrency * appliedExchangeRate);
};

// controllerからDB追加modelを呼ぶのではなく、ここで必要情報を算出してからDB追加modelを呼ぶ
const createEventWithConvertedPrice = async (
  userId: number,
  tripId: number,
  data: CreateEventBody,
) => {
  const yourCurrency = await eventModel.getYourCurrency(userId, tripId);

  if (!yourCurrency) {
    return null;
  }

  const { rate } = await getExchangeRate(
    data.localCurrency,
    yourCurrency.yourCurrency,
  );

  const newEvent = await eventModel.add(userId, tripId, {
    ...data,
    priceYourCurrency: calculateYourCurrencyPrice(
      data.priceLocalCurrency,
      rate,
    ),
    appliedExchangeRate: rate,
  });

  return newEvent;
};

export { calculateYourCurrencyPrice, createEventWithConvertedPrice };
