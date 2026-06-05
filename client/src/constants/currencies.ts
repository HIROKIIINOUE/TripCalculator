export type CurrencyDefinition = {
  code: string;
  countryCodes: string[];
  priority?: number;
};

export type LocalizedCurrencyOption = CurrencyDefinition & {
  currencyName: string;
  countryNames: string[];
  label: string;
  searchText: string;
};

export const currencyDefinitions: CurrencyDefinition[] = [
  { code: "CAD", countryCodes: ["CA"], priority: 1 },
  { code: "USD", countryCodes: ["US", "EC", "SV"], priority: 2 },
  { code: "EUR", countryCodes: ["FR", "DE", "IT", "ES"], priority: 3 },
  { code: "JPY", countryCodes: ["JP"], priority: 4 },
  { code: "AED", countryCodes: ["AE"] },
  { code: "AFN", countryCodes: ["AF"] },
  { code: "ALL", countryCodes: ["AL"] },
  { code: "AMD", countryCodes: ["AM"] },
  { code: "AOA", countryCodes: ["AO"] },
  { code: "ARS", countryCodes: ["AR"] },
  { code: "AUD", countryCodes: ["AU"] },
  { code: "AZN", countryCodes: ["AZ"] },
  { code: "BAM", countryCodes: ["BA"] },
  { code: "BDT", countryCodes: ["BD"] },
  { code: "BGN", countryCodes: ["BG"] },
  { code: "BHD", countryCodes: ["BH"] },
  { code: "BIF", countryCodes: ["BI"] },
  { code: "BND", countryCodes: ["BN"] },
  { code: "BOB", countryCodes: ["BO"] },
  { code: "BRL", countryCodes: ["BR"] },
  { code: "BWP", countryCodes: ["BW"] },
  { code: "BYN", countryCodes: ["BY"] },
  { code: "BZD", countryCodes: ["BZ"] },
  { code: "CDF", countryCodes: ["CD"] },
  { code: "CHF", countryCodes: ["CH", "LI"] },
  { code: "CLP", countryCodes: ["CL"] },
  { code: "CNY", countryCodes: ["CN"] },
  { code: "COP", countryCodes: ["CO"] },
  { code: "CRC", countryCodes: ["CR"] },
  { code: "CUP", countryCodes: ["CU"] },
  { code: "CZK", countryCodes: ["CZ"] },
  { code: "DJF", countryCodes: ["DJ"] },
  { code: "DKK", countryCodes: ["DK"] },
  { code: "DOP", countryCodes: ["DO"] },
  { code: "DZD", countryCodes: ["DZ"] },
  { code: "EGP", countryCodes: ["EG"] },
  { code: "ETB", countryCodes: ["ET"] },
  { code: "GBP", countryCodes: ["GB"] },
  { code: "GEL", countryCodes: ["GE"] },
  { code: "GHS", countryCodes: ["GH"] },
  { code: "GNF", countryCodes: ["GN"] },
  { code: "GTQ", countryCodes: ["GT"] },
  { code: "HKD", countryCodes: ["HK"] },
  { code: "HNL", countryCodes: ["HN"] },
  { code: "HRK", countryCodes: ["HR"] },
  { code: "HUF", countryCodes: ["HU"] },
  { code: "IDR", countryCodes: ["ID"] },
  { code: "ILS", countryCodes: ["IL"] },
  { code: "INR", countryCodes: ["IN"] },
  { code: "IQD", countryCodes: ["IQ"] },
  { code: "IRR", countryCodes: ["IR"] },
  { code: "ISK", countryCodes: ["IS"] },
  { code: "JMD", countryCodes: ["JM"] },
  { code: "JOD", countryCodes: ["JO"] },
  { code: "KES", countryCodes: ["KE"] },
  { code: "KGS", countryCodes: ["KG"] },
  { code: "KHR", countryCodes: ["KH"] },
  { code: "KPW", countryCodes: ["KP"] },
  { code: "KRW", countryCodes: ["KR"] },
  { code: "KWD", countryCodes: ["KW"] },
  { code: "KZT", countryCodes: ["KZ"] },
  { code: "LAK", countryCodes: ["LA"] },
  { code: "LBP", countryCodes: ["LB"] },
  { code: "LKR", countryCodes: ["LK"] },
  { code: "MAD", countryCodes: ["MA"] },
  { code: "MDL", countryCodes: ["MD"] },
  { code: "MGA", countryCodes: ["MG"] },
  { code: "MKD", countryCodes: ["MK"] },
  { code: "MMK", countryCodes: ["MM"] },
  { code: "MNT", countryCodes: ["MN"] },
  { code: "MOP", countryCodes: ["MO"] },
  { code: "MUR", countryCodes: ["MU"] },
  { code: "MXN", countryCodes: ["MX"] },
  { code: "MYR", countryCodes: ["MY"] },
  { code: "MZN", countryCodes: ["MZ"] },
  { code: "NAD", countryCodes: ["NA"] },
  { code: "NGN", countryCodes: ["NG"] },
  { code: "NIO", countryCodes: ["NI"] },
  { code: "NOK", countryCodes: ["NO"] },
  { code: "NPR", countryCodes: ["NP"] },
  { code: "NZD", countryCodes: ["NZ"] },
  { code: "OMR", countryCodes: ["OM"] },
  { code: "PAB", countryCodes: ["PA"] },
  { code: "PEN", countryCodes: ["PE"] },
  { code: "PHP", countryCodes: ["PH"] },
  { code: "PKR", countryCodes: ["PK"] },
  { code: "PLN", countryCodes: ["PL"] },
  { code: "PYG", countryCodes: ["PY"] },
  { code: "QAR", countryCodes: ["QA"] },
  { code: "RON", countryCodes: ["RO"] },
  { code: "RSD", countryCodes: ["RS"] },
  { code: "RUB", countryCodes: ["RU"] },
  { code: "RWF", countryCodes: ["RW"] },
  { code: "SAR", countryCodes: ["SA"] },
  { code: "SDG", countryCodes: ["SD"] },
  { code: "SEK", countryCodes: ["SE"] },
  { code: "SGD", countryCodes: ["SG"] },
  { code: "SOS", countryCodes: ["SO"] },
  { code: "SYP", countryCodes: ["SY"] },
  { code: "THB", countryCodes: ["TH"] },
  { code: "TND", countryCodes: ["TN"] },
  { code: "TRY", countryCodes: ["TR"] },
  { code: "TTD", countryCodes: ["TT"] },
  { code: "TWD", countryCodes: ["TW"] },
  { code: "TZS", countryCodes: ["TZ"] },
  { code: "UAH", countryCodes: ["UA"] },
  { code: "UGX", countryCodes: ["UG"] },
  { code: "UYU", countryCodes: ["UY"] },
  { code: "UZS", countryCodes: ["UZ"] },
  { code: "VES", countryCodes: ["VE"] },
  { code: "VND", countryCodes: ["VN"] },
  { code: "XAF", countryCodes: ["CM", "GA"] },
  { code: "XOF", countryCodes: ["SN", "CI"] },
  { code: "YER", countryCodes: ["YE"] },
  { code: "ZAR", countryCodes: ["ZA"] },
  { code: "ZMW", countryCodes: ["ZM"] },
  { code: "ZWL", countryCodes: ["ZW"] },
];

