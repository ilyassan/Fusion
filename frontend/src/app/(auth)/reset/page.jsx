"use client";

import React from 'react';
import { AlertCircle } from 'lucide-react';

const ResetPasswordPage = () => {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your password reset logic here
    console.log('Password reset requested for:', email);
    setSuccess(true);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-blue-600 items-center justify-center overflow-hidden">
        <div className="relative z-10 px-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Reset Your Password</h2>
          <p className="text-xl">We'll help you get back into your account</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 0%, transparent 50%)`
          }}></div>
        </div>
      </div>

      {/* Right Panel - Reset Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-600">FUSION</h1>
            <h2 className="mt-6 text-2xl font-medium text-gray-900">
              Forgot your password?
            </h2>
            <p className="mt-2 text-gray-600">
              Enter your email address and we'll send you instructions to reset your password
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

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
                    onClick={() => setSuccess(false)}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Try again
                  </button>
                </p>
                <p className="text-sm text-gray-600">
                  Or{' '}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    contact support
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Send Reset Instructions
              </button>

              <div className="text-center">
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  Back to login
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;