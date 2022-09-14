import { createI18n } from "vue-i18n";
import { Locale } from "vant";
import enUS from "@/locales/vant/en-US";
import zhCN from "@/locales/vant/zh-CN";
import esES from "@/locales/vant/es-ES";
import store from "../store";
import messages from "./getLang";

export function Locals(lang) {
  switch (lang) {
    case "cn":
      Locale.use("cn", zhCN);
      break;
    case "en":
      Locale.use("en", enUS);
      break;
    case "es":
      Locale.use("es", esES);
      break;
    default:
      Locale.use("cn", zhCN);
      break;
  }
}
const lang = store.state.user.lang;
const i18n = createI18n({
  legacy: false,
  locale: lang,
  fallbackLocale: "en",
  messages: {
    en: { ...messages.en },
    cn: { ...messages.cn },
    es: { ...messages.es },
    gr: { ...messages.gr },
    rs: { ...messages.rs },
    fr: { ...messages.fr },
    pt: { ...messages.pt },
    de: { ...messages.de },
    nl: { ...messages.nl },
    it: { ...messages.it },
    se: { ...messages.se },
    hr: { ...messages.hr },
    ca: { ...messages.ca },
    tr: { ...messages.tr },
    ru: { ...messages.ru },
  },
});
// Locals(i18n.global.fallbackLocale.value);

export function changeLang(locale) {
  i18n.global.locale.value = locale;
  store.dispatch("setLang", locale);
  Locals(locale);
}
export default i18n;
