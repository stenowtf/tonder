import { en } from "./en";

export const defaultLocale = "en";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getKey = (obj: any, path: string) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  path.split(".").reduce((a, b) => (a as any)[b], obj);

export const translate = (key: string, locale: "en" | "it" = defaultLocale) => {
  switch (locale) {
    case "en": {
      const value = getKey(en, key);
      return value || key;
    }
    case "it":
      // Add Italian translations here in the future
      return key; // Fallback to key for now
    default:
      break;
  }
};
