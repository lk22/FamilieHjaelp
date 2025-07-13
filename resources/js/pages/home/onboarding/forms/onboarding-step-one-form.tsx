import { useForm, Link, router } from "@inertiajs/react";
import React from "react";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOnboarding } from "@/contexts/OnboardingContext";

export default function OnboardingStepOneForm() {
    // Use the onboarding context for state management
    const { completeStep, isStepCompleted, getCurrentStepData } = useOnboarding();

    // Get step 1 data from the context
    const currentStepData = getCurrentStepData(1);
    const isCompleted = isStepCompleted(1);

    const { data, setData, post, processing, errors } = useForm<{
        step: number;
        name: string;
    }>({
        step: 1,
        name: ''
    });

    /**
     * Handler for submitting step data to the backend
     * @param e React.FormEvent
     * @description Handles the form submission for step one of the onboarding process.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Complete step 1 with the form data using the context
        completeStep(1, {
            stepOne: { name: data.name }
        });

        // Navigate to the next step
        router.visit(route('onboarding.step', { step: 'two' }));

        // Background sync with the backend
        post(route('onboarding.step.submit'), {
            preserveState: true,
            preserveScroll: true,
            only: [],
        });
    };

    return (
        <form>
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-xl">Navn</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            value={data.name || currentStepData.stepOne?.name || ''}
                            onChange={(e) => setData('name', e.target.value)}
                            className="p-6 border"
                        />
                        <InputError message={errors.name} />
                    </div>
                </div>
                { isCompleted ? (
                        <div className="text-green-500 text-md mt-4">
                            Du har gennemført dette trin.
                            <Link href={route('onboarding.step', {step: "two"})} className="mt-4 ml-4 inline-block text-blue-600 hover:text-blue-800">
                                fortsæt til næste trin
                            </Link>
                        </div>
                    ) : (
                        <Button type="submit" onClick={handleSubmit} disabled={processing} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer p-5 text-lg">
                            {processing ? "Indsender..." : "Fortsæt"}
                        </Button>
                    )
                }
            </div>
        </form>
    );
}
