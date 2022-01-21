import { createI18n } from 'vue-i18n'
import en from './lang/en'
import zh_CN from './lang/zh_CN'
import zh_TW from './lang/zh_TW'
import de from './lang/de'
import it from './lang/it'
import fr from './lang/fr'
import { computed } from 'vue'

// document https://vue-i18n.intlify.dev/

const messages = {
  en,
  de,
  it,
  fr,
  zh_CN,
  zh_TW,
}

export const locals = [
  { name: 'English', key: 'en', disabled: false },
  { name: 'Deutsch', key: 'de', disabled: false },
  { name: 'Italiana', key: 'it', disabled: false },
  { name: 'Français', key: 'fr', disabled: false },
  { name: '简体中文', key: 'zh_CN', disabled: false },
  { name: '繁體中文', key: 'zh_TW', disabled: false },
  { name: 'Español', key: '1', disabled: true },
  { name: 'русский', key: '4', disabled: true },
]

// 2. Create i18n instance with options

export const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
})

export const currentLocal = computed(() => locals.filter(item => item.key == i18n.global.locale)[0])

function setHtmlPageLang(locale: string) {
  document.querySelector('html')?.setAttribute('lang', locale)
}

export function setI18nLanguage(locale: string) {
  localStorage.setItem('lang', locale)
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    ;(i18n.global.locale as any).value = locale
  }
  setHtmlPageLang(locale)
}
