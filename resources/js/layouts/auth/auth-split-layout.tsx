import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { quote, background_image } = usePage<SharedData>().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className={`relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r ${background_image ? 'bg-cover' : ''}`}>
                <div className="absolute inset-0 bg-zinc-900 bg-cover bg-center" style={{ backgroundImage: background_image ? `url(${background_image})` : undefined }} />
                    <Link href={route('home')} className="relative z-20 flex items-center text-lg font-medium">
                        {/* <AppLogoIcon className="mr-2 size-8 fill-current text-white" /> */}
                        <img
                            src="/logo_foraeldrehjaelp.svg"
                            alt="Familiehjælp Logo"
                            className="w-auto h-[45px]"
                        />
                        {/* <span className="text-3xl ml-4">{name}</span> */}
                    </Link>
                    <div className="overlay absolute inset-0 bg-black opacity-50"></div>
                {quote && (
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">&ldquo;{quote.message}&rdquo;</p>
                            <footer className="text-sm text-neutral-300">{quote.author}</footer>
                        </blockquote>
                    </div>
                )}
            </div>
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link href={route('home')} className="relative z-20 flex items-center justify-center">
                        <img src="/images/web/logo_inverse.svg" alt="Familiehjælp Logo" className="h-32 w-auto mr-2 lg:hidden" />
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-medium text-white">{title}</h1>
                        <p className="text-sm text-balance text-muted-foreground">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
