"use client";

import React from 'react';
import LeftPanel from '../components/LeftPanel'; // Reusing from other pages
import PrimaryButton from '../components/PrimaryButton'; // Reusing with disabled support
import ErrorAlert from '../components/ErrorAlert'; // Reusing from other pages

// Define types for form data
interface FormData {
  code: string[]; // Array of 6 digits
}

// Define possible error fields (for the entire code input)
type ErrorField = 'code' | null;

// Define error state with message and field
interface FormError {
  message: string;
  field: ErrorField;
}

// Mock API function (replace with your actual API call)
const api = {
  verify2FA: async (code: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
    console.log('API 2FA verification:', code);
  },
};

const TwoFactorAuthPage: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({ code: ['', '', '', '', '', ''] });
  const [error, setError] = React.useState<FormError | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const refs = Array(6).fill(0).map(() => React.useRef<HTMLInputElement>(null));

  const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 1) {
      const newCode = [...formData.code];
      newCode[index] = value;
      setFormData({ code: newCode });

      // Clear error if it pertains to the code
      if (error && error.field === 'code') {
        setError(null);
      }

      // Move to next input if value is entered
      if (value && index < 5) {
        refs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !formData.code[index] && index > 0) {
      refs[index - 1].current?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode = formData.code.join('');

    if (verificationCode.length !== 6 || !/^\d{6}$/.test(verificationCode)) {
      setError({ message: 'Please enter a valid 6-digit code', field: 'code' });
      return;
    }

    setIsLoading(true);
    try {
      await api.verify2FA(verificationCode);
      setFormData({ code: ['', '', '', '', '', ''] }); // Reset form on success
      setError(null);
      // Optionally redirect or show success message here
    } catch (err) {
      setError({ message: 'Verification failed. Please try again.', field: null });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <LeftPanel
        title="Two-Factor Authentication"
        subtitle="Keeping your account secure"
      />

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-600">FUSION</h1>
            <h2 className="mt-6 text-2xl font-medium text-gray-900">
              Verify your identity
            </h2>
            <p className="mt-2 text-gray-600">
              Enter the verification code sent to your email
            </p>
          </div>

          {error && <ErrorAlert error={error.message} />}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="flex justify-center space-x-4">
              {formData.code.map((digit, index) => (
                <input
                  key={index}
                  ref={refs[index]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={handleChange(index)}
                  onKeyDown={handleKeyDown(index)}
                  className={`w-12 h-12 outline-none text-center text-2xl border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    error?.field === 'code' ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-invalid={error?.field === 'code' ? 'true' : 'false'}
                />
              ))}
            </div>

            <div className="space-y-4">
              <PrimaryButton type="submit" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify'}
              </PrimaryButton>
            </div>
          </form>

          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{' '}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Resend code
              </a>
            </p>
            <p className="text-sm text-gray-600">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Try another method
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuthPage;