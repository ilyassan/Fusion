"use client";

import React from 'react';
import LeftPanel from '../components/LeftPanel'; // Reusing from Signup/Login
import InputField from '../components/InputField'; // Reusing from Signup/Login
import PrimaryButton from '../components/PrimaryButton'; // Reusing with disabled support
import ErrorAlert from '../components/ErrorAlert'; // Reusing from Signup/Login
import Link from 'next/link';

// Define types for form data
interface FormData {
  email: string;
}

// Define possible error fields (only one field here, but kept for consistency)
type ErrorField = 'email' | null;

// Define error state with message and field
interface FormError {
  message: string;
  field: ErrorField;
}

// Mock API function (replace with your actual API call)
const api = {
  resetPassword: async (data: FormData): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
    console.log('API reset password:', data);
  },
};

const ResetPasswordPage: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({ email: '' });
  const [error, setError] = React.useState<FormError | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ email: e.target.value });
    if (error && error.field === 'email') {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email) {
      setError({ message: 'Email is required', field: 'email' });
      return;
    }

    setIsLoading(true);
    try {
      await api.resetPassword({ email: formData.email });
      setFormData({ email: '' });
      setError(null);
      setSuccess(true);
    } catch (err) {
      setError({ message: 'Reset failed. Please try again.', field: null });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryAgain = () => {
    setSuccess(false);
    setError(null);
  };

  return (
    <div className="min-h-screen flex">
      <LeftPanel
        title="Reset Your Password"
        subtitle="We'll help you get back into your account"
      />

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-600">FUSION</h1>
            <p className="mt-2 text-gray-600">
              Enter your email address and we'll send you instructions to reset your password
            </p>
          </div>

          {error && <ErrorAlert error={error.message} />}

          {success ? (
            <div className="space-y-6">
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <h3 className="text-green-800 font-medium text-lg mb-2">Check your email</h3>
                <p className="text-green-700">
                  We've sent password reset instructions to your email address. The link will expire in 1 hour.
                </p>
              </div>
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600">
                  Didn't receive the email?{' '}
                  <button
                    onClick={handleTryAgain}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Try again
                  </button>
                </p>
                <p className="text-sm text-gray-600">
                  Or{' '}
                  <Link href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    contact support
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-5">
                <InputField
                  id="email"
                  label="Email address"
                  type="email"
                  value={formData.email}
                  placeholder="Enter your email"
                  onChange={handleChange}
                  error={error?.field === 'email'}
                />
              </div>

              <div className="space-y-4">
                <PrimaryButton type="submit" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Reset Instructions'}
                </PrimaryButton>
              </div>

              <div className="text-center">
                <Link href="/login" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;