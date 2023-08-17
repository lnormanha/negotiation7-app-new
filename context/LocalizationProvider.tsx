import { create } from "apisauce";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

import en from "../translations/en.json";
import pt from "../translations/pt.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const translations = {
  en,
  pt,
};

type LocalizationProvierProps<T> = {
  children: T;
};

type LocalizationContextProps = {
  currentLocale: string;
  getLocaleString(localeString: string): void;
  changeLocale(locale: string): void;
};

const LocalizationContext = createContext({} as LocalizationContextProps);

function LocalizationProvider({
  children,
}: LocalizationProvierProps<ReactNode>) {
  const [i18n, setI18n] = useState(new I18n(translations));

  const [currentLocale, setCurrentLocale] = useState(i18n.locale);

  useEffect(() => {
    AsyncStorage.getItem("language").then((res) => {
      if (res != null) {
        changeLocale(res);
      }
    });
  }, []);

  function getLocaleString(localeString: string) {
    return i18n.t(localeString);
  }

  function changeLocale(locale: string) {
    let i18n = new I18n(translations);
    i18n.locale = locale;
    setCurrentLocale(locale);
    setI18n(i18n);

    AsyncStorage.setItem("language", locale);
  }

  return (
    <LocalizationContext.Provider
      value={{ currentLocale, getLocaleString, changeLocale }}
    >
      {children}
    </LocalizationContext.Provider>
  );
}

const useLocalization = () => useContext(LocalizationContext);

export { LocalizationProvider, useLocalization };
