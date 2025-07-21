import { useForm, Link } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {useOnboarding} from "@/contexts/OnboardingContext";

export default function OnboardingStepFourForm() {
    // Use the onboarding context for state management
    const { completeStep, isStepCompleted, getCurrentStepData, updateStepProgress } = useOnboarding();

    // getting current step data from the context
    const currentStepData = getCurrentStepData(4);

    // checking if the particular step is completed
    const isCompleted = isStepCompleted(4);

    const { data, setData, post, processing, errors } = useForm<{
        step: number;
        situation_date: string;
    }>({
        step: 4,
        situation_date: ''
    });

    /**
     * Handler for submitting step data to the backend
     * @param e React.FormEvent
     * @description Handles the form submission for step four of the onboarding process.
     * @returns void
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formattedDate = new Date(data.situation_date).toISOString();

        // strip the tz offset from the date string
        const dateWithoutTimezone = formattedDate.replace(/T.*$/, '');

        if (isNaN(new Date(formattedDate).getTime())) {
            console.error("Invalid date format:", data.situation_date);
            return;
        }

        completeStep(4, {
            stepFour: {
                situation_date: dateWithoutTimezone
            }
        })

        data.situation_date = dateWithoutTimezone;

        post(route('onboarding.step.submit', { _query: { step: 4 } }), {
            onError: () => {
                console.error("Error submitting step:", errors);
            },
        });
    };

    /**
     * Handle date selection change
     * @param e React.ChangeEvent<HTMLInputElement>
     */
    const handleDateSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('situation_date', e.target.value);
        updateStepProgress(4, {
            not_started: false,
            in_progress: true,
            completed: false,
        });
    }

    /**
     * Returns the formatted date value for the input field
     * @description Formats the date value for the datetime-local input field.
     * @returns 
     */
    const getFormattedDateValue = () => {
        if (currentStepData.stepFour?.situation_date) {
            return new Date(currentStepData.stepFour.situation_date).toISOString().slice(0, 16);
        }
        return data.situation_date || '';
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <div className="grid gap-6">
                    <div className="grid gap-4">
                        <div className="flex pb-4 flex-col justify-end align-center text-blue-900">
                            <Label htmlFor="situation_date" className="flex items-center text-xl">Angiv dato</Label>
                            <input
                                type="datetime-local"
                                name="situation_date"
                                id="situation_date"
                                value={getFormattedDateValue()}
                                required
                                className="p-3 border mt-4"
                                onChange={(e) => handleDateSelection(e)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex">
                    { isCompleted ? (
                            <div className="text-green-500 text-md-mt-4">
                                <p>Du har allerede gennemfør dette trin</p>
                                    <Link href={route('onboarding.step', { step: "three" })} className="mt-4 inline-block text-blue-600 hover:text-blue-800">
                                    Gå tilbage
                                </Link>
                                    <Link href={route('onboarding.step', { step: "five" })} className="mt-4 ml-4 inline-block text-blue-600 hover:text-blue-800">
                                    fortsæt til næste trin
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Button type="submit" onClick={handleSubmit} disabled={processing} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                                    {processing ? "Indsender..." : "Fortsæt"}
                                </Button>
                                <Link href={route('onboarding.step', { step: "three" })} className="mt-4 ml-4 inline-block text-blue-600 hover:text-blue-800">
                                    Gå tilbage
                                </Link>
                            </>
                        )}
                </div>
            </div>
        </form>
    );
}
