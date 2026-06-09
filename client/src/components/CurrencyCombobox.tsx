import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCheck, FaChevronDown, FaMagnifyingGlass } from "react-icons/fa6";
import {
  getLocalizedCurrencyOptions,
  type CurrencyDefinition,
} from "../constants/currencies";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const CurrencyCombobox = ({ value, onChange }: Props) => {
  const { i18n } = useTranslation();
  const [query, setQuery] = useState("");
  const language = i18n.resolvedLanguage ?? i18n.language ?? "en";
  const options = getLocalizedCurrencyOptions(language);
  const selectedOption =
    options.find((option) => option.code === value) ?? null;
  const filteredOptions =
    query.trim() === ""
      ? options
      : options.filter((option) =>
        option.searchText.includes(query.trim().toLowerCase()),
      );

  const handleChange = (option: CurrencyDefinition | null) => {
    if (!option) {
      return;
    }

    onChange(option.code);
    setQuery("");
  };

  return (
    <Combobox value={selectedOption} onChange={handleChange} >
      <div className="relative">
        <div className="relative overflow-hidden rounded-2xl border border-orange-200 bg-white/90 shadow-sm transition focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
            <FaMagnifyingGlass className="size-4" />
          </div>
          <ComboboxInput
            aria-label="Currency"
            displayValue={(option: CurrencyDefinition | null) => {
              if (!option) {
                return "";
              }

              const localizedOption = options.find(
                (currency) => currency.code === option.code,
              );

              return localizedOption?.label ?? option.code;
            }}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Select currency"
            autoComplete="off"
            className="w-full border-none bg-transparent py-3 pl-11 pr-12 text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400 sm:text-base"
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center px-4 text-orange-400 transition hover:text-orange-500">
            <FaChevronDown className="size-4" />
          </ComboboxButton>
        </div>

        <ComboboxOptions className="absolute z-[60] mt-3 max-h-72 w-full overflow-auto rounded-2xl border border-orange-100 bg-white/95 p-2 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.28)] ring-1 ring-orange-100 empty:invisible">
          {filteredOptions.length === 0 ? (
            <div className="px-4 py-3 text-sm text-slate-500">
              No currencies found
            </div>
          ) : (
            filteredOptions.map((option) => (
              <ComboboxOption
                key={option.code}
                value={option}
                className="group flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-700 transition data-focus:bg-orange-50 data-focus:text-orange-600"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold">{option.code}</p>
                  <p className="truncate text-xs text-slate-500 group-data-focus:text-orange-500 sm:text-sm">
                    {option.currencyName} ({option.countryNames.join(", ")})
                  </p>
                </div>
                <FaCheck className="ml-3 hidden size-4 text-orange-500 group-data-selected:block" />
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
};

export default CurrencyCombobox;
