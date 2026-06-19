import { useState, useEffect, useCallback } from "react";

import MemoizedMainNavigation from "./Navigation/MainNavigation";
import MemoizedMobileNavigation from "./Navigation/MobileNavigation";

export default function MainNav() {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState<boolean>(false);
  const [isMobileNav, setIsMobileNav] = useState<boolean>(false);

  const handleResize = useCallback(() => {
    if (window.innerWidth < 1024) {
      setIsMobileNav(true);
    } else {
      setIsMobileNav(false);
    }
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target;

    if (target instanceof HTMLElement && !target.closest('dialog')) {
      setIsAuthDialogOpen(false);
    }
  }, []);

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
    setIsMobileNav((prev) => !prev);
  }, []);

  return (
    <>
      {isMobileNav ? (
        <>
          <button onClick={toggleMobileNav} className="text-white lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <MemoizedMobileNavigation
            openAuthDialog={openAuthDialog}
            closeAuthDialog={closeAuthDialog}
            isAuthDialogOpen={isAuthDialogOpen}
            isNavOpen={isMobileNav}
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