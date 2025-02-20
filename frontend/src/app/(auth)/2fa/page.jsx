"use client";

import React from 'react';
import { AlertCircle } from 'lucide-react';

const TwoFactorAuthPage = () => {
  const [code, setCode] = React.useState(['', '', '', '', '', '']);
  const [error, setError] = React.useState('');
  const refs = Array(6).fill(0).map(() => React.useRef(null));

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Move to next input if value is entered
      if (value && index < 5) {
        refs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      refs[index - 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join('');
    console.log('Verification attempted with code:', verificationCode);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-blue-600 items-center justify-center overflow-hidden">
        <div className="relative z-10 px-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Two-Factor Authentication</h2>
          <p className="text-xl">Keeping your account secure</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 0%, transparent 50%)`
          }}></div>
        </div>
      </div>

      {/* Right Panel - 2FA Form */}
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

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="flex justify-center space-x-4">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={refs[index]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Verify
            </button>
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