import {Link} from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { locale } = usePage().props;
  const {t} = useTranslation();
  const localized = (name:string, params: Record<string, any> = {}) => route(name, { ...params, locale});

  return (
    <>
      <Link href={route('home', { locale: 'da' })} className={`text-sm text-white ${locale === 'da' ? 'font-bold' : ''}`}>
        {t('language_da')}
      </Link>
      <span className="mx-1">|</span>
      <Link href={route('home', { locale: 'en' })} className={`text-sm text-white ${locale === 'en' ? 'font-bold' : ''}`}>
        {t('language_en')}
      </Link>
    </>
  );
}