/**
 * This file contains the authentication form component for the authentication dialog. It includes fields for email and password, and handles form submission and validation errors.
 * It also provides a link to switch to the registration form if the user doesn't have an account.
 *
 * @component
 * @returns {JSX.Element} The AuthForm component.
 */

import { type AuthenticationStep, type LoginFormDataProps} from "@/types";
import { useForm } from '@inertiajs/react';
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function AuthForm({
    handleAuthenticationSubmit,
    authenticationForm,
    setStep
}: {
    handleAuthenticationSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    authenticationForm: ReturnType<typeof useForm<LoginFormDataProps>>;
    setStep: React.Dispatch<React.SetStateAction<AuthenticationStep>>;
}) {
    const { t } = useTranslation();
    const loginUsernameRef = useRef<HTMLInputElement>(null);
    const loginPasswordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (loginUsernameRef.current) {
            loginUsernameRef.current.focus();
        }

        if (loginPasswordRef.current) {
            loginPasswordRef.current.focus();
        }
    }, []);

    return (
        <>
          <p className="text-sm text-gray-500 mb-4">{t('authModal.login_email')}</p>
          <form onSubmit={handleAuthenticationSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('authModal.login_email')}</label>
              <input
                type="email"
                id="email"
                ref={loginUsernameRef}
                value={authenticationForm.data.email}
                onChange={(e) => authenticationForm.setData('email', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {authenticationForm.errors.email && <p className="text-red-500 text-sm mt-1">{authenticationForm.errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">{t('authModal.login_password')}</label>
              <input
                type="password"
                id="password"
                ref={loginPasswordRef}
                value={authenticationForm.data.password}
                onChange={(e) => authenticationForm.setData('password', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {authenticationForm.errors.password && <p className="text-red-500 text-sm mt-1">{authenticationForm.errors.password}</p>}
            </div>
            <button
              type="submit"
              disabled={authenticationForm.processing}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 cursor-pointer"
            >
              {authenticationForm.processing ? t('authModal.login') + '...' : t('authModal.login')}
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-12">
            {t('authModal.dont_have_account')}{' '}
            <button onClick={() => setStep('register')} className="text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer">
              {t('authModal.register')}
            </button>
          </p>
        </>
    )
}