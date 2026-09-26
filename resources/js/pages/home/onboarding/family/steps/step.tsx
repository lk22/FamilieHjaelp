import { Head, Link, useForm, usePage } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type SharedData } from '@/types';

type Kid = {
    gender: 'male' | 'female' | 'other';
    name: string;
    ageYears: number;
    ageMonths: number;
};

interface SessionProps extends SharedData {
    currentStep: string;
    scenario: string;
    onboardingSession: {
        token: string | null;
        currentStep: string | null;
        stepsData: Record<string, unknown>;
        formData: Record<string, unknown>;
        completed: boolean;
    };
}

export default function FamilyOnboardingStep() {
    const { currentStep, onboardingSession } = usePage<SessionProps>().props;

    const one = (onboardingSession.stepsData?.one as Record<string, unknown> | undefined) ?? {};
    const two = (onboardingSession.stepsData?.two as Record<string, unknown> | undefined) ?? {};
    const three = (onboardingSession.stepsData?.three as Record<string, unknown> | undefined) ?? {};

    return (
        <main className="bg-[#004EA7] py-10 text-white">
            <Head title="Familie onboarding" />
            <div className="mx-auto w-full max-w-3xl px-6">
                <h1 className="text-3xl font-bold">Familie onboarding</h1>
                <p className="mt-2 text-lg">Trin {currentStep === 'complete' ? '4' : currentStep === 'three' ? '3' : currentStep === 'two' ? '2' : '1'} af 4</p>

                <div className="mt-8 rounded-lg bg-white p-6 text-black shadow">
                    {currentStep === 'one' ? <FamilyNameStep defaultFamilyName={String(one.familyName ?? '')} /> : null}
                    {currentStep === 'two' ? <ParentStep defaultData={two} /> : null}
                    {currentStep === 'three' ? <KidsStep defaultData={three} /> : null}
                    {currentStep === 'complete' ? (
                        <CompleteStep token={onboardingSession.token} familyName={String(one.familyName ?? '')} parentData={two} kidsData={three} />
                    ) : null}
                </div>
            </div>
        </main>
    );
}

