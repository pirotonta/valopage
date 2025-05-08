import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

const languageDetectorOptions = {
    // detecto el idioma
    order: ['localStorage', 'navigator', 'htmlTag'],

    // lugar donde guardo idioma seleccionado
    caches: ['localStorage'],

    // clave q uso en localstorage
    lookupLocalStorage: 'idioma',
};

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false
        },
        backend: {
            loadPath: '/languages/{{lng}}/translation.json'
        },
        detection: languageDetectorOptions,
    });

export default i18n;