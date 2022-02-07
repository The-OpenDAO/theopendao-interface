import { createI18n } from 'vue-i18n'
import en from './lang/en'
import zh_CN from './lang/zh_CN'
import zh_TW from './lang/zh_TW'
import de from './lang/de'
import it from './lang/it'
import fr from './lang/fr'

import rs from './lang/rs'
import thai from './lang/thai'
import tk from './lang/tk'
import ro from './lang/ro'
import es from './lang/es'
import jp from './lang/jp'
import kr from './lang/kr'
import { computed } from 'vue'

// document https://vue-i18n.intlify.dev/

const messages = {
  en,
  de,
  it,
  fr,
  ro,
  rs,
  kr,
  thai,
  tk,
  jp,
  es,
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
  { name: 'Russian', key: 'rs', disabled: false },
  { name: 'Thai', key: 'thai', disabled: false },
  { name: 'Turkish', key: 'tk', disabled: false },
  { name: 'Romanian', key: 'ro', disabled: false },
  { name: 'Español', key: 'es', disabled: false },
  { name: '日本語', key: 'jp', disabled: false },
  { name: '한국어', key: 'kr', disabled: false },
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
