import { Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import Field from './Field';

import { type Kid, type KidsStepProps } from '@/types/onboarding';

interface KidsStepState extends KidsStepProps {
    translate: (key: string) => string;
    locale: string;
}

export default function KidsStep({ defaultData, translate, locale }: KidsStepState) {
    const [childUserLoginMessage, setChildUserLoginMessage] = useState<string | null>(null);
    const [childConfirmPasswordCheckMessage, setChildConfirmPasswordCheckMessage] = useState<string | null>(null);

    const translatedHeading = translate('app.getting_started.kids_step.heading');
    const translatedSubheading = translate('app.getting_started.kids_step.subheading');
    const translatedAddChildButtonLabel = translate('app.getting_started.kids_step.add_child_button_label');
    const translatedChildFirstNameLabel = translate('app.getting_started.kids_step.child_firstname_label');
    const translatedChildMiddleNameLabel = translate('app.getting_started.kids_step.child_middlename_label');
    const translatedChildLastNameLabel = translate('app.getting_started.kids_step.child_lastname_label');
    const translatedChildAgeLabelYears = translate('app.getting_started.kids_step.child_age_label_years');
    const translatedChildAgeLabelMonths = translate('app.getting_started.kids_step.child_age_label_months');
    const translatedChildAgeLabelWeeks = translate('app.getting_started.kids_step.child_age_label_weeks');
    const translatedChildGenderLabel = translate('app.getting_started.kids_step.child_gender_label');
    const translatedChildGenderOther = translate('app.getting_started.kids_step.child_gender_other');
    const translatedNextStepLabel = translate('app.getting_started.kids_step.next_step_label');
    const translatedPreviousStepLabel = translate('app.getting_started.kids_step.previous_step_label');
    const translatedRemoveChildButtonLabel = translate('app.getting_started.kids_step.remove_child_button_label');
    const translatedChildNeedsUserLoginLabel = translate('app.getting_started.kids_step.child_needs_user_login_label');
    const translatedChildUserEmailLabel = translate('app.getting_started.kids_step.child_user_email_label');
    const enterChildUserEmailMessage = translate('app.getting_started.kids_step.enter_child_user_email_message');
    const childReceiveLoginMailMessage = translate('app.getting_started.kids_step.child_receive_login_mail_message');

    const normalizedKids = defaultData.kids.map((kid) => ({
        gender: kid.gender,
        firstName: kid.firstName ?? '',
        middleName: kid.middleName ?? '',
        lastName: kid.lastName ?? '',
        ageYears: String(kid.ageYears ?? ''),
        ageMonths: String(kid.ageMonths ?? ''),
        ageWeeks: String(kid.ageWeeks ?? ''),
        needsUserLogin: kid.needsUserLogin ?? false,
        userEmail: kid.userEmail ?? '',
    }));

    const defaultKids: Kid[] =
        normalizedKids.length > 0
            ? normalizedKids
            : [
                  {
                      gender: 'female',
                      firstName: '',
                      middleName: '',
                      lastName: '',
                      ageYears: '',
                      ageMonths: '',
                      ageWeeks: '',
                      needsUserLogin: false,
                      userEmail: '',
                  },
              ];

    const { data, setData, post, processing, errors } = useForm<{ data: { kids: Kid[] } }>({
        data: {
            kids: defaultKids,
        },
    });
    const [kidKeys, setKidKeys] = useState<string[]>(() => defaultKids.map(() => crypto.randomUUID()));
    const [openKidKeys, setOpenKidKeys] = useState<Set<string>>(() => new Set([kidKeys[0]]));

    const updateKid = (index: number, kidData: Partial<Kid>) => {
        const updatedKids = [...data.data.kids];
        updatedKids[index] = { ...updatedKids[index], ...kidData };

        setData('data', {
            kids: updatedKids,
        });
    };

    const addKid = () => {
        const newKidKey = crypto.randomUUID();

        setKidKeys((previousKeys) => [...previousKeys, newKidKey]);
        setOpenKidKeys((previousKeys) => new Set(previousKeys).add(newKidKey));
        setData('data', {
            kids: [
                ...data.data.kids,
                {
                    gender: 'female',
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    ageYears: '',
                    ageMonths: '',
                    ageWeeks: '',
                    needsUserLogin: false,
                    userEmail: '',
                },
            ],
        });
    };

    const removeKid = (index: number) => {
        if (data.data.kids.length === 1) {
            return;
        }

        const removedKidKey = kidKeys[index];

        setKidKeys((previousKeys) => previousKeys.filter((_, keyIndex) => keyIndex !== index));
        setOpenKidKeys((previousKeys) => {
            const nextKeys = new Set(previousKeys);
            nextKeys.delete(removedKidKey);

            return nextKeys;
        });
        setData('data', {
            kids: data.data.kids.filter((_, kidIndex) => kidIndex !== index),
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(route('onboarding.scenario.step.submit', { scenario: 'family', step: 'three', nextStep: 'complete' }));
    };

    const handleChildUserConfirmedPasswordChech = (kid: Kid) => {
        return kid.userPassword === kid.confirmPassword;
    };

    const handleCHildUserPasswordCheck = (kid: Kid) => {
        if (
            kid.userPassword.length < 1 ||
            kid.userPassword.match(/[0-9]/) === null ||
            kid.userPassword.match(/[A-Z]/) === null ||
            kid.userPassword.match(/[a-z]/) === null ||
            kid.userPassword.match(/[^a-zA-Z0-9]/) === null // check for special characters
        ) {
            return false;
        }

        return true;
    };

    const translatedChildCountLabel = locale === 'da' ? `Antal børn: ${data.data.kids.length}` : `Number of children: ${data.data.kids.length}`;

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold">{translatedHeading}</h2>
            <p className="text-lg">{translatedSubheading}</p>
            <p className="text-sm font-bold">{translatedChildCountLabel}</p>
            <p className="text-sm font-bold">{translatedAddChildButtonLabel}</p>

            {data.data.kids.map((kid, index) => {
                const handleChildUserLoginCheck = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
                    const kid = data.data.kids[index];
                };

                let childAdded = kid.firstName || kid.middleName || kid.lastName ? true : false;

                const ageYearsLabel = locale === 'da' ? `${kid.ageYears ?? ''} år` : `${kid.ageYears ?? ''} Years`;
                const ageMonthsLabel = locale === 'da' ? `${kid.ageMonths ?? ''} mdr.` : `${kid.ageMonths ?? ''} Months`;
                const ageWeeksLabel = locale === 'da' ? `${kid.ageWeeks ?? ''} uger` : `${kid.ageWeeks ?? ''} Weeks`;
                const translatedChildGenderFemale = locale === 'da' ? 'Pige' : 'Female';
                const translatedChildGenderMale = locale === 'da' ? 'Dreng' : 'Male';
                const translatedChildGender =
                    kid.gender === 'female' ? translatedChildGenderFemale : kid.gender === 'male' ? translatedChildGenderMale : '';

                let translatedChildItemLabelWithName;
                let translatedChildItemLabelWithAge;

                if (kid.firstName || kid.middleName || kid.lastName) {
                    translatedChildItemLabelWithName = `${kid.firstName ?? ''} ${kid.middleName ?? ''} ${kid.lastName ?? ''}`.trim();
                }

                if (kid.ageYears) {
                    translatedChildItemLabelWithAge = `${ageYearsLabel}`;
                }

                if (kid.ageMonths) {
                    translatedChildItemLabelWithAge = `${translatedChildItemLabelWithAge ?? ''} ${ageMonthsLabel}`;
                }

                if (kid.ageWeeks) {
                    translatedChildItemLabelWithAge = `${translatedChildItemLabelWithAge ?? ''} ${ageWeeksLabel}`;
                }

                const fullTranslatedChildItemLabel = `${translatedChildGender ?? ''} - ${translatedChildItemLabelWithName ?? ''} - ${translatedChildItemLabelWithAge ?? ''}`;

                const childAddedClass = childAdded ? 'bg-blue-900' : '';

                return (
                    <>
                        <details
                            className="group rounded border border-blue-900"
                            key={kidKeys[index]}
                            open={openKidKeys.has(kidKeys[index])}
                            onToggle={(event) => {
                                const key = kidKeys[index];
                                const isOpen = event.currentTarget.open;

                                setOpenKidKeys((previousKeys) => {
                                    const nextKeys = new Set(previousKeys);

                                    if (isOpen) {
                                        nextKeys.add(key);
                                    } else {
                                        nextKeys.delete(key);
                                    }

                                    return nextKeys;
                                });
                            }}
                        >
                            <summary className={`flex cursor-pointer list-none items-center justify-between p-4 font-semibold [&::-webkit-details-marker]:hidden ${childAddedClass}`}>
                                <span className={`text-md ${childAdded ? 'font-bold text-white' : ''}`}>{fullTranslatedChildItemLabel}</span>
                                <span aria-hidden="true" className="text-xl leading-none transition-transform group-open:rotate-180">
                                    ↓
                                </span>
                            </summary>
                            <div className="space-y-3 border-t p-4">
                                <div className="grid gap-4 md:grid-cols-1">
                                    <Field
                                        label={translatedChildGenderLabel}
                                        inputId={`kid-${index}-gender`}
                                        error={errors[`data.kids.${index}.gender`]}
                                    >
                                        <select
                                            id={`kid-${index}-gender`}
                                            className="h-6 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-black"
                                            value={kid.gender}
                                            onChange={(event) => updateKid(index, { gender: event.target.value as Kid['gender'] })}
                                        >
                                            <option value="female">{translatedChildGenderFemale}</option>
                                            <option value="male">{translatedChildGenderMale}</option>
                                            <option value="other">{translatedChildGenderOther}</option>
                                        </select>
                                    </Field>
                                    <div className="grid grid-cols-3 gap-4">
                                        <Field label={translatedChildFirstNameLabel} inputId={`kid-${index}-firstName`} error={errors[`data.kids.${index}.firstName`]}>
                                            <Input
                                                type="text"
                                                id={`kid-${index}-name`}
                                                value={kid.firstName}
                                                onChange={(event) => updateKid(index, { firstName: event.target.value })}
                                            />
                                        </Field>
                                        <Field label={translatedChildMiddleNameLabel} inputId={`kid-${index}-middleName`} error={errors[`data.kids.${index}.middleName`]}>
                                            <Input
                                                type="text"
                                                id={`kid-${index}-middleName`}
                                                value={kid.middleName}
                                                onChange={(event) => updateKid(index, { middleName: event.target.value })}
                                            />
                                        </Field>
                                        <Field label={translatedChildLastNameLabel} inputId={`kid-${index}-lastName`} error={errors[`data.kids.${index}.lastName`]}>
                                            <Input
                                                type="text"
                                                id={`kid-${index}-lastName`}
                                                value={kid.lastName}
                                                onChange={(event) => updateKid(index, { lastName: event.target.value })}
                                            />
                                        </Field>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <Field
                                            label={translatedChildAgeLabelYears}
                                            inputId={`kid-${index}-ageYears`}
                                            error={errors[`data.kids.${index}.ageYears`]}
                                        >
                                            <Input
                                                id={`kid-${index}-ageYears`}
                                                type="number"
                                                value={kid.ageYears}
                                                onChange={(event) => updateKid(index, { ageYears: event.target.value })}
                                            />
                                        </Field>
                                        <Field
                                            label={translatedChildAgeLabelMonths}
                                            inputId={`kid-${index}-ageMonths`}
                                            error={errors[`data.kids.${index}.ageMonths`]}
                                        >
                                            <Input
                                                id={`kid-${index}-ageMonths`}
                                                type="number"
                                                value={kid.ageMonths}
                                                onChange={(event) => updateKid(index, { ageMonths: event.target.value })}
                                            />
                                        </Field>
                                        <Field
                                            label={translatedChildAgeLabelWeeks}
                                            inputId={`kid-${index}-ageWeeks`}
                                            error={errors[`data.kids.${index}.ageWeeks`]}
                                        >
                                            <Input
                                                id={`kid-${index}-ageWeeks`}
                                                type="number"
                                                value={kid.ageWeeks}
                                                onChange={(event) => updateKid(index, { ageWeeks: event.target.value })}
                                            />
                                        </Field>
                                    </div>
                                    {kid.ageYears && parseInt(kid.ageYears) >= 15 && (
                                        // show a needs user login field if the age of the child is 15 or older
                                        <>
                                            <Field
                                                label={translatedChildNeedsUserLoginLabel}
                                                inputId={`kid-${index}-needsUserLogin`}
                                                error={errors[`data.kids.${index}.needsUserLogin`]}
                                            >
                                                <input
                                                    id={`kid-${index}-needsUserLogin`}
                                                    type="checkbox"
                                                    checked={kid.needsUserLogin}
                                                    onChange={(event) => {
                                                        const checked = event.target.checked;
                                                        if (!checked) {
                                                            updateKid(index, { userLogin: '', userPassword: '', confirmPassword: '' });
                                                        }
                                                        updateKid(index, { needsUserLogin: checked });
                                                    }}
                                                />
                                            </Field>
                                        </>
                                    )}
                                    {kid.needsUserLogin && (
                                        <>
                                            <Field label={translatedChildUserEmailLabel} inputId={`kid-${index}-userEmail`} error={errors[`data.kids.${index}.userEmail`]}>
                                                <Input
                                                    id={`kid-${index}-userEmail`}
                                                    type="email"
                                                    value={kid.userEmail || ''}
                                                    onChange={(event) => updateKid(index, { userEmail: event.target.value })}
                                                    className="my-0 h-[10px] text-blue-900"
                                                />
                                                <span>{enterChildUserEmailMessage}</span>
                                                <p>{kid.name} {childReceiveLoginMailMessage}</p>
                                            </Field>
                                            {/* <Field label={translatedChildUserLoginLabel} inputId={`kid-${index}-userLogin`} error={errors[`data.kids.${index}.userLogin`]}>
                                                <input
                                                    id={`kid-${index}-userLogin`}
                                                    type="text"
                                                    value={kid.userLogin || ''}
                                                    onChange={(event) => updateKid(index, { userLogin: event.target.value })}
                                                />
                                            </Field>
                                            <Field label={translatedChildUserPasswordLabel} inputId={`kid-${index}-userPassword`} error={errors[`data.kids.${index}.userPassword`]}>
                                                <input
                                                    id={`kid-${index}-userPassword`}
                                                    className="w-full rounded px-4"
                                                    type="password"
                                                    value={kid.userPassword || ''}
                                                    onChange={(event) => updateKid(index, { userPassword: event.target.value })}
                                                    onBlur={() => {
                                                        if (!handleCHildUserPasswordCheck(kid)) {
                                                            setChildUserLoginMessage(translatedChildConfirmPasswordRules);
                                                        } else {
                                                            setChildUserLoginMessage(null);
                                                        }
                                                    }}
                                                />
                                                {childUserLoginMessage && <small className="text-red-500 font-bold">{childUserLoginMessage}</small>}
                                            </Field>
                                            <Field label={translatedChildConfirmPasswordLabel} inputId={`kid-${index}-confirmPassword`} error={errors[`data.kids.${index}.confirmPassword`]}>
                                                <input
                                                    id={`kid-${index}-confirmPassword`}
                                                    className="w-full rounded px-4 "
                                                    type="password"
                                                    value={kid.confirmPassword || ''}
                                                    onChange={(event) => updateKid(index, { confirmPassword: event.target.value })}
                                                    onBlur={() => {
                                                        if (!handleChildUserConfirmedPasswordChech(kid)) {
                                                            setChildConfirmPasswordCheckMessage(translatedChildConfirmPasswordCheckRules);
                                                        } else {
                                                            setChildConfirmPasswordCheckMessage(null);
                                                        }
                                                    }}
                                                />
                                                {childConfirmPasswordCheckMessage && <small className="text-red-500 font-bold">{childConfirmPasswordCheckMessage}</small>}
                                            </Field> */}
                                        </>
                                    )}
                                </div>

                                <Button
                                    aria-label={`Fjern barn ${index + 1}`}
                                    disabled={data.data.kids.length === 1}
                                    onClick={() => removeKid(index)}
                                    type="button"
                                    variant="outline"
                                >
                                    {translatedRemoveChildButtonLabel}
                                </Button>
                            </div>
                        </details>
                    </>
                );
            })}

            {errors['data.kids'] ? <p className="text-sm text-red-600">{errors['data.kids']}</p> : null}

            <div className="flex flex-wrap gap-3">
                <Button onClick={addKid} type="button" variant="outline" className="bg-blue-900 text-white hover:bg-blue-800 hover:text-white">
                    {translatedAddChildButtonLabel}
                </Button>

                <Button asChild type="button" variant="outline" className="bg-blue-900 text-white hover:bg-blue-800 hover:text-white">
                    <Link href={route('onboarding.scenario.step', { scenario: 'family', step: 'two' })}>{translatedPreviousStepLabel}</Link>
                </Button>

                <Button disabled={processing} type="submit" className="bg-blue-900 text-white hover:bg-blue-800 hover:text-white">
                    {translatedNextStepLabel}
                </Button>
            </div>
        </form>
    );
}
