import {useState, useEffect} from "react";

import MainNavigation from "./Navigation/MainNavigation";
import MobileNavigation from "./Navigation/MobileNavigation";

export default function MainNav() {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState<boolean>(false);
  const [isMobileNav, setIsMobileNav] = useState<boolean>(false);

  useEffect(() => {
    // detect viewport width and close the auth dialog if it's open and the viewport is resized to a larger size
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobileNav(true);
      } else {
        setIsMobileNav(false);
      }
    };

    const handleClickOutsite = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isAuthDialogOpen && !target.closest('dialog')) {
        setIsAuthDialogOpen(false);
      }
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleClickOutsite);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClickOutsite);
    };
  }, [window.innerWidth]);

  const openAuthDialog = () => {
    setIsAuthDialogOpen(true);
  };

  const closeAuthDialog = () => {
    setIsAuthDialogOpen(false);
  };

  return (
    <>
      {isMobileNav ? (
        <>
          <MobileNavigation
            openAuthDialog={openAuthDialog}
            closeAuthDialog={closeAuthDialog}
            isAuthDialogOpen={isAuthDialogOpen}
          />
        </>
      ) : (
        <MainNavigation
          openAuthDialog={openAuthDialog}
          closeAuthDialog={closeAuthDialog}
          isAuthDialogOpen={isAuthDialogOpen}
        />
      )}
    </>
  );
}