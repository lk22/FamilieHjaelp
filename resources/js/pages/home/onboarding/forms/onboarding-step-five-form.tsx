
import { useForm, usePage, Link } from "@inertiajs/react";
import { JSX } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {useOnboarding} from "@/contexts/OnboardingContext";

export default function OnboardingStepFiveForm() {
    const { completeStep, isStepCompleted, getCurrentStepData, updateStepProgress } = useOnboarding();

    const currentStepData = getCurrentStepData(5);
    console.log('OnboardingStepFiveForm - Current step data:', currentStepData);
    const isCompleted = isStepCompleted(5);

    const { data, post, setData, processing, errors } = useForm<{
        step: number;
        pregnancy_week_number: string;
    }>({
        step: 5,
        pregnancy_week_number: ''
    });

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();

        completeStep(5, {
            stepFive: {
                pregnancy_week_number: data.pregnancy_week_number
            }
        });

        post(route('onboarding.step.submit', { _query: { step: 5 } }), {
            onError: () => {
                console.error("Error submitting step:", errors);
            },
        });
    };

    /**
     * Handles notifications based on the pregnancy week and situation
     */
    const handlePregnancyWeekNotification = (): JSX.Element => {
        // const situation = getCurrentStepData(2).stepTwo?.checks || [];
        // console.log('Current situation checks:', situation);
        const pregnancyWeek = data.pregnancy_week_number;
        const situation = getCurrentStepData(2).stepTwo?.checks || [];

        if ( pregnancyWeek >= "22" && situation.includes('deathborn')) {
            return (
                <div className="text-red-500 text-md">
                    Du har angivet at du har oplevet en dødsfødsel, og at du var mere end 22 uger henne i graviditeten. 
                    Vær opmærksom på at du skal anmelde din dødsfødsel til myndighederne eller dit lokale kirkekontor, hvis du ikke allerede har gjort det.
                </div>
            );
        } else if ( pregnancyWeek >= "22" && situation.includes('abort') ) {
            return (
                <div className="text-red-500 text-md">
                    Du har angivet at du har oplevet en abort, og at du var mere end 22 uger henne i graviditeten. 
                    Vær opmærksom på at du skal anmelde din abort til myndighederne eller dit lokale kirkekontor, hvis du ikke allerede har gjort det.
                </div>
            );
        }
    }

    /**
     * Handles the label for the pregnancy week input field
     * @description Returns a label based on whether the user is alone or not.
     * If the user is not alone, it will ask for the pregnancy week of both partners.
     * If the user is alone, it will ask for the user's pregnancy week.
     * @returns <Label>
     */
    const handlePregnancyWeekLabel = (): JSX.Element => {
        const partnerState = getCurrentStepData(3).stepThree?.checks || [];

        return partnerState.includes('is_not_alone') ? (
            <Label htmlFor="partner_name" className="flex items-center text-xl">Hvor langt var i henne i graviditeten ?</Label>
        ) : (
            <Label htmlFor="pregnancy_week_number" className="flex items-center text-xl">Hvor langt var du henne i graviditeten ?</Label>
        );
    }

    /**
     * Handles the change event for the pregnancy week input field
     * @param e React.ChangeEvent<HTMLInputElement>
     */
    const handlePregnancyWeekChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setData('pregnancy_week_number', e.target.value);
        updateStepProgress(5, {
            not_started: false,
            in_progress: true,
            completed: false,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <div className="grid gap-6">
                    <div className="grid gap-4">
                        <div className="flex pb-4 flex-col justify-end align-center">
                            {handlePregnancyWeekLabel()}
                            <span className="flex items-center gap-4 mt-4 flex-row">
                                <span className="font-bold text-lg">graviditetsuge: </span> 
                                <input 
                                    type="number" 
                                    name="pregnancy_week_number" 
                                    id="pregnancy_week_number"
                                    className="p-3 border w-full font-bold"
                                    onChange={(e) => handlePregnancyWeekChange(e)}
                                />
                            </span>
                        </div>
                        {handlePregnancyWeekNotification()}
                    </div>
                </div>

                <div className="flex">
                    {isCompleted ? (
                        <div className="text-green-500 text-md mt-4">
                            <p>Du har allerede gennemført dette trin.</p>
                            <Link href={route('onboarding.step', { step: "six" })} className="mt-4 inline-block text-blue-600 hover:text-blue-800">
                                Gå tilbage
                            </Link>
                            <Link href={route('onboarding.step', { step: "six" })} className="mt-4 ml-4 inline-block text-blue-600 hover:text-blue-800">
                                fortsæt til næste trin
                            </Link>
                        </div>
                    ) : (
                        <div className="text-red-500 text-md mt-4">
                            <Button type="submit" onClick={handleSubmit} disabled={processing} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                                {processing ? "Indsender..." : "Fortsæt"}
                            </Button>
                            <Link 
                                href={route('onboarding.step', { step: "four" })} className="mt-4 ml-4 inline-block text-blue-600 hover:text-blue-800">
                                Gå tilbage
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
}
