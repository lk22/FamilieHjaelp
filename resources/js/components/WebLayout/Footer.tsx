// Dependency imports
import { useTranslation } from "react-i18next";
import { usePage } from "@inertiajs/react";

type FooterQuickLinks = {
  href: string;
  label: string;
};

export default function Footer() {
  const { locale } = usePage().props;
  const { t } = useTranslation();

  const localized = (name:string, params: Record<string, any> = {}) => route(name, { ...params, locale: locale });

  const quickLinks: FooterQuickLinks[] = [
    {
      href: localized('page.help-resources'),
      label: t('menu.helpresources')
    },
    {
      href: localized('page.functions'),
      label: t('menu.functions')
    },
    {
      href: localized('page.our-mission'),
      label: t('menu.ourmission')
    },
    {
      href: localized('page.experiences.abortion'),
      label: t('menu.abort')
    },
    {
      href: localized('page.experiences.stillbirth'),
      label: t('menu.stillbirth')
    },
    {
      href: localized('page.experiences.new-parents'),
      label: t('menu.new_parents')
    }
  ]

  const functionsList: FooterQuickLinks[] = [
    {
      // href: localized('footer.functions_list.calendar'),
      href: '#',
      label: t('footer.functions_list.calendar'),
    },
    {
      // href: localized('footer.functions_list.notes'),
      href: '#',
      label: t('footer.functions_list.notes'),
    },
    {
      // href: localized('footer.functions_list.planning'),
      href: '#',
      label: t('footer.functions_list.planning'),
    },
  ];

  return (
    <footer className="bg-blue-900 py-4 mt-8">
      <div className="container mx-auto px-4 py-18">
        <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-gray-600 flex flex-col items-start gap-4">
            <img src="/images/web/logo_normal.svg" alt="FamilieHjaelp Logo" className="h-16 -ml-8 mb-2 -ml-4" />
            <div className="text-white flex flex-col items-start gap-4 mb-4">
              <h4 className="font-semibold mb-0 text-white text-2xl">{t("footer.contact_us")}</h4>
              <p className="text-sm text-white">Email: contact@familiehjaelp.com</p>
            </div>
            <p className="text-sm text-white">
              &copy; {new Date().getFullYear()} FamilieHjaelp. {t("footer.all_rights_reserved")}
            </p>
          </div>
          <div className="text-gray-600 flex flex-col items-start gap-4">
            <h4 className="font-semibold mb-0 text-white text-2xl">{t("footer.functions")}</h4>
            <ul className="text-sm text-white">
              {quickLinks.map((link, index) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:underline text-white text-lg">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-gray-600 flex flex-col items-start gap-4">
            <h4 className="font-semibold mb-0 text-white text-2xl">{t("footer.about")}</h4>
            <ul className="text-sm text-white">
              {functionsList.map((link, index) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:underline text-white text-lg">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <hr className="border-gray-700" />
          <div className="text-right sm:text-center sm:mt-16 text-white">
            <p>{t("footer.copyright_notice", { year: new Date().getFullYear() })}</p>
          </div>
          <div className="text-right sm:text-center sm:mt-16 text-white">
            <a href="/privacy" className="hover:underline text-white">{t("footer.privacy_policy")}</a> | <a href="/terms" className="hover:underline text-white">{t("footer.terms_of_service")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}