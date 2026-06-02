// 翻訳データを i18next に登録して、言語の決定ルールを定義している初期化ファイル。Main.tsで初期化のexportを忘れない。
import i18n, { type Resource } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { SUPPORTED_LANGUAGES, type LanguageKey } from "../types/language.type";
import { commonTranslations } from "../locales/common";
import { authTranslations } from "../locales/auth";

// reduceは配列を 1 つの値に畳み込むためのメソッド。今回は一つのオブジェクトを作成している。
const resources = SUPPORTED_LANGUAGES.reduce((acc, lang) => {
  acc[lang] = {
    common: commonTranslations[lang],
    auth: authTranslations[lang],
  };
  return acc;
}, {} as Resource);

if (!i18n.isInitialized) {
  void i18n
    .use(LanguageDetector)
    .use(initReactI18next) // reactでuserTranslation()を使えるようにする
    .init({
      resources,
      fallbackLng: "en",
      supportedLngs: SUPPORTED_LANGUAGES,
      defaultNS: "common", // common内の翻訳の記載はnamespaceを書かずに省略できる
      ns: ["common", "auth"],
      detection: {
        order: ["localStorage", "navigator"], // 読み取り順「1,ローカル、2,ブラウザ言語」
        caches: ["localStorage"], // キャッシュはローカル保存
      },
      interpolation: {
        escapeValue: false,
      },
      compatibilityJSON: "v4",
      returnNull: false,
    });
}

export type AppResource = typeof resources;

export const isSupportedLanguage = (
  lang?: string | null,
): lang is LanguageKey =>
  !!lang && SUPPORTED_LANGUAGES.includes(lang as LanguageKey);

export default i18n;
