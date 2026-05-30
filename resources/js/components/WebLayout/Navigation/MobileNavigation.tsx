// dependency imports
import { memo } from "react";
import { Link } from "@inertiajs/react";

// Component imports
import AuthRegisterDialog from "../Dialogs/AuthRegisterDialog";

interface MainNavigationProps {
  openAuthDialog: () => void;
  closeAuthDialog: () => void;
  isAuthDialogOpen: boolean;
}

const MobileNavigation = ({ openAuthDialog, closeAuthDialog, isAuthDialogOpen }: MainNavigationProps) => {
  return (
    <nav>
      <ul className="flex justify-center gap-4">
        <li>
          <Link href={route('page.help-resources')} className="text-white hover:text-white">Hjælpemidler</Link>
        </li>
        <li>
          <Link href={route('page.functions')} className="text-white hover:text-white">Funktioner</Link>
        </li>
        <li>
          <Link href={route('page.experiences.abortion')} className="text-white hover:text-white">Har du oplevet</Link>
          <ul>
            <li><Link href={route('page.experiences.abortion')} className="text-white hover:text-white">Abort</Link></li>
            <li><Link href={route('page.experiences.stillbirth')} className="text-white hover:text-white">Dødfødsel</Link></li>
            <li><Link href={route('page.experiences.new-parents')} className="text-white hover:text-white">Nybagte forældre</Link></li>
          </ul>
        </li>
        <li>
          <button onClick={openAuthDialog} className="text-gray-600 hover:text-gray-900">Log ind / Opret konto</button>
        </li>
      </ul>
      <AuthRegisterDialog
        isOpen={isAuthDialogOpen}
        onClose={closeAuthDialog}
      />
    </nav>
  );
}

const MemoizedMobileNavigation = memo(MobileNavigation);
export default MemoizedMobileNavigation;