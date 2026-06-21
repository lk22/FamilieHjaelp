import { useState, useEffect, useCallback } from "react";

import MemoizedMainNavigation from "./Navigation/MainNavigation";
import MemoizedMobileNavigation from "./Navigation/MobileNavigation";

export default function MainNav() {
  const [ isAuthDialogOpen, setIsAuthDialogOpen ] = useState<boolean>(false);
  const [ isMobileNav, setIsMobileNav ] = useState<boolean>(false);
  const [ isNavOpen, setIsNavOpen ] = useState<boolean>(false);

  console.log(isAuthDialogOpen);

  const handleResize = useCallback(() => {
    console.log('Window resized:', window.innerWidth);
    if (window.innerWidth < 1024) {
      setIsMobileNav(true);
    } else {
      setIsMobileNav(false);
    }
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target;

    // only apply this logic if the auth dialog is open

    // only apply this logic on desktop views
    if (window.innerWidth >= 1024) {
      if (target instanceof HTMLElement && !target.closest('dialog')) {
        setIsAuthDialogOpen(false);
      }
    }

  }, [isAuthDialogOpen]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClickOutside);
    };
  }, [handleResize, handleClickOutside]);

  const openAuthDialog = useCallback(() => {
    setIsAuthDialogOpen(true);
  }, []);

  const closeAuthDialog = useCallback(() => {
    setIsAuthDialogOpen(false);
  }, []);

  const toggleMobileNav = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, []);


  return (
    <>
      {isMobileNav ? (
        <>
          <MemoizedMobileNavigation
            openAuthDialog={openAuthDialog}
            closeAuthDialog={closeAuthDialog}
            isAuthDialogOpen={isAuthDialogOpen}
            isNavOpen={isNavOpen}
            toggleMobileNav={toggleMobileNav}
          />
        </>
      ) : (
        <MemoizedMainNavigation
          openAuthDialog={openAuthDialog}
          closeAuthDialog={closeAuthDialog}
        />
      )}
    </>
  );
}