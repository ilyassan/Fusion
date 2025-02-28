"use client";

import React from 'react';
import LeftPanel from '../components/LeftPanel';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import GoogleButton from '../components/GoogleButton';
import ErrorAlert from '../components/ErrorAlert';
import FormFooter from '../components/FormFooter';

// Define types for form data
interface FormData {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
}

// Define possible error fields as a union type
type ErrorField = 'email' | 'fullName' | 'password' | 'confirmPassword' | null;

// Define error state with message and field
interface FormError {
  message: string;
  field: ErrorField;
}

// Mock API function (replace with your actual API call)
const api = {
  signup: async (data: Omit<FormData, 'confirmPassword'>): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
    console.log('API signup:', data);
  },
};

const SignupPage: React.FC = () => {
  // Single state for all form fields
  const [formData, setFormData] = React.useState<FormData>({
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = React.useState<FormError | null>(null); // Error with field identifier
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Handle input changes
  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear error if it pertains to the field being edited
    if (error && error.field === field) {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check for errors in order of priority
    if (!formData.email) {
      setError({ message: 'Email is required', field: 'email' });
      return;
    }
    if (!formData.fullName) {
      setError({ message: 'Full name is required', field: 'fullName' });
      return;
    }
    if (!formData.password) {
      setError({ message: 'Password is required', field: 'password' });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError({ message: 'Passwords do not match', field: 'confirmPassword' });
      return;
    }

    setIsLoading(true);
    try {
      await api.signup({
        email: formData.email,
        fullName: formData.fullName,
        password: formData.password,
      });
      setFormData({ email: '', fullName: '', password: '', confirmPassword: '' }); // Reset form
      setError(null);
    } catch (err) {
      setError({ message: 'Signup failed. Please try again.', field: null }); // General error, no field
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    console.log('Google signup attempted');
    // Add Google signup logic here
  };

  return (
    <div className="min-h-screen flex">
      <LeftPanel
        title="Join Fusion Today"
        subtitle="Start managing your business operations efficiently"
      />

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-600">FUSION</h1>
            <p className="mt-2 text-gray-600">
              Get started with your free account today
            </p>
          </div>

          {error && <ErrorAlert error={error.message} />}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <InputField
                id="fullName"
                label="Full Name"
                type="text"
                value={formData.fullName}
                placeholder="Enter your full name"
                onChange={handleChange('fullName')}
                error={error?.field === 'fullName'} // Boolean based on field match
              />
              <InputField
                id="email"
                label="Email address"
                type="email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={handleChange('email')}
                error={error?.field === 'email'}
              />
              <InputField
                id="password"
                label="Password"
                type="password"
                value={formData.password}
                placeholder="Choose a password"
                onChange={handleChange('password')}
                error={error?.field === 'password'}
              />
              <InputField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                placeholder="Confirm your password"
                onChange={handleChange('confirmPassword')}
                error={error?.field === 'confirmPassword'}
              />
            </div>

            <div className="space-y-4">
              <PrimaryButton type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Account'}
              </PrimaryButton>
              <GoogleButton onClick={handleGoogleSignup} disabled={isLoading}>
                Sign up with Google
              </GoogleButton>
            </div>
          </form>

          <FormFooter
            text="Already have an account?"
            linkText="Sign in"
            linkHref="/login"
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;