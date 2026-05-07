import {Link} from "@inertiajs/react";

import AuthRegisterDialog from "../Dialogs/AuthRegisterDialog";

interface MainNavigationProps {
  openAuthDialog: () => void;
  closeAuthDialog: () => void;
  isAuthDialogOpen: boolean;
}

export default function MainNavigation({ openAuthDialog, closeAuthDialog, isAuthDialogOpen }: MainNavigationProps) {
  return (
    <nav>
      <ul className="flex justify-center gap-4">
        <li>
          <Link href="/help-resources" className="text-white hover:text-white text-lg cursor-pointer">Hjælpemidler</Link>
        </li>
        <li>
          <Link href="/about" className="text-white hover:text-white text-lg cursor-pointer">Vores mission</Link>
        </li>
        <li className="relative group">
          <Link href="/contact" className="text-white hover:text-white text-lg cursor-pointer">Har du oplevet</Link>
          <ul className="ml-4 mt-2 hidden group-hover:block absolute bg-white shadow-lg rounded p-4 space-y-3 w-48">
            <li>
              <Link href="/abort" className="-ml-px cursor-pointer">Abort </Link>
            </li>
            <li>
              <Link href="/stillbirth" className="-ml-px cursor-pointer">Dødfødsel</Link>
            </li>
            <li>
              <Link href="/new-parents" className="-ml-px cursor-pointer">Nybagte forældre</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/app/getting-started" className="text-white hover:text-white text-lg cursor-pointer">Kom igang</Link>
        </li>
        <li>
          <button onClick={openAuthDialog} className="text-white hover:text-white text-lg cursor-pointer">Log ind / Opret konto</button>
        </li>
      </ul>
      <AuthRegisterDialog
        isOpen={isAuthDialogOpen}
        onClose={closeAuthDialog}
      />
    </nav>
  );
}