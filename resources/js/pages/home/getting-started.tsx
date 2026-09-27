import { Head, Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

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
    const { name } = usePage<SharedData>().props;
    const hasActiveSession = onboardingSession.nextStep !== null && !onboardingSession.completed;

    return (
        <>
            <Head title={`Kom i gang | ${name}`} />

            <main className="bg-[#004EA7] py-16 text-white">
                <div className="mx-auto w-full max-w-3xl px-6">
                    <h1 className="text-3xl font-bold">Opret din familie</h1>
                    <p className="mt-4 text-lg">
                        Vi guider dig gennem en kort onboarding, hvor du opretter din familie med forældre og børn.
                    </p>

                    <div className="mt-8 rounded-lg bg-white p-6 text-black shadow">
                        <h2 className="text-xl font-semibold">Onboarding trin</h2>
                        <ul className="mt-4 list-disc space-y-2 pl-5">
                            <li>Indtast familienavn</li>
                            <li>Indtast information om dig og eventuel partner</li>
                            <li>Tilføj et eller flere børn med køn, navn og alder</li>
                        </ul>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {!hasActiveSession ? (
                                <Button asChild>
                                    <Link href={route('onboarding.scenario.step', { scenario: 'family', step: 'one' })}>Start onboarding</Link>
                                </Button>
                            ) : null}

                            {hasActiveSession ? (
                                <>
                                    <Button asChild>
                                        <Link
                                            href={route('onboarding.scenario.step', {
                                                scenario: 'family',
                                                step: onboardingSession.nextStep,
                                            })}
                                        >
                                            Fortsæt hvor du slap
                                        </Link>
                                    </Button>

                                    <Button asChild variant="outline">
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
