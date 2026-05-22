import {Link} from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

import LanguageSwitcher from "./LanguageSwitcher";
import AuthRegisterDialog from "../Dialogs/AuthRegisterDialog";
import { useTranslation } from 'react-i18next';

interface MainNavigationProps {
  openAuthDialog: () => void;
  closeAuthDialog: () => void;
  isAuthDialogOpen: boolean;
}

export default function MainNavigation({ openAuthDialog, closeAuthDialog, isAuthDialogOpen }: MainNavigationProps) {
  const { auth, locale } = usePage().props;
  const { t } = useTranslation();
  const localized = (name:string, params: Record<string, any> = {}) => route(name, { ...params, locale});

  return (
    <nav>
      <ul className="flex justify-center gap-4">
        <li>
          <LanguageSwitcher />
        </li>
        <li>
          <Link href={localized('page.help-resources')} className="text-white hover:text-white text-lg cursor-pointer">{t('menu.helpresources')}</Link>
        </li>
        <li>
          <Link href={localized('page.functions')} className="text-white hover:text-white text-lg cursor-pointer">{t('menu.functions')}</Link>
        </li>
        <li>
          <Link href={localized('page.our-mission')} className="text-white hover:text-white text-lg cursor-pointer">{t('menu.ourmission')}</Link>
        </li>
        <li className="relative group">
          <Link href="#" className="text-white hover:text-white text-lg cursor-pointer">{t('menu.experiences')}</Link>
          <ul className="ml-4 mt-2 hidden group-hover:block absolute bg-white shadow-lg rounded p-4 space-y-3 w-48">
            <li>
              <Link href={localized('page.experiences.lost-family-member')} className="-ml-px cursor-pointer">{t('menu.lostFamilyMember')}</Link>
            </li>
            <li>
              <Link href={localized('page.experiences.abortion')} className="-ml-px cursor-pointer">{t('menu.abort')}</Link>
            </li>
            <li>
              <Link href={localized('page.experiences.stillbirth')} className="-ml-px cursor-pointer">{t('menu.stillbirth')}</Link>
            </li>
            <li>
              <Link href={localized('page.experiences.new-parents')} className="-ml-px cursor-pointer">{t('menu.new_parents')}</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link
            href={localized('page.getting-started')}
            className="text-white hover:text-white text-lg cursor-pointer"
            onClick={openAuthDialog}
          >
            {t('menu.getting_started')}
          </Link>
        </li>
        {
          auth.user ? (
            <li>
              <Link href={localized('profile.home')} className="text-white hover:text-white text-lg cursor-pointer border-2 border-white rounded-full px-4 py-2 font-bold">
                {t('menu.dashboard')}
              </Link>
            </li>
          ) : (
            <li>
              <button onClick={openAuthDialog} className="text-white hover:text-white text-lg cursor-pointer">{t('menu.login_register')}</button>
            </li>
          )
        }
      </ul>
      <AuthRegisterDialog
        isOpen={isAuthDialogOpen}
        onClose={closeAuthDialog}
      />
    </nav>
  );
}