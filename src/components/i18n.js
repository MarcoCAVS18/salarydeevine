// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importa las traducciones para cada idioma
import translationES from './locales/es/translation.json';
import translationEN from './locales/en/translation.json';
import translationIT from './locales/it/translation.json';
import translationFR from './locales/fr/translation.json';

const resources = {
  es: { translation: translationES },
  en: { translation: translationEN },
  it: { translation: translationIT },
  fr: { translation: translationFR },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es', // Establece el idioma predeterminado
    interpolation: {
      escapeValue: false, // No necesitas escapar HTML en las traducciones
    },
  });

export default i18n;
