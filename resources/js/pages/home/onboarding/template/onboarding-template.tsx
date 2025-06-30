import React from 'react';
import { Head } from '@inertiajs/react';
interface OnboardingTemplateInterface {
    children?: React.ReactNode[];
    step: object | string;
    title?: string;
    description: string;
}

export default function OnboardingTemplate({children, title, description, step}: OnboardingTemplateInterface) {
    return (
        <>
            <Head title={title} />
            <header>
                <nav className="fixed top-0 left-0 z-50 w-full bg-transparent dark:bg-[#0a0a0a]">
                    <div className="container mx-auto flex h-16 items-center justify-between px-4">
                        <a href={route('home')} className="flex items-center text-white">
                            Gå tilbage
                        </a>
                    </div>
                </nav>
            </header>
            <main className="dark:bg-[#0a0a0a]">
                <div className="container-fluid py-8 max-w-full flex w-full flex-col items-center justify-center bg-[#004EA7] text-white dark:bg-[#0a0a0a]">
                    <div className="container max-w-[960px] flex-col py-8 items-center justify-center text-center">
                        <div className="logo">
                            <a href={route('home')}>
                                <img src="/images/FamilieHjælp_text_logo.svg" alt="Familiehjælp Logo" className="animate animate-fade-up animate-ease-linear relative bottom-4 animate-in mb-6 w-auto dark:invert h-[50px] mx-auto" />
                                <img
                                    src="/images/logo.svg"
                                    alt="Familiehjælp Logo"
                                    className="mb-6 w-auto dark:invert h-[100px] mx-auto"
                                />
                            </a>
                        </div>
                        <div className="illustration-wrapper">
                            <img
                                src="/images/getting_started_illustration.svg"
                                alt="Familiehjælp Illustration"
                                className="mt-8 w-full max-w-[400px] mx-auto"
                            />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="mt-2 text-lg">{description}</p>
                </div>
                <div className="container-fluid">
                    {children}
                </div>
            </main>
        </>
    );
}