// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
    .use(HttpApi) // esto es para cargar los archivos JSON
    .use(LanguageDetector) // esto detecta idioma del navegador
    .use(initReactI18next) // conecta con React
    .init({
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false
        },
        backend: {
            loadPath: '/languages/{{lng}}/translation.json'
        }
    });

export default i18n;