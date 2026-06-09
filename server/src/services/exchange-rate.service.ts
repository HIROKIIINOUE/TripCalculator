import exchangeRateModel from "../models/exchange-rate.model";

const EXCHANGE_RATE_API_BASE_URL =
  process.env.EXCHANGE_RATE_API_BASE_URL ??
  "https://v6.exchangerate-api.com/v6";
const EXCHANGE_RATE_API_KEY = process.env.EXCHANGE_RATE_API_KEY;
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // life span: 1 Day

type ExchangeRatesSnapshot = {
  baseCurrency: string;
  rates: Record<string, number>;
  fetchedAt: Date;
  source: "cache" | "api";
};

// データの寿命を判定し基準より古ければ(今回は1日)更新対象としてfalse(フレッシュじゃない)を返す
const isSnapshotFresh = (fetchedAt: Date, now: Date = new Date()) => {
  return now.getTime() - fetchedAt.getTime() < CACHE_DURATION_MS;
};

// 外貨換算レートのデータを外部APIから取得し、supabaseDBに保存する
const fetchLatestRatesFromApi = async (
  baseCurrency: string,
): Promise<ExchangeRatesSnapshot> => {
  if (!EXCHANGE_RATE_API_KEY) {
    throw new Error("EXCHANGE_RATE_API_KEY is not set");
  }

  const res = await fetch(
    `${EXCHANGE_RATE_API_BASE_URL}/${EXCHANGE_RATE_API_KEY}/latest/${baseCurrency}`,
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch exchange rates: ${res.status}`);
  }

  const data = await res.json();

  if (data.result !== "success") {
    throw new Error(`Exchange rate API error: ${data["error-type"]}`);
  }

  // API元(exchangerate-api.com)で通貨が更新された時間を基準にし、1日が経過しているかどうか(更新するべきかどうか)を判断する
  // exchangerate-api.comは日次(24hに1回)更新される
  const fetchedAt = new Date(data.time_last_update_utc);

  await exchangeRateModel.upsert(
    data.base_code,
    data.conversion_rates,
    fetchedAt,
  );

  return {
    baseCurrency: data.base_code,
    rates: data.conversion_rates,
    fetchedAt,
    source: "api",
  };
};

// 呼び出し元で指定された「通貨」を基準にした外貨換算レートリストをDB(DBデータが古ければ外部API)から取得する
const getLatestRates = async (
  baseCurrency: string,
): Promise<ExchangeRatesSnapshot> => {
  const normalizedBaseCurrency = baseCurrency.trim().toUpperCase();
  const existingSnapshot = await exchangeRateModel.getByBaseCurrency(
    normalizedBaseCurrency,
  );

  if (existingSnapshot && isSnapshotFresh(existingSnapshot.fetchedAt)) {
    return {
      baseCurrency: existingSnapshot.baseCurrency,
      rates: existingSnapshot.ratesJson as Record<string, number>,
      fetchedAt: existingSnapshot.fetchedAt,
      source: "cache",
    };
  }

  return fetchLatestRatesFromApi(normalizedBaseCurrency);
};

// 外貨の換算に必要なレートデータの取得
// レートデータ、対象イベントのローカル通貨、ユーザ自国通貨とローカル通貨の比率の3つのデータを返す。
const getExchangeRate = async (
  baseCurrency: string,
  targetCurrency: string,
) => {
  const normalizedTargetCurrency = targetCurrency.trim().toUpperCase();
  const snapshot = await getLatestRates(baseCurrency);
  const rate = snapshot.rates[normalizedTargetCurrency];

  if (typeof rate !== "number") {
    throw new Error(
      `Exchange rate is not available for ${snapshot.baseCurrency} -> ${normalizedTargetCurrency}`,
    );
  }

  return {
    ...snapshot,
    targetCurrency: normalizedTargetCurrency,
    rate,
  };
};

export {
  CACHE_DURATION_MS,
  fetchLatestRatesFromApi,
  getLatestRates,
  getExchangeRate,
  isSnapshotFresh,
};
