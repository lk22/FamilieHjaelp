import React from 'react';
import ProgressBar from '@/components/Onboarding/progressBar';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import OnboardingHeader from '@/components/Onboarding/onboarding-header';

interface OnboardingTemplateInterface {
    children?: React.ReactNode[];
    title?: string;
    description?: string | React.ReactNode;
    screenGraphic?: string | null
}

export default function OnboardingTemplate({
    children, 
    title, 
    description, 
    screenGraphic,
}: OnboardingTemplateInterface) {

    return (
        <OnboardingProvider>
            <OnboardingHeader />
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
                            <div className="mt-2 text-xl">
                                {description}
                            </div>
                            <ProgressBar />
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    {children}
                </div>
            </main>
        </OnboardingProvider>
    );
}

