// dependency imports
import { memo } from "react";

import {usePage} from "@inertiajs/react";
import { type SharedData } from '@/types';
import { useTranslation } from "react-i18next";

// Component imports
import AuthRegisterDialog from "../Dialogs/AuthRegisterDialog";
import MobileNavigationHeader from "./MobileNavigation/MobileNavigationHeader";
import MobileNavigationLink from "./MobileNavigation/MobileNavigationLink";
import MobileNavigationFooter from "./MobileNavigation/MobileNavigationFooter";
import MobileNavigationSubNavList from "./MobileNavigation/MobileNavigationSubNavList";

interface MainNavigationProps {
  openAuthDialog: () => void;
  closeAuthDialog: () => void;
  isAuthDialogOpen: boolean;
  isNavOpen?: boolean;
  toggleMobileNav: () => void;
}

const MobileNavigation = ({ openAuthDialog, closeAuthDialog, isAuthDialogOpen, isNavOpen, toggleMobileNav }: MainNavigationProps) => {
  const { locale } = usePage<SharedData>().props;
  const { t } = useTranslation();
  const localized = (name:string, params: Record<string, any> = {}) => route(name, { ...params, locale});

  const navClasses = `w-full bg-blue-900 h-full fixed bottom-0 top-0 left-0 transition-transform duration-300 ${isNavOpen ? 'translate-x-0' : '-translate-x-full'}`;

  console.log(t('help_resources'));

  const handleToggleMobileNav = () => {
    toggleMobileNav();
  }

  const handleOpenAuthModal = () => {
    openAuthDialog();
    toggleMobileNav();
  }

  return (
    <>
      <button onClick={handleToggleMobileNav} className="text-white lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      <nav className={navClasses} id="mobile-nav">

        {/* nav header */}
        <MobileNavigationHeader openMobileNav={toggleMobileNav} />

        <ul className="flex flex-col justify-start gap-4 h-full px-10">
          <MobileNavigationLink href={localized('page.help-resources')}>{t('menu.helpresources')}</MobileNavigationLink>
          <MobileNavigationLink href={localized('page.functions')}>{t('menu.functions')}</MobileNavigationLink>
          <MobileNavigationLink href={localized('page.our-mission')}>{t('menu.ourmission')}</MobileNavigationLink>
          <MobileNavigationSubNavList label={t('menu.experiences')} items={[
            { href: localized('page.experiences.abortion'), label: t('menu.abort') },
            { href: localized('page.experiences.stillbirth'), label: t('menu.stillbirth') },
            { href: localized('page.experiences.new-parents'), label: t('menu.new_parents') },
            { href: localized('page.experiences.lost-family-member'), label: t('menu.lostFamilyMember') },
          ]} />

          <li className="flex flex-col items-start w-full">
            <button onClick={handleOpenAuthModal} className="text-white hover:text-gray-900 bg-blue-500 px-4 py-2 rounded">{t('menu.login_register')}</button>
          </li>
        </ul>

        <MobileNavigationFooter />
        <AuthRegisterDialog
          isOpen={isAuthDialogOpen}
          onClose={closeAuthDialog}
        />
      </nav>
    </>
  );
}

const MemoizedMobileNavigation = memo(MobileNavigation);
export default MemoizedMobileNavigation;gegew