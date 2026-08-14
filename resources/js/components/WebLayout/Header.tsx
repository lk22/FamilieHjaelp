import Logo from '@/components/WebLayout/Logo';
import MainNav from '@/components/WebLayout/MainNav';
import HeaderActions from '@/components/WebLayout/Navigation/HeaderActions';

export default function Header() {
  return (
    <header className="bg-blue-900 shadow py-8 px-4 lg:px-8 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
      <Logo />
      <MainNav />
      <HeaderActions />
    </header>
  );
}