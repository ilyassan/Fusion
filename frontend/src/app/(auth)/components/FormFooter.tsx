import React from 'react';
import Link from 'next/link';

interface FormFooterProps {
  text: string;
  linkText: string;
  linkHref: string;
}

const FormFooter: React.FC<FormFooterProps> = ({ text, linkText, linkHref }) => {
  return (
    <p className="mt-4 text-center text-sm text-gray-600">
      {text}{' '}
      <Link href={linkHref} className="font-medium text-blue-600 hover:text-blue-500">
        {linkText}
      </Link>
    </p>
  );
};

export default FormFooter;