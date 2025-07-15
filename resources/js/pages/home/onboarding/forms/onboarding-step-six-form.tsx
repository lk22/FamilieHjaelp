
import { useForm, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import { TextArea } from "@/components/ui/textarea";

import { useOnboarding } from "@/contexts/OnboardingContext";

export default function OnboardingStepSixForm() {
    const { 
        completeStep, 
        isStepCompleted, 
        getCurrentStepData, 
        updateStepProgress, 
        completeOnboarding 
    } = useOnboarding();

    const currentStepData = getCurrentStepData(6);
    const isCompleted = isStepCompleted(6);

    const { data, setData, processing } = useForm<{
        step: number;
        checks: string[];
        other: string;
    }>({
        step: 6,
        checks: [], 
        other: ''
    });

    /**
     * Handler for submitting step data to the backend
     * @param e React.FormEvent
     * @description Handles the form submission for step six of the onboarding process.
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        completeStep(6, {
            stepSix: {
                checks: data.checks,
                other: data.other
            }
        });

        completeOnboarding();
    };

    /**
     * Handles the change event for mood checkboxes
     * @param checked boolean - whether the checkbox is checked or not
     * @param mood string - the mood associated with the checkbox
     */
    const handleMoodChange = (checked: boolean, mood: string) => {
        setData('checks', checked ? [...data.checks, mood] : data.checks.filter((check) => check !== mood));
        updateStepProgress(6, {
            not_started: false,
            in_progress: true,
            completed: false
        });
    }

    /**
     * Handles the change event for the "other" textarea
     * @param e React.ChangeEvent<HTMLTextAreaElement>
     */
    const handleOtherChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setData('other', e.target.value);
        updateStepProgress(6, {
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
                        <div className="flex pb-4 flex-col justify-end align-center">
                            <Label htmlFor="feeling_status" className="text-xl"></Label>
                            <div className="flex pb-4 flex-row-reverse justify-end">
                                <Label htmlFor="sad" className="text-xl">
                                    Jeg føler mig trist og nedtrygt
                                </Label>
                                <Checkbox id="is_not_alone" checked={data.checks.includes('sad') || currentStepData?.stepSix?.checks.includes('sad')}
                                    onCheckedChange={(checked: boolean) => handleMoodChange(checked, 'sad')}
                                    className="mr-4"
                                />
                            </div>
                            <div className="flex pb-4 flex-row-reverse justify-end">
                                <Label htmlFor="angry" className="text-xl">
                                    Jeg føler mig vred og frustreret
                                </Label>
                                <Checkbox id="is_not_alone" checked={data.checks.includes('angry') || currentStepData?.stepSix?.checks.includes('angry')}
                                    onCheckedChange={(checked: boolean) => handleMoodChange(checked, 'angry')}
                                    className="mr-4"
                                />
                            </div>
                            <div className="flex pb-4 flex-row-reverse justify-end">
                                <Label htmlFor="confused" className="text-xl">
                                    Jeg føler mig forvirret og usikker
                                </Label>
                                <Checkbox id="is_not_alone" checked={data.checks.includes('confused') || currentStepData?.stepSix?.checks.includes('confused')}
                                    onCheckedChange={(checked: boolean) => handleMoodChange(checked, 'confused')}
                                    className="mr-4"
                                />
                            </div>
                            <div className="flex pb-4 flex-row-reverse justify-end">
                                <Label htmlFor="empty" className="text-xl">
                                    Jeg føler mig tom og uden håb
                                </Label>
                                <Checkbox id="is_not_alone" checked={data.checks.includes('empty') || currentStepData?.stepSix?.checks.includes('empty')}
                                    onCheckedChange={(checked: boolean) => handleMoodChange(checked, 'empty')}
                                    className="mr-4"
                                />
                            </div>
                            <div className="flex pb-4 flex-row-reverse justify-end">
                                <Label htmlFor="missing_contact" className="text-xl">
                                    Savner nogle at tale med om situationen
                                </Label>
                                <Checkbox id="is_not_alone" checked={data.checks.includes('missing_contact') || currentStepData?.stepSix?.checks.includes('missing_contact')}
                                    onCheckedChange={(checked: boolean) => handleMoodChange(checked, 'missing_contact')}
                                    className="mr-4"
                                />
                            </div>
                            <div className="flex pb-4 flex-col mt-4">
                                <Label htmlFor="missing_contact" className="text-xl">
                                    Andet (skriv frit)
                                </Label>
                                <TextArea 
                                    id="other" 
                                    placeholder="Sæt flere ord på hvordan du har det "
                                    onChange={(e) => handleOtherChange(e)}
                                    className="mt-2"
                                    isDebuggable={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    {isCompleted ? (
                        <div className="text-green-500 text-md mt-4">
                            <p>Du har allerede gennemført dette trin.</p>
                            <Link href={route('onboarding.complete')} className="mt-4 inline-block text-blue-600 hover:text-blue-800">
                                Færdiggør
                            </Link>
                        </div>
                    ) : (
                        <div className="text-red-500 text-md mt-4">
                            <Button type="submit" onClick={handleSubmit} disabled={processing} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                                {processing ? "Indsender..." : "Fortsæt"}
                            </Button>
                            <Link 
                                href={route('onboarding.step', { step: "five" })} className="mt-4 ml-4 inline-block text-blue-600 hover:text-blue-800">
                                Gå tilbage
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
}
