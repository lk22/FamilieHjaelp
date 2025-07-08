
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import {type PageProps} from "@inertiajs/core";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import { TextArea } from "@/components/ui/TextArea";

import {type OnboardingData } from "@/types/onboarding";

type OnboardingStepSixData = PageProps & {
    onboarding: OnboardingData;
}

export default function OnboardingStepSixForm() {
    const [step, setStep] = useState(6);
    const { onboarding } = usePage<OnboardingStepSixData>().props;

    const { data, post, setData, processing, errors } = useForm<{
        step: number;
        checks: string[];
        other: string;
    }>({
        step: step,
        checks: [], 
        other: ''
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
                                <Checkbox id="is_not_alone" checked={data.checks.includes('sad')}
                                    onCheckedChange={(checked: boolean) => {
                                        setData('checks', checked ? [...data.checks, 'sad'] : data.checks.filter((check) => check !== 'sad'));
                                    }}
                                    className="mr-4"
                                />
                            </div>
                            <div className="flex pb-4 flex-row-reverse justify-end">
                                <Label htmlFor="angry" className="text-xl">
                                    Jeg føler mig vred og frustreret
                                </Label>
                                <Checkbox id="is_not_alone" checked={data.checks.includes('angry')}
                                    onCheckedChange={(checked: boolean) => {
                                        setData('checks', checked ? [...data.checks, 'angry'] : data.checks.filter((check) => check !== 'angry'));
                                    }}
                                    className="mr-4"
                                />
                            </div>
                            <div className="flex pb-4 flex-row-reverse justify-end">
                                <Label htmlFor="confused" className="text-xl">
                                    Jeg føler mig forvirret og usikker
                                </Label>
                                <Checkbox id="is_not_alone" checked={data.checks.includes('confused')}
                                    onCheckedChange={(checked: boolean) => {
                                        setData('checks', checked ? [...data.checks, 'confused'] : data.checks.filter((check) => check !== 'confused'));
                                    }}
                                    className="mr-4"
                                />
                            </div>
                            <div className="flex pb-4 flex-row-reverse justify-end">
                                <Label htmlFor="empty" className="text-xl">
                                    Jeg føler mig tom og uden håb
                                </Label>
                                <Checkbox id="is_not_alone" checked={data.checks.includes('empty')}
                                    onCheckedChange={(checked: boolean) => {
                                        setData('checks', checked ? [...data.checks, 'empty'] : data.checks.filter((check) => check !== 'empty'));
                                    }}
                                    className="mr-4"
                                />
                            </div>
                            <div className="flex pb-4 flex-row-reverse justify-end">
                                <Label htmlFor="missing_contact" className="text-xl">
                                    Savner nogle at tale med om situationen
                                </Label>
                                <Checkbox id="is_not_alone" checked={data.checks.includes('missing_contact')}
                                    onCheckedChange={(checked: boolean) => {
                                        setData('checks', checked ? [...data.checks, 'missing_contact'] : data.checks.filter((check) => check !== 'missing_contact'));
                                    }}
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
                                    onChange={(e) => setData('other', e.target.value)}
                                    className="mt-2"
                                    isDebuggable={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Button type="submit" onClick={handleSubmit} disabled={processing} className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                    {processing ? "Indsender..." : "Fortsæt"}
                </Button>
            </div>
        </form>
    );
}
