import React from 'react';
import { useForm, Link, router } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { useOnboarding } from "@/contexts/OnboardingContext";
/**
 * Onboarding Step Two Form
 * @returns JSX.Element[]
 * @description This component renders the second step of the onboarding process, allowing users to select situations they have experienced and provide additional information.
 * @author Leo Knudsen
 * @version 1.0.0
 */
export default function OnboardingStepTwoForm() {
    // use the onboarding context for state management
    const { completeStep, isStepCompleted, getCurrentStepData, updateStepProgress } = useOnboarding();

    const currentStepData = getCurrentStepData(2);
    const isCompleted = isStepCompleted(2);

    console.log('OnboardingStepTwoForm - Current step data:', currentStepData);

    const { data, setData, post, processing } = useForm<{
        step: number;
        checks: string[];
        otherDescription?: string;
    }>({
        step: 2,
        checks: [],
        otherDescription: ''
    });

    /**
     * Submit handler for step two
     * @description Handles the form submission for step two of the onboarding process.
     * @returns void
     * @param e React.FormEvent
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 

        completeStep(2, {
            stepTwo: {
                checks: data.checks,
                otherDescription: data.otherDescription
            }
        })

        router.visit(route('onboarding.step', { step: 'three' }));

        post(route('onboarding.step.submit', { _query: { step: 2 } }), {
            preserveState: true,
            preserveScroll: true,
            only: [], // Don't reload any props 
        });
    };

    /**
     * Handler for checkbox changes
     * @param check string
     * @param checked boolean
     * @description Handles checkbox changes for the checks in step two.
     * @returns void
     */
    const handleCheckChanges = (check: string, checked?: boolean) => {
        console.log(`Checkbox ${check} changed to ${checked}`);
        setData(
            'checks',
            checked ? [...data.checks, check] :
            data.checks.filter((c) => c !== check)
        );
        updateStepProgress(2, {
            not_started: false,
            in_progress: true,
            completed: false
        });
    }

    /**
     * Handler for text area change events
     * @description Updates the otherDescription in the form data and the onboarding step state.
     * @param e React.ChangeEvent<HTMLTextAreaElement>
     * @returns void
     */
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setData('otherDescription', e.target.value);
        updateStepProgress(2, {
            not_started: false,
            in_progress: true,
            completed: false
        });
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <div className="grid gap-6">
                    <div className="grid gap-4">
                        <div className="flex pb-4 flex-row-reverse justify-end text-blue-900">
                            <Label htmlFor="situtation" className="text-2xl">Jeg har oplevet en dødsfødsel</Label>
                            <Checkbox 
                                id="situtation" 
                                checked={
                                    data.checks.includes('deathborn') || 
                                    currentStepData.stepTwo?.checks.includes('deathborn')
                                }
                                onCheckedChange={(checked) => handleCheckChanges('deathborn', checked === true)}
                                className="mr-4"
                            />
                        </div>
                        <div className="flex pb-4 flex-row-reverse justify-end text-blue-900">
                            <Label htmlFor="abort" className="text-2xl">Jeg har oplevet en abort</Label>
                            <Checkbox 
                                id="abort" 
                                checked={
                                    data.checks.includes('abort') || 
                                    currentStepData.stepTwo?.checks.includes('abort')
                                }
                                onCheckedChange={(checked) => handleCheckChanges('abort', checked === true)}
                                className="mr-4"
                            />
                        </div>
                        <div className="pb-4 flex-row-reverse justify-end hidden text-blue-900">
                            <Label htmlFor="graviditet" className="text-2xl">Jeg har oplevet en almindelig graviditet</Label>
                            <Checkbox 
                                id="graviditet" 
                                checked={
                                    data.checks.includes('pregnancy') || 
                                    currentStepData.stepTwo?.checks.includes('pregnancy')
                                }
                                onCheckedChange={() => handleCheckChanges('pregnancy')}
                                className="mr-4"
                            />
                        </div>
                        <div className="flex pb-4 flex-row-reverse justify-end text-blue-900">
                        <Label htmlFor="other" className="text-2xl">Jeg har oplevet en anden situation</Label>
                        <Checkbox 
                            id="other" 
                            checked={
                                data.checks.includes('other') || 
                                currentStepData.stepTwo?.checks.includes('other')
                            }
                            onCheckedChange={(checked) => handleCheckChanges('other', checked === true)}
                            className="mr-4"
                        />
                        </div>
                        <TextArea 
                            id="otherDescription" 
                            placeholder="Beskriv venligst"
                            onChange={(e) => handleTextChange(e)}
                            value={data.otherDescription || currentStepData.stepTwo?.otherDescription || ''}
                            className="mt-2 text-blue-900"
                            disabled={!data.checks.includes('other')}
                            isDebuggable={false}
                        />
                    </div>
                </div>

                <div className="flex">
                    {isCompleted ? (
                        <div className="text-green-500 text-md mt-4">
                            <p>Du har allerede gennemført dette trin.</p>
                            <Link href={route('onboarding.step', { step: "one" })} className="mt-4 inline-block text-blue-600 hover:text-blue-800">
                                Gå tilbage
                            </Link>
                            <Link href={route('onboarding.step', { step: "three" })} className="mt-4 ml-4 inline-block text-blue-600 hover:text-blue-800">
                                fortsæt til næste trin
                            </Link>
                        </div>
                    ) : (
                        <div className="text-red-500 text-md mt-4">
                            <Link href={route('onboarding.step', { step: "one" })} className="mt-4 mr-4 inline-block text-blue-600 hover:text-blue-800">
                                Gå tilbage
                            </Link>
                            <Button type="submit" onClick={handleSubmit} disabled={processing} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                                {processing ? "Indsender..." : "Fortsæt"}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
}
