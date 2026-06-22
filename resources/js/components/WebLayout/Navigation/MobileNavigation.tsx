// dependency imports
import { memo } from "react";

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

  const navClasses = `w-full bg-blue-900 h-full fixed bottom-0 top-0 left-0 transition-transform duration-300 ${isNavOpen ? 'translate-x-0' : '-translate-x-full'}`;

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
          <MobileNavigationLink href={route('page.help-resources')}>Hjælpemidler</MobileNavigationLink>
          <MobileNavigationLink href={route('page.functions')}>Funktioner</MobileNavigationLink>

          <li className="flex flex-col items-start w-full">
            <MobileNavigationSubNavList items={[
              { href: route('page.experiences.abortion'), label: 'Abort' },
              { href: route('page.experiences.stillbirth'), label: 'Dødfødsel' },
              { href: route('page.experiences.new-parents'), label: 'Nybagte forældre' },
            ]} label="Har du oplevet?" />
          </li>

          <li className="flex flex-col items-start w-full">
            <button onClick={handleOpenAuthModal} className="text-white hover:text-gray-900 bg-blue-500 px-4 py-2 rounded">Log ind / Opret konto</button>
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