import React from 'react';

interface GoogleButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled: boolean;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ onClick, children, disabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium transition-colors duration-200 ${
        disabled
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
      }`}
    >
      <img
        className="h-5 w-5 mr-2"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRkRFuG-FebXK8BQPEo80Ai_KGWyMPm6UT6w&s"
        alt="Google logo"
      />
      {children}
    </button>
  );
};

export default GoogleButton;