function FamilyNameStep({ defaultFamilyName }: { defaultFamilyName: string }) {
    const { data, setData, post, processing, errors } = useForm<{ data: { familyName: string } }>({
        data: {
            familyName: defaultFamilyName,
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(route('onboarding.scenario.step.submit', { scenario: 'family', step: 'one', nextStep: 'two' }));
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold">Indtast familienavn</h2>
            <div className="space-y-2">
                <Label htmlFor="familyName">Familienavn</Label>
                <Input id="familyName" value={data.data.familyName} onChange={(event) => setData('data', { familyName: event.target.value })} />
                {errors['data.familyName'] ? <p className="text-sm text-red-600">{errors['data.familyName']}</p> : null}
            </div>

            <Button disabled={processing} type="submit">
                Næste
            </Button>
        </form>
    );
}

function ParentStep({ defaultData }: { defaultData: Record<string, unknown> }) {
    const { data, setData, post, processing, errors } = useForm<{
        data: {
            name: string;
            age: number;
            familyTitle: string;
            hasPartner: boolean;
            partnerName: string;
            partnerAge: number;
            partnerFamilyTitle: string;
            partnerNeedsUser: boolean;
            partnerUserName: string;
            partnerUserEmail: string;
        };
    }>({
        data: {
            name: String(defaultData.name ?? ''),
            age: Number(defaultData.age ?? 0),
            familyTitle: String(defaultData.familyTitle ?? ''),
            hasPartner: Boolean(defaultData.hasPartner ?? false),
            partnerName: String(defaultData.partnerName ?? ''),
            partnerAge: Number(defaultData.partnerAge ?? 0),
            partnerFamilyTitle: String(defaultData.partnerFamilyTitle ?? ''),
            partnerNeedsUser: Boolean(defaultData.partnerNeedsUser ?? false),
            partnerUserName: String(defaultData.partnerUserName ?? ''),
            partnerUserEmail: String(defaultData.partnerUserEmail ?? ''),
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(route('onboarding.scenario.step.submit', { scenario: 'family', step: 'two', nextStep: 'three' }));
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold">Hvem udfylder onboarding?</h2>

            <div className="grid gap-4 md:grid-cols-2">
                <Field label="Navn" name="name" error={errors['data.name']}>
                    <Input value={data.data.name} onChange={(event) => setData('data', { ...data.data, name: event.target.value })} />
                </Field>

                <Field label="Alder" name="age" error={errors['data.age']}>
                    <Input
                        type="number"
                        value={data.data.age}
                        onChange={(event) => setData('data', { ...data.data, age: Number(event.target.value) })}
                    />
                </Field>

                <Field label="Familietitel" name="familyTitle" error={errors['data.familyTitle']}>
                    <Input
                        value={data.data.familyTitle}
                        onChange={(event) => setData('data', { ...data.data, familyTitle: event.target.value })}
                        placeholder="Fx Mor, Far, Omsorgsfar"
                    />
                </Field>
            </div>

            <div className="space-y-2">
                <Label>Har du en partner?</Label>
                <div className="flex gap-4">
                    <Button
                        type="button"
                        variant={data.data.hasPartner ? 'default' : 'outline'}
                        onClick={() => setData('data', { ...data.data, hasPartner: true })}
                    >
                        Ja
                    </Button>
                    <Button
                        type="button"
                        variant={!data.data.hasPartner ? 'default' : 'outline'}
                        onClick={() =>
                            setData('data', {
                                ...data.data,
                                hasPartner: false,
                                partnerNeedsUser: false,
                                partnerName: '',
                                partnerAge: 0,
                                partnerFamilyTitle: '',
                                partnerUserName: '',
                                partnerUserEmail: '',
                            })
                        }
                    >
                        Nej
                    </Button>
                </div>
                {errors['data.hasPartner'] ? <p className="text-sm text-red-600">{errors['data.hasPartner']}</p> : null}
            </div>

            {data.data.hasPartner ? (
                <div className="space-y-4 rounded border p-4">
                    <h3 className="text-lg font-semibold">Partner information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Partner navn" name="partnerName" error={errors['data.partnerName']}>
                            <Input
                                value={data.data.partnerName}
                                onChange={(event) => setData('data', { ...data.data, partnerName: event.target.value })}
                            />
                        </Field>

                        <Field label="Partner alder" name="partnerAge" error={errors['data.partnerAge']}>
                            <Input
                                type="number"
                                value={data.data.partnerAge}
                                onChange={(event) => setData('data', { ...data.data, partnerAge: Number(event.target.value) })}
                            />
                        </Field>

                        <Field label="Partner familietitel" name="partnerFamilyTitle" error={errors['data.partnerFamilyTitle']}>
                            <Input
                                value={data.data.partnerFamilyTitle}
                                onChange={(event) => setData('data', { ...data.data, partnerFamilyTitle: event.target.value })}
                            />
                        </Field>
                    </div>

                    <div className="space-y-2">
                        <Label>Skal din partner have en bruger?</Label>
                        <div className="flex gap-4">
                            <Button
                                type="button"
                                variant={data.data.partnerNeedsUser ? 'default' : 'outline'}
                                onClick={() => setData('data', { ...data.data, partnerNeedsUser: true })}
                            >
                                Ja
                            </Button>
                            <Button
                                type="button"
                                variant={!data.data.partnerNeedsUser ? 'default' : 'outline'}
                                onClick={() => setData('data', { ...data.data, partnerNeedsUser: false, partnerUserName: '', partnerUserEmail: '' })}
                            >
                                Nej
                            </Button>
                        </div>
                    </div>

                    {data.data.partnerNeedsUser ? (
                        <div className="grid gap-4 md:grid-cols-2">
                            <Field label="Partner bruger navn" name="partnerUserName" error={errors['data.partnerUserName']}>
                                <Input
                                    value={data.data.partnerUserName}
                                    onChange={(event) => setData('data', { ...data.data, partnerUserName: event.target.value })}
                                />
                            </Field>

                            <Field label="Partner email" name="partnerUserEmail" error={errors['data.partnerUserEmail']}>
                                <Input
                                    type="email"
                                    value={data.data.partnerUserEmail}
                                    onChange={(event) => setData('data', { ...data.data, partnerUserEmail: event.target.value })}
                                />
                            </Field>
                        </div>
                    ) : null}
                </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
                <Button asChild type="button" variant="outline">
                    <Link href={route('onboarding.scenario.step', { scenario: 'family', step: 'one' })}>Tilbage</Link>
                </Button>
                <Button disabled={processing} type="submit">
                    Næste
                </Button>
            </div>
        </form>
    );
}

function KidsStep({ defaultData }: { defaultData: Record<string, unknown> }) {
    const defaultKids: Kid[] = Array.isArray(defaultData.kids)
        ? (defaultData.kids as Record<string, unknown>[]).map((kid) => ({
              gender: kid.gender === 'male' || kid.gender === 'other' ? kid.gender : 'female',
              name: String(kid.name ?? ''),
              ageYears: Number(kid.ageYears ?? 0),
              ageMonths: Number(kid.ageMonths ?? 0),
          }))
        : [
              {
                  gender: 'female',
                  name: '',
                  ageYears: 0,
                  ageMonths: 0,
              },
          ];

    const { data, setData, post, processing, errors } = useForm<{ data: { kids: Kid[] } }>({
        data: {
            kids: defaultKids,
        },
    });

    const updateKid = (index: number, kidData: Partial<Kid>) => {
        const updatedKids = [...data.data.kids];
        updatedKids[index] = { ...updatedKids[index], ...kidData };

        setData('data', {
            kids: updatedKids,
        });
    };

    const addKid = () => {
        setData('data', {
            kids: [
                ...data.data.kids,
                {
                    gender: 'female',
                    name: '',
                    ageYears: 0,
                    ageMonths: 0,
                },
            ],
        });
    };

    const removeKid = (index: number) => {
        if (data.data.kids.length === 1) {
            return;
        }

        setData('data', {
            kids: data.data.kids.filter((_, kidIndex) => kidIndex !== index),
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(route('onboarding.scenario.step.submit', { scenario: 'family', step: 'three', nextStep: 'complete' }));
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold">Tilføj børn</h2>
            <p className="text-sm text-gray-600">Du kan tilføje et eller flere børn.</p>

            {data.data.kids.map((kid, index) => (
                <div className="space-y-3 rounded border p-4" key={index}>
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Barn {index + 1}</h3>
                        <Button disabled={data.data.kids.length === 1} onClick={() => removeKid(index)} type="button" variant="outline">
                            Fjern
                        </Button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Køn" name={`kid-${index}-gender`} error={errors[`data.kids.${index}.gender`]}>
                            <select
                                className="h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                                value={kid.gender}
                                onChange={(event) => updateKid(index, { gender: event.target.value as Kid['gender'] })}
                            >
                                <option value="female">Pige</option>
                                <option value="male">Dreng</option>
                                <option value="other">Andet</option>
                            </select>
                        </Field>

                        <Field label="Navn" name={`kid-${index}-name`} error={errors[`data.kids.${index}.name`]}>
                            <Input value={kid.name} onChange={(event) => updateKid(index, { name: event.target.value })} />
                        </Field>

                        <Field label="Alder (år)" name={`kid-${index}-ageYears`} error={errors[`data.kids.${index}.ageYears`]}>
                            <Input
                                type="number"
                                value={kid.ageYears}
                                onChange={(event) => updateKid(index, { ageYears: Number(event.target.value) })}
                            />
                        </Field>

                        <Field label="Alder (måneder)" name={`kid-${index}-ageMonths`} error={errors[`data.kids.${index}.ageMonths`]}>
                            <Input
                                type="number"
                                value={kid.ageMonths}
                                onChange={(event) => updateKid(index, { ageMonths: Number(event.target.value) })}
                            />
                        </Field>
                    </div>
                </div>
            ))}

            {errors['data.kids'] ? <p className="text-sm text-red-600">{errors['data.kids']}</p> : null}

            <div className="flex flex-wrap gap-3">
                <Button onClick={addKid} type="button" variant="outline">
                    Tilføj barn
                </Button>

                <Button asChild type="button" variant="outline">
                    <Link href={route('onboarding.scenario.step', { scenario: 'family', step: 'two' })}>Tilbage</Link>
                </Button>

                <Button disabled={processing} type="submit">
                    Gennemse svar
                </Button>
            </div>
        </form>
    );
}

function CompleteStep({
    token,
    familyName,
    parentData,
    kidsData,
}: {
    token: string | null;
    familyName: string;
    parentData: Record<string, unknown>;
    kidsData: Record<string, unknown>;
}) {
    const kids = Array.isArray(kidsData.kids) ? (kidsData.kids as Kid[]) : [];
    const { data, setData, post, processing } = useForm<{ data: { session_token: string | null } }>({
        data: {
            session_token: token,
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('onboarding.completed'));
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold">Bekræft familien</h2>

            <div className="rounded border p-4">
                <p>
                    <strong>Familienavn:</strong> {familyName}
                </p>
                <p>
                    <strong>Onboarder:</strong> {String(parentData.name ?? '')} ({String(parentData.familyTitle ?? '')})
                </p>
                <p>
                    <strong>Partner:</strong> {parentData.hasPartner ? 'Ja' : 'Nej'}
                </p>
                {parentData.hasPartner ? (
                    <p>
                        <strong>Partner navn:</strong> {String(parentData.partnerName ?? '')}
                    </p>
                ) : null}
                <p>
                    <strong>Antal børn:</strong> {kids.length}
                </p>
            </div>

            <div className="space-y-2">
                {kids.map((kid, index) => (
                    <div className="rounded border p-3" key={index}>
                        <p>
                            <strong>{kid.name}</strong> ({kid.gender}) - {kid.ageYears} år og {kid.ageMonths} måneder
                        </p>
                    </div>
                ))}
            </div>

            <input
                name="data.session_token"
                type="hidden"
                value={data.data.session_token ?? ''}
                onChange={(event) => setData('data', { session_token: event.target.value })}
            />

            <div className="flex flex-wrap gap-3">
                <Button asChild type="button" variant="outline">
                    <Link href={route('onboarding.scenario.step', { scenario: 'family', step: 'three' })}>Tilbage</Link>
                </Button>
                <Button disabled={processing || !token} type="submit">
                    Fuldfør onboarding
                </Button>
            </div>
        </form>
    );
}

function Field({
    children,
    error,
    label,
    name,
}: {
    children: React.ReactNode;
    error?: string;
    label: string;
    name: string;
}) {
    return (
        <div className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            {children}
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>
    );
}
