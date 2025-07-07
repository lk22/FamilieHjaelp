import { useForm, usePage } from "@inertiajs/react";
import {useState} from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function OnboardingStepFourForm() {
    const [step, setStep] = useState(4);
    const { onboarding } = usePage().props;
    console.log({onboarding})

    const { data, setData, post, processing, errors } = useForm<{
        step: number;
        situation_date: string;
    }>({
        step: step,
        situation_date: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting step:", step, "with data:", data);
        localStorage.setItem('onboarding_step' + step, JSON.stringify(data));
        const formattedDate = new Date(data.situation_date).toISOString();

        // strip the tz offset from the date string
        const dateWithoutTimezone = formattedDate.replace(/T.*$/, '');
        if (isNaN(new Date(formattedDate).getTime())) {
            console.error("Invalid date format:", data.situation_date);
            return;
        }

        console.log("Parsed date:", formattedDate);
        post(route('onboarding.step.submit', { _query: { step: step } }), {
            data: {
                ...data,
                situation_date: dateWithoutTimezone
            },
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
                            <Label htmlFor="situation_date" className="flex items-center text-xl">Angiv dato</Label>
                            <input
                                type="datetime-local"
                                name="situation_date"
                                id="situation_date"
                                className="p-3 border mt-4"
                                onChange={(e) => setData('situation_date', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <Button type="submit" onClick={handleSubmit} disabled={processing} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                    {processing ? "Indsender..." : "Fortsæt"}
                </Button>
            </div>
        </form>
    );
}
