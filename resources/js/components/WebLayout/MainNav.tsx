import { useState, useEffect, useCallback } from "react";

import MemoizedMainNavigation from "./Navigation/MainNavigation";
import MobileNavigation from "./Navigation/MobileNavigation";

export default function MainNav() {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState<boolean>(false);
  const [isMobileNav, setIsMobileNav] = useState<boolean>(false);

  const handleResize = useCallback(() => {
    if (window.innerWidth < 768) {
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

  return (
    <>
      {isMobileNav ? (
        <MobileNavigation
          openAuthDialog={openAuthDialog}
          closeAuthDialog={closeAuthDialog}
          isAuthDialogOpen={isAuthDialogOpen}
        />
      ) : (
        <MemoizedMainNavigation
          openAuthDialog={openAuthDialog}
          closeAuthDialog={closeAuthDialog}
        />
      )}
    </>
  );
}