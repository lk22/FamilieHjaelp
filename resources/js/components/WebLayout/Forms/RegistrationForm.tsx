/**
 * This file contains the registration form component for the authentication dialog. it includes fields for name, email, password, and password confirmation
 * It also handles form submission and displays validation errors if any.
 *
 * @component
 * @returns {JSX.Element} The RegistrationForm component.
 */

import { AuthenticationStep, RegisterFormDataProps} from "@/types";
import { useForm } from '@inertiajs/react';
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function RegistrationForm({
    handleRegistrationSubmit,
    registrationForm,
    setStep,
}: {
    handleRegistrationSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    registrationForm: ReturnType<typeof useForm<RegisterFormDataProps>>;
    setStep: React.Dispatch<React.SetStateAction<AuthenticationStep>>;
}) {
    const { t } = useTranslation();
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmationRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.focus();
        }

        if (emailRef.current) {
            emailRef.current.focus();
        }

        if (passwordRef.current) {
            passwordRef.current.focus();
        }

        if (passwordConfirmationRef.current) {
            passwordConfirmationRef.current.focus();
        }

        if (passwordConfirmationRef.current?.value !== passwordRef.current?.value) {
            passwordConfirmationRef.current.setCustomValidity(t('authModal.password_confirmation_mismatch'));
        } else {
            passwordConfirmationRef.current?.setCustomValidity('');
        }
    }, [registrationForm.data.password, registrationForm.data.password_confirmation, t]);

    return (
        <>
        <p className="text-sm text-gray-500 mb-4">{t('authModal.register')}</p>
          <form onSubmit={handleRegistrationSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('authModal.register_name')}</label>
              <input
                type="text"
                id="name"
                ref={nameRef}
                value={registrationForm.data.name}
                onChange={(e) => registrationForm.setData('name', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {registrationForm.errors.name && <p className="text-red-500 text-sm mt-1">{registrationForm.errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('authModal.register_email')}</label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                value={registrationForm.data.email}
                onChange={(e) => registrationForm.setData('email', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {registrationForm.errors.email && <p className="text-red-500 text-sm mt-1">{registrationForm.errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">{t('authModal.register_password')}</label>
              <input
                type="password"
                id="password"
                ref={passwordRef}
                value={registrationForm.data.password}
                onChange={(e) => registrationForm.setData('password', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {registrationForm.errors.password && <p className="text-red-500 text-sm mt-1">{registrationForm.errors.password}</p>}
            </div>
            <div>
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">{t('authModal.register_password_confirmation')}</label>
              <input
                type="password"
                id="password_confirmation"
                ref={passwordConfirmationRef}
                value={registrationForm.data.password_confirmation}
                onChange={(e) => registrationForm.setData('password_confirmation', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {registrationForm.errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{registrationForm.errors.password_confirmation}</p>}
            </div>
            <button
              type="submit"
              disabled={registrationForm.processing}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 cursor-pointer"
            >
              {registrationForm.processing ? t('authModal.register') + '...' : t('authModal.register')}
            </button>
            <p>
              {t('authModal.already_have_account')}{' '}
              <button onClick={() => setStep('login')} className="text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer">
                {t('authModal.login')}
              </button>
            </p>
          </form>
        </>
    );
}