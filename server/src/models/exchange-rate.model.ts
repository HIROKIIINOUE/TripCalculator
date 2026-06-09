import { prisma } from "../lib/prisma";

// 1つの通貨を基準にした各国の外貨変換レートリストをsnapshotとして返す
const getByBaseCurrency = async (baseCurrency: string) => {
  const snapshot = await prisma.exchangeRateSnapshot.findUnique({
    where: {
      baseCurrency,
    },
  });

  return snapshot;
};

// 通貨レートを更新、データが存在しなければ追加
const upsert = async (
  baseCurrency: string,
  ratesJson: Record<string, number>,
  fetchedAt: Date,
) => {
  const snapshot = await prisma.exchangeRateSnapshot.upsert({
    where: {
      baseCurrency,
    },
    update: {
      ratesJson,
      fetchedAt,
    },
    create: {
      baseCurrency,
      ratesJson,
      fetchedAt,
    },
  });

  return snapshot;
};

export default {
  getByBaseCurrency,
  upsert,
};
