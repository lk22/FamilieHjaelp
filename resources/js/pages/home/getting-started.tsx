import { Head, Link, usePage } from '@inertiajs/react';
import {useTranslation} from 'react-i18next';

import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';

import {localizeRoute} from '@/util/localizeRoute';

interface OnboardingSessionProps {
    onboardingSession: {
        token: string | null;
        currentStep: string | null;
        nextStep: string | null;
        stepsData: Record<string, unknown>;
        formData: Record<string, unknown>;
        completed: boolean;
    };
}

export default function GettingStarted({ onboardingSession }: OnboardingSessionProps) {
    const { name, locale } = usePage<SharedData>().props;
    const hasActiveSession = onboardingSession.nextStep !== null && !onboardingSession.completed;
    const { t } = useTranslation();
    const localizedRoute = localizeRoute(locale);

    return (
        <>
            <Head title={`Kom i gang | ${name}`} />
            <main className="bg-[#004EA7] py-16 text-white h-[100dvh] flex items-center justify-center" id="onboarding">
                <div className="mx-auto w-full max-w-3xl px-6">
                    <img
                        src="/images/logo.svg"
                        height={75}
                        width={75}
                        alt="Onboarding illustration" className="mb-4"
                    />
                    <h1 className="text-3xl font-bold">{t("app.getting_started.create_family")}</h1>
                    <p className="mt-4 text-lg">
                        {t("app.getting_started.create_family_description")}
                    </p>

                    <div className="mt-8 rounded-lg bg-white p-6 text-black shadow">
                        <h2 className="text-3xl font-semibold">{t("app.getting_started.descripted_steps.label")}</h2>
                        <ul className="mt-4 list-disc space-y-2 pl-5">
                            <li>{t("app.getting_started.descripted_steps.step_one")}</li>
                            <li>{t("app.getting_started.descripted_steps.step_two")}</li>
                            <li>{t("app.getting_started.descripted_steps.step_three")}</li>
                        </ul>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {!hasActiveSession ? (
                                <Button asChild className="bg-blue-700 text-white hover:bg-blue-600">
                                    <Link
                                        href={localizedRoute('onboarding.scenario.step', { scenario: 'family', step: 'one', locale: locale })}
                                        className="bg-blue-700 text-white hover:bg-blue-600"
                                    >
                                        Start onboarding
                                    </Link>
                                </Button>
                            ) : null}

                            {hasActiveSession ? (
                                <>
                                    <Button asChild className="bg-blue-700 text-white hover:bg-blue-600">
                                        <Link
                                            href={localizedRoute('onboarding.scenario.step', {
                                                scenario: 'family',
                                                step: onboardingSession.nextStep,
                                                locale: locale
                                            })}
                                            className="bg-blue-700 text-white hover:bg-blue-600"
                                        >
                                            Fortsæt hvor du slap
                                        </Link>
                                    </Button>

                                    <Button asChild variant="outline" className="bg-blue-900 text-white hover:bg-blue-800 hover:text-white">
                                        <Link href={route('onboarding.reset')}>Start forfra</Link>
                                    </Button>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
