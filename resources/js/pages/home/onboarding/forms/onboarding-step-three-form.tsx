import { useForm, Link, router } from "@inertiajs/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useOnboarding } from "@/contexts/OnboardingContext";

/**
 * Onboarding Step Three Form
 * @returns JSX.Element
 * @description This component renders the third step of the onboarding process, allowing users to indicate their relationship status and whether they have a partner.
 * @author Leo Knudsen
 * @version 1.0.0
 */
export default function OnboardingStepThreeForm() {
    // Use the onboarding context for state management
    const { completeStep, isStepCompleted, getCurrentStepData, updateStepProgress } = useOnboarding();

    // Get step 3 data from the context
    const currentStepData = getCurrentStepData(3);

    // Check if step 3 is completed
    const isCompleted = isStepCompleted(3);

    const { data, post, setData, processing } = useForm<{
        step: number;
        checks: string[];
    }>({
        step: 3,
        checks: [],
    });

    /**
     * Handler for submitting step data to the backend
     * @returns void
     * @param e React.FormEvent
     * @description Handles the form submission for step three of the onboarding process.
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        completeStep(3, {
            stepThree: {
                checks: data.checks,
            }
        })

        router.visit(route('onboarding.step', { step: "four" }), {
            preserveState: true,
            preserveScroll: true,
        });

        // Sync with backend in background (fire and forget)
        post(route('onboarding.step.submit'), {
            preserveState: true,
            preserveScroll: true,
            only: [], // Don't reload any props
        });
    };

    /**
     * Handler for checkbox events
     * @param check string - The name of the checkbox
     * @param checked boolean - The checked state of the checkbox
     * @description Updates the checks array in the form data based on checkbox state.
     */
    const handleCheckEvent = (
        check: string,
        checked: boolean
    ) => {
        setData('checks', checked ? [...data.checks, check] : data.checks.filter((c) => c !== check));
        updateStepProgress(3, {
            not_started: false,
            in_progress: true,
            completed: false
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <div className="grid gap-6">
                    <div className="grid gap-4">
                        <div className="flex pb-4 flex-col justify-end align-center text-blue-900">
                            <div className="flex pb-4 flex-row-reverse justify-end">
                                <Label htmlFor="alone_status" className="text-xl">Jeg har en partner</Label>
                                <Checkbox id="is_not_alone" checked={data.checks.includes('is_not_alone') || currentStepData?.stepThree?.checks.includes('is_not_alone')}
                                    onCheckedChange={(checked: boolean) => {
                                        handleCheckEvent('is_not_alone', checked);
                                    }}
                                    className="mr-4"
                                />
                            </div>
                            <div className="flex pb-4 flex-row-reverse justify-end">
                                <Label htmlFor="alone_status" className="flex items-center text-xl">Er alene</Label>
                                <Checkbox id="alone_status" checked={data.checks.includes('is_alone') || currentStepData?.stepThree?.checks.includes('is_alone')}
                                    onCheckedChange={(checked: boolean) => {
                                        handleCheckEvent('is_alone', checked);
                                    }}
                                    className="mr-4"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    {
                        isCompleted ? (
                            <div className="text-green-500 text-md-mt-4">
                                <p>Du har allerede gennemfør dette trin</p>
                                    <Link href={route('onboarding.step', { step: "one" })} className="mt-4 inline-block text-blue-600 hover:text-blue-800">
                                    Gå tilbage
                                </Link>
                                    <Link href={route('onboarding.step', { step: "four" })} className="mt-4 ml-4 inline-block text-blue-600 hover:text-blue-800">
                                    fortsæt til næste trin
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Button type="submit" onClick={handleSubmit} disabled={processing} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                                    {processing ? "Indsender..." : "Fortsæt"}
                                </Button>
                                <Link href={route('onboarding.step', { step: "two" })} className="mt-4 ml-4 inline-block text-blue-600 hover:text-blue-800">
                                    Gå tilbage
                                </Link>
                            </>
                        )
                    }
                </div>
            </div>
        </form>
    );
}
