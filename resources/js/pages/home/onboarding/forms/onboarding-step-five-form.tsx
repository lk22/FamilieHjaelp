
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import {type PageProps} from "@inertiajs/core";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {type OnboardingData } from "@/types/onboarding";

type OnboardingStepFiveData = PageProps & {
    onboarding: OnboardingData;
}

export default function OnboardingStepFiveForm() {
    const [step, setStep] = useState(5);
    const { onboarding } = usePage<OnboardingStepFiveData>().props;

    const { data, post, setData, processing, errors } = useForm<{
        step: number;
        pregnancy_week_number: string;
    }>({
        step: step,
        pregnancy_week_number: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting step:", step, "with data:", data);
        localStorage.setItem('onboarding_step' + step, JSON.stringify(data));
        post(route('onboarding.step.submit', { _query: { step: step } }), {
            onSuccess: () => {
                setStep((prevStep) => prevStep + 1);
            },
            onError: () => {
                console.error("Error submitting step:", errors);
            },
        });
    };

    /**
     * Handles notifications based on the pregnancy week and situation
     */
    const handlePregnancyWeekNotification = () => {
        const situation = onboarding?.data?.steps[2].data.checks;
        const pregnancyWeek = data.pregnancy_week_number;
        console.log({ situation, pregnancyWeek })

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

    const handlePregnancyWeekLabel = () => {
        return onboarding?.data?.steps[3].data.checks.includes('is_not_alone') ? (
            <Label htmlFor="partner_name" className="flex items-center text-xl">Hvor langt var i henne i graviditeten ?</Label>
        ) : (
            <Label htmlFor="pregnancy_week_number" className="flex items-center text-xl">Hvor langt var du henne i graviditeten ?</Label>
        );
    }

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
                                    onChange={(e) => setData('pregnancy_week_number', e.target.value)}
                                />
                            </span>
                        </div>
                        {handlePregnancyWeekNotification()}
                    </div>
                </div>

                <Button type="submit" onClick={handleSubmit} disabled={processing} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                    {processing ? "Indsender..." : "Fortsæt"}
                </Button>
            </div>
        </form>
    );
}
