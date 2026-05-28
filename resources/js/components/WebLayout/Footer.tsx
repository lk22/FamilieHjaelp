// Dependency imports
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (

    <footer className="bg-blue-900 py-4 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-gray-600">
            <img src="/images/web/logo_normal.svg" alt="FamilieHjaelp Logo" className="h-8 mb-2 -ml-4" />
            <p className="text-sm text-white">
              &copy; {new Date().getFullYear()} FamilieHjaelp. {t("footer.all_rights_reserved")}
            </p>
          </div>
          <div className="text-white">
            <h4 className="font-semibold mb-2 text-white">{t("footer.contact_us")}</h4>
            <p className="text-sm text-white">Email: contact@familiehjaelp.com</p>
          </div>
          <div className="text-right text-white">
            <a href="/privacy" className="hover:underline text-white">{t("footer.privacy_policy")}</a> | <a href="/terms" className="hover:underline text-white">{t("footer.terms_of_service")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}