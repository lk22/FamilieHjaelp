/**
 * This file defines the AuthRegisterDialog component, which is a dialog for user registration.
 * It uses the Dialog component to display a form for users to create an account.
 * The form includes fields for name, email, password, and password confirmation.
 * The component also handles form submission and displays validation errors if any.
 *
 * @component
 * @returns {JSX.Element} The AuthRegisterDialog component.
 */

// Dependency imports
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useForm } from '@inertiajs/react';

// Component imports
import Logo from '@/components/WebLayout/Logo';

export default function AuthRegisterDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, setData, post, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    post(route('register'), {
      onFinish: () => setIsSubmitting(false),
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div id="overlay"
          className="fixed inset-0 bg-blue-200 opacity-50 transition-opacity"
          onClick={onClose}
        >
        </div>
        <div className="bg-blue-50 rounded-lg p-8 z-20 w-full max-w-xl mx-auto">
          <Logo />
          <Dialog.Title className="text-xl font-bold mb-4">Create an Account</Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="password_confirmation"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
}