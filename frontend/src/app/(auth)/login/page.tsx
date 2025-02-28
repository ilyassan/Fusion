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
  password: string;
}

// Define possible error fields as a union type
type ErrorField = 'email' | 'password' | null;

// Define error state with message and field
interface FormError {
  message: string;
  field: ErrorField;
}

// Mock API function (replace with your actual API call)
const api = {
  login: async (data: FormData): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
    console.log('API login:', data);
  },
};

const LoginPage: React.FC = () => {
  // Single state for all form fields
  const [formData, setFormData] = React.useState<FormData>({
    email: '',
    password: '',
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
    if (!formData.password) {
      setError({ message: 'Password is required', field: 'password' });
      return;
    }

    setIsLoading(true);
    try {
      await api.login({
        email: formData.email,
        password: formData.password,
      });
      setFormData({ email: '', password: '' }); // Reset form on success
      setError(null);
    } catch (err) {
      setError({ message: 'Login failed. Please try again.', field: null }); // General error, no field
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login attempted');
    // Add Google login logic here
  };

  return (
    <div className="min-h-screen flex">
      <LeftPanel
        title="Welcome to Fusion"
        subtitle="Take control of your operations with our intuitive dashboard"
      />

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-600">FUSION</h1>
            <p className="mt-2 text-gray-600">
              Sign in to your account to continue
            </p>
          </div>

          {error && <ErrorAlert error={error.message} />}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <InputField
                id="email"
                label="Email address"
                type="email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={handleChange('email')}
                error={error?.field === 'email'} // Boolean based on field match
              />
              <InputField
                id="password"
                label="Password"
                type="password"
                value={formData.password}
                placeholder="Enter your password"
                onChange={handleChange('password')}
                error={error?.field === 'password'}
              />
            </div>

            <div className="space-y-4">
              <PrimaryButton type="submit" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </PrimaryButton>
              <GoogleButton onClick={handleGoogleLogin} disabled={isLoading}>
                Sign in with Google
              </GoogleButton>
            </div>
          </form>

          <FormFooter
            text="Don't have an account?"
            linkText="Sign up now"
            linkHref="/signup"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;