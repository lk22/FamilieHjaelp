import '../css/app.css';
import i18n from "i18next"
import { initReactI18next } from "react-i18next";

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

import initializeLocalization from './lib/locale/initializeLocalization';

import web_en from './lang/en/web.json';
import web_da from './lang/da/web.json';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

type CurrentLocaleType = 'en' | 'da' | string; // Extend with other locales as needed

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const { locale } = props.initialPage.props

        console.log('Initializing app with props:', locale);

        initializeLocalization(locale as CurrentLocaleType, {
            en: {
                web: web_en
            },
            da: {
                web: web_da
            }
        });

        root.render(
            <App {...props} />
        );
    },
    progress: {
        color: '#21549cff',
        includeCSS: true,
        showSpinner: true,
        delay: 250,
    }
});



// This will set light / dark mode on load...
initializeTheme();
