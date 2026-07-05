import { Link } from '@inertiajs/react';

type MobileNavigationLinkProps = {
  href: string;
  children: React.ReactNode;
}

export default function MobileNavigationLink({ href, children }: MobileNavigationLinkProps) {
  return (
    <li className="text-white hover:text-white w-full text-start my-2 pb-2">
      <Link className="text-white hover:text-white w-full text-2xl" href={href}>{children}</Link>
    </li>
  )
}