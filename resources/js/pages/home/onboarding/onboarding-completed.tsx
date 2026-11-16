import { Head, Link, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useState, useRef } from 'react';
import { useTranslation } from "react-i18next";

import { type SharedData } from '@/types';

import {
    createFamily,
    createFamilyParents,
    createFamilyChildren,
    sendCompleteOnboardingProcess,
    verifySession
} from '@/lib/api';

type FamilyInformation = {
    firstName: string;
    middleName: string;
    lastName: string;
    hasPartner: boolean;
    age: string;
    familyTitle: string;
    partnerFirstName: string;
    partnerMiddleName: string;
    partnerLastName: string;
    partnerAge: string;
    partnerFamilyTitle: string;
    partnerNeedsUser?: boolean;
    partnerUserEmail?: string | null;
}

type Child = {
    firstName: string;
    middleName: string;
    lastName: string;
    age: string;
    gender: string;
    needsUserLogin: boolean;
    userEmail: string | null;
}

type Parent = Omit<FamilyInformation, "partnerFirstName" | "partnerMiddleName" | "partnerLastName" | "partnerAge" | "partnerFamilyTitle" | "partnerNeedsUser" | "partnerUserEmail">;
type Partner = Pick<FamilyInformation, "partnerFirstName" | "partnerMiddleName" | "partnerLastName" | "partnerAge" | "partnerFamilyTitle" | "partnerNeedsUser" | "partnerUserEmail">;

type StepStatus = 'pending' | 'active' | 'done' | 'error';

const MIN_STEP_DURATION = 700;

// TODO find a way to dynamically generate step labels from translations
const stepDefinitions = [
    {key: 'verify-session-token', label: 'Verificere udfyldning'},
    {key: 'creating-family', label: 'Opretter ny familie'},
    {key: 'parents', label: 'Opretter forældre profiler'},
    {key: 'children', label: 'Opretter børne profiler'},
    {key: 'completed', label: 'Færdiggører processen'}
];

type StepKey = typeof stepDefinitions[number]['key'];

