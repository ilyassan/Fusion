import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  error: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) => {
  return (
    <div className="bg-red-50 p-4 rounded-lg flex items-center space-x-2">
      <AlertCircle className="h-4 w-4 text-red-600" />
      <p className="text-sm text-red-600">{error}</p>
    </div>
  );
};

export default ErrorAlert;