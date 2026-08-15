// Dependency imports
import { useState, useCallback, memo  } from "react";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { useTranslation } from 'react-i18next';
import { type SharedData } from '@/types';

// Component imports
import LanguageSwitcher from "./LanguageSwitcher";
import AuthRegisterDialog from "../Dialogs/AuthRegisterDialog";

// Component imports
import { ChevronDown } from 'lucide-react'

interface MainNavigationProps {
  openAuthDialog: () => void;
  closeAuthDialog: () => void;
}

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  subNavItems?: NavLinkProps[];
}

const MainNavigation = ({ openAuthDialog, closeAuthDialog }: MainNavigationProps) => {
  const { auth, locale } = usePage<SharedData>().props;
  const { t } = useTranslation();
  const localized = (name:string, params: Record<string, any> = {}) => route(name, { ...params, locale});
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  const navLinks: NavLinkProps[] = [
    // {
    //   href: localized('page.help-resources'),
    //   icon: <ChevronDown height={20} width={20} />,
    //   title: t('menu.helpresources'),
    //   // subNavItems: [
    //   //   {
    //   //     href: localized('page.help-resources.physical'),
    //   //     icon: null,
    //   //     title: t('menu.psycholical'),
    //   //   },
    //   //   {
    //   //     href: localized('page.help-resources.mental'),
    //   //     icon: null,
    //   //     title: t('menu.mental'),
    //   //   },
    //   //   {
    //   //     href: localized('page.help-resources.financial'),
    //   //     icon: null,
    //   //     title: t('menu.financial'),
    //   //   }
    //   // ]
    // },
    {
      href: localized('page.our-mission'),
      icon: null,
      title: t('menu.ourmission'),
    },
    {
      href: localized('page.functions'),
      icon: <ChevronDown height={20} width={20}/>,
      title: t('menu.functions'),
      subNavItems: [
        {
          href: localized('page.functions.calendar'),
          icon: null,
          title: t('menu.functions_calendar')
        },
        {
          href: localized('page.functions.notes'),
          icon: null,
          title: t('menu.functions_notes')
        },
        {
          href: localized('page.functions.planning'),
          icon: null,
          title: t('menu.functions_planning')
        },
      ]
    },
    {
      href: '#',
      icon: <ChevronDown height={20} width={20}/>,
      title: t('menu.experiences'),
      subNavItems: [
        {
          href: localized('page.experiences.lost-family-member'),
          icon: null,
          title: t('menu.lostFamilyMember'),
        },
        {
          href: localized('page.experiences.abortion'),
          icon: null,
          title: t('menu.abort'),
        },
        {
          href: localized('page.experiences.stillbirth'),
          icon: null,
          title: t('menu.stillbirth'),
        },
        {
          href: localized('page.experiences.new-parents'),
          icon: null,
          title: t('menu.new_parents'),
        }
      ]
    }
  ];

  const handleOpenAuthDialog = useCallback(() => {
    setIsAuthDialogOpen(true);
    openAuthDialog();
  }, [openAuthDialog]);

  const handleCloseAuthDialog = useCallback(() => {
    setIsAuthDialogOpen(false);
    closeAuthDialog();
  }, [closeAuthDialog]);

  return (
    <nav id="desktop-nav" className="hidden lg:flex items-center justify-center gap-8">
      <ul className="flex justify-center gap-4">
        {navLinks.map((link) => (
          <li key={link.href} className="relative group">
            <Link href={link.href} className="text-white hover:text-white text-lg cursor-pointer flex items-center gap-2">
              {link.title}
              {link.icon}
            </Link>
            {link.subNavItems && (
              <ul className="ml-4 mt-2 hidden group-hover:block absolute bg-white shadow-lg rounded p-4 space-y-3 w-48">
                {link.subNavItems.map((subLink) => (
                  <li key={subLink.href}>
                    <Link href={subLink.href} className="-ml-px cursor-pointer">{subLink.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <AuthRegisterDialog
        isOpen={isAuthDialogOpen}
        onClose={handleCloseAuthDialog}
      />
    </nav>
  );
}
const MemoizedMainNavigation = memo(MainNavigation);
export default MemoizedMainNavigation;