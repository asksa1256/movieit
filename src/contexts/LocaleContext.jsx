import { createContext, useState, useContext } from "react";

const LocaleContext = createContext();

export function LocaleProvider({ defaultValue = "ko", children }) {
  const [locale, setLocale] = useState(defaultValue);
  return (
    <LocaleContext.Provider
      value={{
        locale,
        setLocale,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale: LocaleProvider 내부에서 사용해주세요.");
  }
  return context.locale;
};

export const useSetLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useSetLocale: LocaleProvider 내부에서 사용해주세요.");
  }
  return context.setLocale;
};
