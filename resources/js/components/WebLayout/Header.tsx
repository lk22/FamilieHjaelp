import Logo from '@/components/WebLayout/Logo';
import MainNav from '@/components/WebLayout/MainNav';

export default function Header() {
  return (
    <header className="bg-white shadow py-4 px-8 flex items-center justify-between">
      <Logo />
      <MainNav />
    </header>
  );
}