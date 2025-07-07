import React from 'react';
interface OnboardingTemplateInterface {
    children?: React.ReactNode[];
    title?: string;
    description: string;
    screenGraphic?: string | null
}

export default function OnboardingTemplate({children, title, description, screenGraphic}: OnboardingTemplateInterface) {
    return (
        <>
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
                <div className="container-fluid py-18 max-w-full flex w-full flex-col bg-[#004EA7] text-white dark:bg-[#0a0a0a]">
                    <div className="container max-w-[960px] flex-col py-8 m-auto">
                        <div className="">
                            <div className="logo">
                                <a href={route('home')}>
                                    <span className="flex items-center gap-4">
                                        <img src="/images/inline_logo.svg" alt="Familiehjælp Logo" className="animate animate-fade-up animate-ease-linear relative bottom-4 animate-in w-auto dark:invert h-[50px]" />
                                    </span>
                                </a>
                            </div>
                            {screenGraphic && (
                                <div className="illustration-wrapper">
                                        <img
                                            src={`/images/${screenGraphic}.svg`}
                                            alt="Familiehjælp Illustration"
                                            className="mt-8 w-full max-w-[400px] mx-auto"
                                        />
                                </div>
                            )}
                            <h1 className="text-3xl font-bold mt-8">{title}</h1>
                            <p className="mt-2 text-xl">{description}</p>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    {children}
                </div>
            </main>
        </>
    );
}