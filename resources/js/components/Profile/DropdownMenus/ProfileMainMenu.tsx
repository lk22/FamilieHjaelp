import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { 
    DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent, 
    DropdownMenuItem 
} from '@/components/ui/dropdown-menu';

import { FaBars, FaX } from "react-icons/fa6";

import { useIsMobile } from '@/hooks/use-mobile';
import { useIsTablet } from '@/hooks/use-tablet';

interface ProfileMainMenuProps {
    setIsLoggingOutDialog: (isOpen: boolean) => void;
}

export function ProfileMainMenu({ setIsLoggingOutDialog }: ProfileMainMenuProps) {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    
    const isMobile = useIsMobile();
    const isTablet = useIsTablet();

    const handleMobileMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const MobileMenuClasses = isMenuOpen ? 
        '-right-0' :
        'right-[-100%]';

    const MenuOverlayClasses = isMenuOpen ?
        'opacity-25' :
        'opacity-0 pointer-events-none';

    return (
        <>
        {isMobile || isTablet ? (
            <>
                <div className="" onClick={handleMobileMenuToggle}>
                    <FaBars 
                        className="text-white hover:underline cursor-pointer"
                        size={24}
                    />
                </div>
                <div className={`overlay z-0 inset fixed h-full w-full bg-blue-500 left-0 top-0 bottom-0 ${MenuOverlayClasses} transition-opacity duration-300 ease-in-out`}></div>
                <div className={`fixed py-2  top-0 ${isMobile ? 'w-full px-4' : 'w-8/12 px-16'} h-full bg-blue-800 bg-opacity-50 z-50 transition-right ease-in-out duration-300 ${MobileMenuClasses}`} onClick={() => setIsMenuOpen(false)}>
                    <div className="flex flex-col items-end p-4">
                        <button className="text-white hover:underline cursor-pointer" onClick={handleMobileMenuToggle}>
                            <FaX size={24} />
                        </button>
                    </div>
                    <nav className="mobile-nav-list p-8">
                        <ul className="space-y-4">
                            <li className="border-b-2 border-white pb-2">
                                <Link href={route('profile.home')} className="text-white hover:underline text-2xl">
                                    {route().current('profile.home') ? 'Hjem' : 'Gå tilbage'}
                                </Link>
                            </li>
                            <li className="border-b-2 border-white pb-2">
                                <Link href={route('profile.todos')} className="text-white hover:underline text-2xl">
                                    {route().current('profile.todos') ? 'Opgaver' : 'Gå til Opgaver'}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </>
        ) : (
            <>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="text-white hover:underline">
                            Menu
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-blue-700 text-white border-0 rounded-5 w-68 p-4">
                        <DropdownMenuItem className="focus:bg-transparent">
                            <Link href={route('profile.home')} className="text-white hover:underline text-lg">
                                {route().current('profile.home') ? 'Hjem' : 'Gå tilbage'}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-transparent">
                            <Link href={route('profile.todos')} className="text-white hover:underline text-lg">
                                {route().current('profile.todos') ? 'Opgaver' : 'Gå til Opgaver'}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-transparent">
                            <Link href={route('profile.todos')} className="text-white hover:underline text-lg">
                                {route().current('profile.todos') ? 'Notifikationer' : 'Gå til notifikationer'}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-transparent">
                            <Link href={route('profile.todos')} className="text-white hover:underline text-lg">
                                {route().current('profile.todos') ? 'Noter' : 'Gå til noter'}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-transparent" onClick={() => setIsLoggingOutDialog(true)}>
                            <span className="text-lg cursor-pointer hover:underline">Log ud</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </>
        )}
        </>
    );
}