import { useForm } from "@inertiajs/react";
import {useState} from "react";

import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function OnboardingStepTwoForm() {
    const [step, setStep] = useState(2);

    const { data, setData, post, processing, errors } = useForm<{
        step: number;
        checks: string[];
        otherDescription?: string;
    }>({
        step: step,
        checks: [],
        otherDescription: ''
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
                        <div className="flex pb-4 flex-row-reverse justify-end">
                            <Label htmlFor="situtation">Jeg har oplevet en dødsfødsel</Label>
                            <Checkbox id="situtation" checked={data.checks.includes('deathborn')}
                                onCheckedChange={(checked) => {
                                    setData('checks', checked ? [...data.checks, 'deathborn'] : data.checks.filter((check) => check !== 'deathborn'));
                                }}
                                className="mr-4"
                            />
                        </div>
                        <div className="flex pb-4 flex-row-reverse justify-end">
                            <Label htmlFor="abort">Jeg har oplevet en abort</Label>
                            <Checkbox id="abort" checked={data.checks.includes('abort')}
                                onCheckedChange={(checked) => {
                                    setData('checks', checked ? [...data.checks, 'abort'] : data.checks.filter((check) => check !== 'abort'));
                                }}
                                className="mr-4"
                            />
                        </div>
                        <div className="flex pb-4 flex-row-reverse justify-end">
                            <Label htmlFor="graviditet">Jeg har oplevet en almindelig graviditet</Label>
                            <Checkbox id="graviditet" checked={data.checks.includes('pregnancy')}
                                onCheckedChange={(checked) => {
                                    setData('checks', checked ? [...data.checks, 'pregnancy'] : data.checks.filter((check) => check !== 'pregnancy'));
                                }}
                                className="mr-4"
                            />
                        </div>
                        <div className="flex pb-4 flex-row-reverse justify-end">
                        <Label htmlFor="other">Jeg har oplevet en anden situation</Label>
                        <Checkbox id="other" checked={data.checks.includes('other')}
                            onCheckedChange={(checked) => {
                                setData('checks', checked ? [...data.checks, 'other'] : data.checks.filter((check) => check !== 'other'));
                            }}
                            className="mr-4"
                        />
                        </div>
                        <TextArea 
                            id="otherDescription" 
                            placeholder="Beskriv venligst"
                            onChange={(e) => setData('otherDescription', e.target.value)}
                            className="mt-2"
                            disabled={!data.checks.includes('other')}
                            isDebuggable={false}
                        />
                    </div>
                </div>

                <Button type="submit" onClick={handleSubmit} disabled={processing} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                    {processing ? "Indsender..." : "Fortsæt"}
                </Button>
            </div>
        </form>
    );
}
