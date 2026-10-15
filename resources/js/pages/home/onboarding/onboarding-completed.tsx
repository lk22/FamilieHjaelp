import { Head, Link, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';

import { type SharedData } from '@/types';

interface ICompletingOnboardingStep {
    action: string;
    progressStep: number;
    progressPercent: number;
    callback: () => Promise<void>;
}

type kidData = {
    ageMonths: string,
    ageWeeks: string;
    ageYears: string;
    gender: string;
    name: string;
    needsUserLogin: boolean;
    userEmail: string | null;
}

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

type StepData = {
    one: {
        familyName: string;
    };
    two: FamilyInformation;
    three: kidData[];
}

export default function OnboardingCompleted() {
    const { auth, onboardingSessionToken, stepsData } = usePage<SharedData & { onboardingSessionToken?: string | null }>().props;
    const [loadingProgressPercentage, setLoadingProgressPercentage] = useState<number>(0);
    const [progressResponse, setProgressResponse] = useState<string | null>(null);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [responseError, setResponseError] = useState<string | null>(null);

    const [stepData] = useState<Record<string, any>>(stepsData ?? null);

    console.log(stepData);

    // TODO complete the onboarding steps by verifying the session token and updating the user's onboarding status
    // TODO step one verify the session token
    // TODO step two update the user's onboarding status
    // TODO step three create the user in the database
    // TODO step four after creating the user, create the family and associates records in the database
    // TODO step five redirect the user to the app platformdwddd

    const completeOnboarding = useCallback(async () => {
        const sessionToken = onboardingSessionToken;
        let progressStep = 0;
        let progressPercent = 0;
        let familyId: number | null = null;

        const steps: ICompletingOnboardingStep[] = [
            {
                "action": "verify_session_token",
                "progressStep": progressStep,
                "progressPercent": progressPercent + 15,
                "callback": async () => {
                    console.log("Starting verification of session token");

                    // implement the verification of the session token here
                    if ( ! sessionToken ) {
                        console.error("Session token not found");
                        return;
                    }

                    console.log("Session token exists, proceeding with verification");
                }
            },
            {
                "action": "creating family ",
                "progressStep": progressStep + 1,
                "progressPercent": progressPercent + 25,
                "callback": async () => {
                    const familyName = stepData.one.familyName;
                    const kidsAmount = stepData.three.length
                    let familySize = 1;

                    // increment the family size to 2 if the user has a partner
                    if ( stepData.two.hasPartner ) {
                        familySize += 1;
                    }

                    // get the amount of found kids
                    if (kidsAmount > 0) {
                        familySize += kidsAmount;
                    }

                    console.log("Creating family members");
                    const response = await fetch('/api/onboarding/family/create', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '',
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        body: JSON.stringify({
                            "familyName": familyName,
                            "familySize": familySize,
                            'token': sessionToken
                        })
                    });

                    const data = await response.json();

                    console.log("Family creation response data:", data);

                    familyId = data.familyId;

                    if ( data.error ) {
                        console.error("Error creating family:", data.error);
                        setResponseError("Noget gik galt, vi kunne ikke oprette familien lige nu, prøv igen senere.");
                        return;
                    }

                    // implement the creation of the family here
                    console.log("Family created successfully");
                }
            },
            {
                "action": "creating family associates",
                "progressStep": progressStep + 2,
                "progressPercent": progressPercent + 33,
                "callback": async () => {
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

                    const response = await fetch('/api/onboarding/family/create/parents', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '',
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        body: JSON.stringify({
                            familyId: familyId,
                            mainParent: parent,
                            partner: parent.hasPartner ? partner : null
                        })
                    });

                    const responseData = await response.json();
                    if ( ! responseData.success ) {
                        setResponseError("Something went wrong, could not add parents");
                        return;
                    }
                    // implement the creation of the family associates here
                    console.log("Family associates created successfully");
                }
            },
            {
                "action": "creating family children",
                "progressStep": progressStep + 2,
                "progressPercent": progressPercent + 40,
                "callback": async () => {
                    const children: Child[] = stepData.three.kids;
                    console.log(children);

                    // implement the creation of the family children here
                    console.log("Family children created successfully");
                }
            },
            {
                "action": "sending user request mails to associates",
                "progressStep": progressStep + 3,
                "progressPercent": progressPercent + 60,
                "callback": async () => {
                    // implement the completion of the onboarding process here
                    console.log("Onboarding completed successfully");
                }
            },
            {
                "action": "sending user request mails to family children emails",
                "progressStep": progressStep + 4,
                "progressPercent": progressPercent + 80,
                "callback": async () => {
                    // implement the sending of user request mails to family children emails here
                    console.log("User request mails sent to family children emails successfully");
                }
            },
            {
                "action": "complete_onboarding",
                "progressStep": progressStep + 5,
                "progressPercent": progressPercent + 100,
                "callback": async () => {
                    // implement the completion of the onboarding process here
                    console.log("Onboarding completed successfully");
                }
            }
        ]

        try {
            for (const step of steps) {
                console.log(`Starting step ${progressStep} with progress ${step.progressPercent}%`);

                await step.callback();
            }
        }
        catch (error) {
            console.error("Error completing onboarding steps:", error);
        }
    }, []);

    useEffect(() => {
        completeOnboarding();
    }, []);

    return (
        <>
            <Head title="Onboarding fuldført" />

            <main className="bg-[#004EA7] py-16 text-white h-screen flex items-center justify-center">
                <div className="mx-auto w-full max-w-3xl px-6">
                    <h1 className="text-3xl font-bold">Tak - din familie er oprettet</h1>
                    <p className="mt-4 text-lg" id="onboarding-completed-message">Vi har gemt dine onboarding oplysninger.</p>
                    #checklist
                    <ul className="mt-4 text-left">
                        <li>
                            <div className="flex items-center gap-4">
                                <picture>
                                    <svg width="25px" height="25px" viewBox="0 -4 24 24" id="meteor-icon-kit__solid-checkmark" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M3.06066 6.4393C2.47487 5.85355 1.52513 5.85355 0.93934 6.4393C0.353553 7.0251 0.353553 7.9749 0.93934 8.5607L7.93934 15.5607C8.52513 16.1464 9.47487 16.1464 10.0607 15.5607L23.0607 2.56066C23.6464 1.97487 23.6464 1.02513 23.0607 0.43934C22.4749 -0.14645 21.5251 -0.14645 20.9393 0.43934L9 12.3787L3.06066 6.4393z" fill="#758CA3"/></svg>
                                </picture>
                                Opretter famillie
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center gap-4">
                                <picture>
                                    <svg width="25px" height="25px" viewBox="0 -4 24 24" id="meteor-icon-kit__solid-checkmark" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M3.06066 6.4393C2.47487 5.85355 1.52513 5.85355 0.93934 6.4393C0.353553 7.0251 0.353553 7.9749 0.93934 8.5607L7.93934 15.5607C8.52513 16.1464 9.47487 16.1464 10.0607 15.5607L23.0607 2.56066C23.6464 1.97487 23.6464 1.02513 23.0607 0.43934C22.4749 -0.14645 21.5251 -0.14645 20.9393 0.43934L9 12.3787L3.06066 6.4393z" fill="#758CA3"/></svg>
                                </picture>
                                Opretter familiemedlemmer
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center gap-4">
                                <picture>
                                    <svg width="25px" height="25px" viewBox="0 -4 24 24" id="meteor-icon-kit__solid-checkmark" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M3.06066 6.4393C2.47487 5.85355 1.52513 5.85355 0.93934 6.4393C0.353553 7.0251 0.353553 7.9749 0.93934 8.5607L7.93934 15.5607C8.52513 16.1464 9.47487 16.1464 10.0607 15.5607L23.0607 2.56066C23.6464 1.97487 23.6464 1.02513 23.0607 0.43934C22.4749 -0.14645 21.5251 -0.14645 20.9393 0.43934L9 12.3787L3.06066 6.4393z" fill="#758CA3"/></svg>
                                </picture>
                                Opretter børn i familien
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center gap-4">
                                <picture>
                                    <svg width="25px" height="25px" viewBox="0 -4 24 24" id="meteor-icon-kit__solid-checkmark" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M3.06066 6.4393C2.47487 5.85355 1.52513 5.85355 0.93934 6.4393C0.353553 7.0251 0.353553 7.9749 0.93934 8.5607L7.93934 15.5607C8.52513 16.1464 9.47487 16.1464 10.0607 15.5607L23.0607 2.56066C23.6464 1.97487 23.6464 1.02513 23.0607 0.43934C22.4749 -0.14645 21.5251 -0.14645 20.9393 0.43934L9 12.3787L3.06066 6.4393z" fill="#758CA3"/></svg>
                                </picture>
                                Sender forespørgsel på bruger oprettelse til familie medlemmer
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center gap-4">
                                <picture>
                                    <svg width="25px" height="25px" viewBox="0 -4 24 24" id="meteor-icon-kit__solid-checkmark" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M3.06066 6.4393C2.47487 5.85355 1.52513 5.85355 0.93934 6.4393C0.353553 7.0251 0.353553 7.9749 0.93934 8.5607L7.93934 15.5607C8.52513 16.1464 9.47487 16.1464 10.0607 15.5607L23.0607 2.56066C23.6464 1.97487 23.6464 1.02513 23.0607 0.43934C22.4749 -0.14645 21.5251 -0.14645 20.9393 0.43934L9 12.3787L3.06066 6.4393z" fill="#758CA3"/></svg>
                                </picture>
                                Sender bruger forespørgsel på oprettelse til alle børn i familien
                            </div>
                        </li>
                    </ul>

                    {
                        isCompleted && (
                            <div className="mt-8">
                                {auth?.user ? (
                                    <Link className="inline-block rounded bg-white px-6 py-3 font-semibold text-[#004EA7]" href={route('profile.home')}>
                                        Gå til overblik
                                    </Link>
                                ) : (
                                    <div className="flex flex-wrap gap-3">
                                        <Link
                                            className="inline-block rounded bg-white px-6 py-3 font-semibold text-[#004EA7]"
                                            href={route('register', {
                                                _query: {
                                                    onboarding_completed: true,
                                                    redirect_to: 'onboarding.complete',
                                                    session_token: onboardingSessionToken,
                                                },
                                            })}
                                        >
                                            Opret bruger
                                        </Link>
                                        <Link
                                            className="inline-block rounded border border-white px-6 py-3 font-semibold text-white"
                                            href={route('login', {
                                                _query: {
                                                    onboarding_completed: true,
                                                    redirect_to: 'onboarding.complete',
                                                    session_token: onboardingSessionToken,
                                                },
                                            })}
                                        >
                                            Log ind
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )
                    }
                </div>
            </main>
        </>
    );
}
