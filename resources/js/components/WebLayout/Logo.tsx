import {Link} from "@inertiajs/react";

export default function Logo() {
  return (
    <div className="text-2xl font-bold text-gray-800 flex items-center">
        <Link href="/">
            <img
              src="/images/web/logo_normal.svg"
              alt="Familiehjælp Logo"
              className="w-auto h-[45px]"
          />
        </Link>
    </div>
  )
}