export const supportedCurrencyCodes = currencyDefinitions.map(
  (currency) => currency.code,
);

export const getLocalizedCurrencyOptions = (
  language: string,
): LocalizedCurrencyOption[] => {
  const currencyNames = new Intl.DisplayNames([language], {
    type: "currency",
  });
  const regionNames = new Intl.DisplayNames([language], {
    type: "region",
  });

  return currencyDefinitions
    .map((currency) => {
      const currencyName = currencyNames.of(currency.code) ?? currency.code;
      const countryNames = currency.countryCodes.map(
        (countryCode) => regionNames.of(countryCode) ?? countryCode,
      );

      return {
        ...currency,
        currencyName,
        countryNames,
        label: `${currency.code} - ${currencyName} (${countryNames.join(", ")})`,
        searchText: [
          currency.code,
          currencyName,
          ...countryNames,
          ...currency.countryCodes,
        ]
          .join(" ")
          .toLowerCase(),
      };
    })
    .sort((first, second) => {
      const firstPriority = first.priority ?? Number.MAX_SAFE_INTEGER;
      const secondPriority = second.priority ?? Number.MAX_SAFE_INTEGER;

      if (firstPriority !== secondPriority) {
        return firstPriority - secondPriority;
      }

      return first.label.localeCompare(second.label);
    });
};
