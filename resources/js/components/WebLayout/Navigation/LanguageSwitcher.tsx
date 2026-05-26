import { useEffect } from "react";
import {Link} from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { locale } = usePage<{ locale: string }>().props;
  const {t} = useTranslation();

  useEffect(() => {
    if (locale && i18n.language !== locale) {
      void i18n.changeLanguage(locale);
    }
  }, [locale]);

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 h-full">
        <Link href={route('home', { locale: 'da' })}  className={`text-lg text-white ${locale === 'da' ? 'font-bold' : ''}`}>
          {t('language_da')}
        </Link>
        <span className="mx-1">|</span>
        <Link href={route('home', { locale: 'en' })} className={`text-lg text-white ${locale === 'en' ? 'font-bold' : ''}`}>
          {t('language_en')}
        </Link>
      </div>
  );
}