import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const PaymentHeader = () => {
  return (
    <header className="mb-6 sm:mb-8 py-4">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="text-blue-500 text-xl sm:text-2xl font-bold">
            FUSION
          </Link>
        </div>
        <div>
          <Link 
            href="/#pricing" 
            scroll={true}
            className="flex items-center text-sm sm:text-base text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Back to Plans
          </Link>
        </div>
      </div>
    </header>
  );
};

export default PaymentHeader;