import PaymentHeader from './components/PaymentHeader';
import PaymentForm from './components/PaymentForm';
import OrderSummary from './components/OrderSummary';

const PaymentPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
        <PaymentHeader />
        <div className="grid md:grid-cols-5 gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8">
          <PaymentForm />
          <OrderSummary />
        </div>
    </div>
  );
};

export default PaymentPage;