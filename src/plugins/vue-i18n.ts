import { createI18n } from 'vue-i18n';

import en from '@/locales/en.json';
import uz from '@/locales/uz.json';
import ru from '@/locales/ru.json';

const locale: any = 'uz';

const i18n = createI18n({
  locale,
  legacy: false,
  messages: {
    en,
    uz,
    ru
  }
});

export default i18n;
