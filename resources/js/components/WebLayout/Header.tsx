import Logo from '@/components/WebLayout/Logo';
import MainNav from '@/components/WebLayout/MainNav';

export default function Header() {
  return (
    <header className="bg-blue-900 shadow py-8 px-8 flex items-center justify-between">
      <Logo />
      <MainNav />
    </header>
  );
}