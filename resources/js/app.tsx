import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

import initializeLocalization from './lib/locale/initializeLocalization';

import web_en from './lang/en/web.json';
import web_da from './lang/da/web.json';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const { locale } = props.initialPage.props

        initializeLocalization(locale as string, {
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

initializeTheme();
