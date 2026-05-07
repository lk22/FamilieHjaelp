import {Link} from "@inertiajs/react";

import AuthRegisterDialog from "../Dialogs/AuthRegisterDialog";

interface MainNavigationProps {
  openAuthDialog: () => void;
  closeAuthDialog: () => void;
  isAuthDialogOpen: boolean;
}

export default function MobileNavigation({ openAuthDialog, closeAuthDialog, isAuthDialogOpen }: MainNavigationProps) {
  return (
    <nav>
      <ul className="flex justify-center gap-4">
        <li>
          <Link href="/" className="text-white hover:text-white">Hjælpemidler</Link>
        </li>
        <li>
          <Link href="/about" className="text-white hover:text-white">Vores mission</Link>
        </li>
        <li>
          <Link href="/contact" className="text-white hover:text-white">Har du oplevet</Link>
          <ul>
            <li>Abort</li>
            <li>Dødfødsel</li>
            <li>Nybagte forældre</li>
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