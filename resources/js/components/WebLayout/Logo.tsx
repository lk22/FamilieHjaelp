import { Link, usePage } from "@inertiajs/react";

export default function Logo() {
  const { locale } = usePage().props;

  const localized = (name:string, params: Record<string, never> = {}) => route(name, { ...params, locale});

  return (
    <div className="text-2xl font-bold text-gray-800 flex items-center">
        <Link href={localized('home')} className="flex items-center gap-2">
            <img
              src="/images/web/logo_normal.svg"
              alt="Familiehjælp Logo"
              className="w-auto h-[25px] lg:h-[45px]"
          />
        </Link>
    </div>
  )
}