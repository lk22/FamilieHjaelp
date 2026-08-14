import {useState} from "react";
import {usePage} from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import AuthRegisterDialog from "../Dialogs/AuthRegisterDialog";

interface AuthProps {
  user: {
    id: number;
    name: string;
    email: string;
  }
}

export default function HeaderActions() {
  const localized = (key: string) => `/${key}`;
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const { t } = useTranslation('web');

  const { auth } = usePage<{ auth: AuthProps }>().props;

  return (
    <div className="flex items-center gap-4">
      {auth.user ? (
        <a href={localized('profile.home')} className="text-white hover:text-gray-900 bg-blue-500 px-4 py-2 rounded-full hover:cursor-pointer">{t('menu.dashboard')}</a>
      ) : (
        <button onClick={() => setIsAuthModalOpen(true)} className="text-white hover:text-white hover:cursor-pointer bg-blue-500 px-4 py-2 rounded-full">{t('menu.login_register')}</button>
      )}

      <AuthRegisterDialog
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
    </div>

  );
}