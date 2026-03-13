export type Locale = "fr" | "en";

const dictionaries = {
  fr: () => import("../locales/fr.json").then((m) => m.default),
  en: () => import("../locales/en.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["fr"]>>;

export async function getDictionary(locale: Locale) {
  if (!(locale in dictionaries)) {
    return dictionaries.fr();
  }
  
  return dictionaries[locale]();
}

