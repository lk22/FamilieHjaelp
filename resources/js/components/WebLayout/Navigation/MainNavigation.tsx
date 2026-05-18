import {Link} from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

import AuthRegisterDialog from "../Dialogs/AuthRegisterDialog";
import { type SharedData } from '@/types';

interface MainNavigationProps {
  openAuthDialog: () => void;
  closeAuthDialog: () => void;
  isAuthDialogOpen: boolean;
}

export default function MainNavigation({ openAuthDialog, closeAuthDialog, isAuthDialogOpen }: MainNavigationProps) {
  const { auth } = usePage().props;

  return (
    <nav>
      <ul className="flex justify-center gap-4">
        <li>
          <Link href={route('page.help-resources')} className="text-white hover:text-white text-lg cursor-pointer">Hjælpemidler</Link>
        </li>
        <li>
          <Link href={route('page.functions')} className="text-white hover:text-white text-lg cursor-pointer">Funktioner</Link>
        </li>
        <li>
          <Link href={route('page.our-mission')} className="text-white hover:text-white text-lg cursor-pointer">Vores mission</Link>
        </li>
        <li className="relative group">
          <Link href="#" className="text-white hover:text-white text-lg cursor-pointer">Har du oplevet</Link>
          <ul className="ml-4 mt-2 hidden group-hover:block absolute bg-white shadow-lg rounded p-4 space-y-3 w-48">
            <li>
              <Link href={route('page.experiences.lost-family-member')} className="-ml-px cursor-pointer">Mistet familie medlem </Link>
            </li>
            <li>
              <Link href={route('page.experiences.abortion')} className="-ml-px cursor-pointer">Abort </Link>
            </li>
            <li>
              <Link href={route('page.experiences.stillbirth')} className="-ml-px cursor-pointer">Dødfødsel</Link>
            </li>
            <li>
              <Link href={route('page.experiences.new-parents')} className="-ml-px cursor-pointer">Nybagte forældre</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link
            href={route('page.getting-started')}
            className="text-white hover:text-white text-lg cursor-pointer"
            onClick={openAuthDialog}
          >
            Kom igang
          </Link>
        </li>
        {
          auth.user ? (
            <li>
              <Link href={route('profile.home')} className="text-white hover:text-white text-lg cursor-pointer border-2 border-white rounded-full px-4 py-2 font-bold">
                Gå til dashboard
              </Link>
            </li>
          ) : (
            <li>
              <button onClick={openAuthDialog} className="text-white hover:text-white text-lg cursor-pointer">Log ind / Opret konto</button>
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