export default function OnboardingCompleted() {
    const { auth, onboardingSessionToken, stepsData } = usePage<SharedData & { onboardingSessionToken?: string | null;}>().props;
    console.log(onboardingSessionToken)
    const [progressCompleted, setProgressCompleted] = useState<boolean>(false)
    const [, setProgress] = useState<number>(0);
    const [hasError, setHasError] = useState<boolean>(false);
    const [responseError, setResponseError] = useState<string | null>(null);

    const [stepData] = useState<Record<string, any>>(stepsData ?? null);

    const [statuses, setStatuses] = useState<Record<StepKey, StepStatus>>(
        Object.fromEntries(stepDefinitions.map(s => [s.key, 'pending'])) as Record<StepKey, StepStatus>
    )

    const hasStarted = useRef(false);
    const setStatus = (key: StepKey, status: StepStatus) => setStatuses(prev => ({...prev, [key]: status}))
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const { t } = useTranslation();
    const translations = {
        steps: {
            verify: t('app.getting_started.completed_step.steps.verify'),
            creating_family: t('app.getting_started.completed_step.steps.creating_family'),
            parents: t('app.getting_started.completed_step.steps.parents'),
            children: t('app.getting_started.completed_step.steps.children'),
            completed: t('app.getting_started.completed_step.steps.completed'),
        },
        completedHeading: t('app.getting_started.completed_step.process_completed.completed_heading'),
        completedText: t('app.getting_started.completed_step.process_completed.onboarding_completed_message'),
        completedSubText: t('app.getting_started.completed_step.process_completed.onboarding_completed_sub_message'),
        processing: t('app.getting_started.completed_step.process_completed.processing'),
        goToOverview: t('app.getting_started.completed_step.process_completed.go_to_overview'),
        logInHere: t('app.getting_started.completed_step.process_completed.log_in_here')
    }

    stepDefinitions.forEach(step => {
        step.label = translations[step.key.replace(/-/g, '') as keyof typeof translations.steps] || step.label;
    });

    const assertSuccess = (response: { code: number; message?: string } | null | undefined, fallback: string): void => {
        if (!response) {
            throw new Error(fallback);
        }
        if (response.code !== 200 && response.code !== 201) {
            throw new Error(response.message || fallback);
        }
    };

    const completeOnboarding = useCallback(async () => {
        setHasError(false);
        setResponseError(null);

        const sessionToken = onboardingSessionToken;
        let familyId: number | null = null;

        const requireFamilyId = (): number => {
            if (familyId === null) {
                throw new Error('Family id missing');
            }
            return familyId;
        };

        const steps: {
            action: StepKey,
            progressPercent: number,
            callback: () => Promise<void>
        }[] = [
            {
                action: 'verify-session-token',
                progressPercent: 15,
                callback: async () => {
                    console.log(sessionToken)

                    if (!sessionToken) {
                        throw new Error("Session token not found");
                    }

                    const response = await verifySession(sessionToken);
                    assertSuccess(response, 'Failed to verify session token');

                    if (response.data?.completed) {
                        setProgressCompleted(true);
                        setHasError(false);
                        throw new Error("Din familie er allerede oprettet.");
                    }

                }
            },
            {
                action: 'creating-family',
                progressPercent: 25,
                callback: async () => {
                    const familyName = stepData.one.familyName;
                    const kidsAmount = stepData.three.kids.length;
                    let familySize = 1;

                    // increment the family size to 2 if the user has a partner
                    if ( stepData.two.hasPartner ) {
                        familySize += 1;
                    }

                    // get the amount of found kids
                    if (kidsAmount > 0) {
                        familySize += kidsAmount;
                    }

                    const response = await createFamily({
                        familyName,
                        familySize,
                        token: sessionToken
                    });

                    assertSuccess(response, 'Could not create family');
                    familyId = response.familyId ?? null;
                }
            },
            {
                action: 'parents',
                progressPercent: 35,
                callback: async () => {
                    // implement the creation of parents here
                    const familyInformation = stepData.two;
                    const parent: Parent = {
                        firstName: familyInformation.firstName,
                        middleName: familyInformation.middleName,
                        lastName: familyInformation.lastName,
                        age: familyInformation.age,
                        familyTitle: familyInformation.familyTitle,
                        hasPartner: familyInformation.hasPartner
                    }

                    const partner: Partner = {
                        partnerFirstName: familyInformation.partnerFirstName,
                        partnerMiddleName: familyInformation.partnerMiddleName,
                        partnerLastName: familyInformation.partnerLastName,
                        partnerNeedsUser: familyInformation.partnerNeedsUser,
                        partnerUserEmail: familyInformation.partnerUserEmail,
                        partnerAge: familyInformation.partnerAge,
                        partnerFamilyTitle: familyInformation.partnerFamilyTitle,
                    };

                    const response = await createFamilyParents({
                        familyId: requireFamilyId(),
                        mainParent: parent,
                        partner: parent.hasPartner ? partner : undefined
                    });

                    assertSuccess(response, 'Could not create family parents');
                }
            },
            {
                action: 'children',
                progressPercent: 50,
                callback: async () => {
                    const children: Child[] = stepData.three.kids;

                    const response = await createFamilyChildren({
                        familyId: requireFamilyId(),
                        children: children
                    });

                    assertSuccess(response, 'Could not create family children');
                }
            },
            {
                action: 'completed',
                progressPercent: 100,
                callback: async () => {
                    const response = await sendCompleteOnboardingProcess({
                        familyId: requireFamilyId()
                    });

                    assertSuccess(response, 'Could not complete onboarding');
                }
            }
        ];

        for (const step of steps) {
            setStatus(step.action, 'active');

            try {
                // real work and minimum visible time run in parallel
                await Promise.all([step.callback(), sleep(MIN_STEP_DURATION)]);
            } catch (error) {
                console.error(`Onboarding step "${step.action}" failed:`, error);
                setStatus(step.action, 'error');
                setHasError(true);
                setResponseError(error instanceof Error ? error.message : 'Ukendt fejl');
                return;
            }

            setStatus(step.action, 'done');
            setProgress(step.progressPercent);
        }

        await sleep(500);
        setProgressCompleted(true);
    }, [onboardingSessionToken, stepData]);

    useEffect(() => {
        if (hasStarted.current) return;
        hasStarted.current = true;
        completeOnboarding();
    }, [completeOnboarding]);

    function StepIcon({status}: {status: StepStatus}) {
        if (status === 'active') {
            return <span className="size-6 animate-spin rounded-full border-2 border-blue-900 border-t-transparent transition-transform" />;
        }
        if (status === 'done') {
            return (
                <svg className="size-6 text-blue-900 -ml-px animate-[pop_500ms_ease-out] transition transition-animate" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                    <path d="M4 12l5 5L20 6" />
                </svg>
            );
        }
        if (status === 'error') {
            return <span className="size-6 text-center font-bold text-red-500">!</span>;
        }
        return <span className="size-6 rounded-full border-2 border-gray-300" />;
    }

    return (
        <>
            <Head title="Onboarding fuldført" />
            <main className="bg-white py-16 text-white h-screen flex items-center justify-center">
                <div className="mx-auto w-full max-w-3xl px-6">
                    <div className="bg-white p-8 rounded border boder-2 border-blue-900">
                        {progressCompleted && !hasError && (
                            <>
                                <h1 className="text-3xl font-bold text-blue-900">{translations.completedHeading}</h1>
                                <p className="mt-4 text-lg text-blue-900 font-bold mb-4" id="onboarding-completed-message">{translations.completedText}</p>
                                <p className="text-blue-900">{translations.completedSubText}</p>
                            </>
                        )}
                        {hasError && (
                            <>
                                <p className="text-blue-900 font-bold text-2xl">Du er klar til at fortsætte</p>
                                <p className="mt-4 text-lg text-red-500" id="onboarding-error-message">{responseError}</p>
                                <p className="mt-2 text-md text-blue-900">Din familie er allerede oprettet, se om du har modtaget en mail fra os med login oplysninger for at fortsætte.</p>
                                {auth?.user ? (
                                    <Link className="mt-4 inline-block rounded bg-blue-900 px-6 py-3 font-semibold text-white" href={route('profile.home')}>
                                        {translations.goToOverview}
                                    </Link>
                                ) : (
                                    <div className="flex flex-wrap gap-3">
                                        <Link
                                            className="inline-block rounded border bg-blue-900 border-blue-900 px-6 py-3 font-semibold text-white"
                                            href={route('profile.home')}
                                        >
                                            {translations.logInHere}
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}
                        {! hasError && !progressCompleted && (
                            <>
                                <p className="mt-4 text-3xl text-blue-900 text-center" id="onboarding-loading-message">{translations.processing}</p>
                                <ul className="mt-4 text-left flex flex-col gap-4 items-center">
                                    {stepDefinitions.map(({ key, label }) => {
                                        const status = statuses[key];
                                        return (
                                            <li key={key} className="flex items-center gap-4">
                                                <StepIcon status={status} />
                                                <span className={
                                                    status === 'done'   ? 'font-bold text-blue-900' :
                                                    status === 'active' ? 'font-semibold text-blue-900 animate-pulse' :
                                                    status === 'error'  ? 'text-red-500' :
                                                                        'text-gray-400'
                                                } >
                                                    {label}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </>
                        )}
                        {progressCompleted && (
                                <div className="mt-8">
                                    {auth?.user ? (
                                        <Link className="inline-block rounded bg-blue-900 px-6 py-3 font-semibold text-[#004EA7]" href={route('profile.home')}>
                                            {translations.goToOverview}
                                        </Link>
                                    ) : (
                                        <div className="flex flex-wrap gap-3">
                                            <Link
                                                className="inline-block rounded border bg-blue-900 border-blue-900 px-6 py-3 font-semibold text-white"
                                                href={route('profile.home')}
                                            >
                                                {translations.logInHere}
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )
                        }
                    </div>
                </div>
            </main>
        </>
    );
}
