import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { CheckCircle, Lock } from "lucide-react";

const OrderSummary = () => {
  return (
    <Card className="md:col-span-2 md:h-fit">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <CardTitle className="text-lg sm:text-xl">Pro Plan Subscription</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-sm sm:text-base text-gray-600">Plan</span>
          <span className="text-sm sm:text-base font-medium">Pro Plan</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm sm:text-base text-gray-600">Billing Cycle</span>
          <span className="text-sm sm:text-base font-medium">Monthly</span>
        </div>
        <div className="pt-4 sm:pt-6 border-t border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-base sm:text-lg">Total</span>
            <span className="font-bold text-base sm:text-lg">$99.00</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500">Plus applicable taxes</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pt-4 sm:pt-6 border-t border-gray-100">
        <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
          <span>30-day money-back guarantee</span>
        </div>
        <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-600">
          <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
          <span>Secure payment with SSL encryption</span>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 sm:h-8" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;