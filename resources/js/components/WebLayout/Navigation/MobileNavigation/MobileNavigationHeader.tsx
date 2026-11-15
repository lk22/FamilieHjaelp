
import { memo } from "react";

interface MobileNavigationHeaderProps {
  openMobileNav: () => void;
}

const MobileNavigationHeader = ({ openMobileNav }: MobileNavigationHeaderProps) => {
  return (
    <div className="mobile-nav-header flex items-center justify-between p-8 border-b border-gray-700">
      <img src="/images/web/logo_normal.svg" alt="FamilieHjaelp Logo" className="h-8 mb-2 -ml-4 h-[45px]" />
      <button onClick={openMobileNav} className="text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  );
}

const MemoizedMobileNavigationHeader = memo(MobileNavigationHeader);
export default MemoizedMobileNavigationHeader;