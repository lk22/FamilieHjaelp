// dependencies
import {useState} from "react";
import {usePage} from "@inertiajs/react";
import { Link } from "@inertiajs/react";

// hooks
import { useTranslation } from "react-i18next";
import { useIsMobile } from '../../../hooks/use-mobile';

// utils
import { localizeRoute } from "@/util/localizeRoute";

// types
import { type SharedData } from '@/types';

// Components
import {
  ChevronRight,
  User
} from "lucide-react"
import AuthRegisterDialog from "../Dialogs/AuthRegisterDialog";

interface AuthProps {
  user: {
    id: number;
    name: string;
    email: string;
  }
}

export default function HeaderActions() {
  const { locale } = usePage<SharedData>().props;
  const localized = localizeRoute(locale);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const { t } = useTranslation('web');

  const { auth } = usePage<{ auth: AuthProps }>().props;

  const isMobile = useIsMobile();

  return (
    <div className="flex items-center gap-4 w-auto justify-end">
      {!isMobile && (
        <>
          {auth.user ? (
            <a href={localized('profile.home')} className="flex gap-2 text-white hover:text-gray-900 bg-blue-500 px-4 py-2 rounded-full hover:cursor-pointer">{t('menu.dashboard')}</a>
          ) : (
            <>
              <Link
                href={localized('page.getting-started')}
                className="text-white hover:text-white text-lg cursor-pointer bg-blue-500 rounded-full px-6 py-3 w-auto"
                onClick={() => setIsAuthModalOpen(true)}
              >
                {t('menu.getting_started')} <ChevronRight className="inline-block ml-1" size={16} />
              </Link>
              <button onClick={() => setIsAuthModalOpen(true)} className="flex text-white hover:text-white hover:cursor-pointer bg-blue-500 px-6 py-3 rounded-full w-auto gap-2 items-center">{t('menu.login_register')} <User size={16} /></button>
            </>
          )}
        </>
      )}
      <AuthRegisterDialog
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
    </div>

  );
}