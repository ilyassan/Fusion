'use client';
import { useState } from 'react';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    accountName: '',
    accountNumber: '',
    routingNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    address: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-2xl font-bold text-blue-600">Fusion</span>
          </div>
          <button className="flex items-center text-gray-600 hover:text-gray-900">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to plans
          </button>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Payment Form */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Secure Payment</h2>
                <p className="text-gray-600">Complete your Fusion Pro subscription</p>
              </div>

              <form className="space-y-6">
                {/* Payment Method Selection */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Payment Method</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 border-2 rounded-xl flex items-center justify-center space-x-3 transition-all ${
                        paymentMethod === 'card' 
                          ? 'border-blue-600 bg-blue-50/50 shadow-sm' 
                          : 'border-gray-200 hover:border-blue-400'
                      }`}
                    >
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span className="font-medium">Credit Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      className={`p-4 border-2 rounded-xl flex items-center justify-center space-x-3 transition-all ${
                        paymentMethod === 'bank' 
                          ? 'border-blue-600 bg-blue-50/50 shadow-sm' 
                          : 'border-gray-200 hover:border-blue-400'
                      }`}
                    >
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span className="font-medium">Bank Transfer</span>
                    </button>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="space-y-6">
                  {paymentMethod === 'card' ? (
                    <>
                      <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          placeholder="•••• •••• •••• ••••"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                          <input
                            type="text"
                            name="expiry"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">CVC</label>
                          <input
                            type="text"
                            name="cvc"
                            placeholder="•••"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Account Name</label>
                        <input
                          type="text"
                          name="accountName"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Account Number</label>
                        <input
                          type="text"
                          name="accountNumber"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Routing Number</label>
                        <input
                          type="text"
                          name="routingNumber"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-medium transition-all flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Confirm Payment - $99.00</span>
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Pro Plan Subscription</h3>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-medium">Pro Plan</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Billing Cycle</span>
                  <span className="font-medium">Monthly</span>
                </div>
                
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-lg">$99.00</span>
                  </div>
                  <p className="text-sm text-gray-500">Plus applicable taxes</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>30-day money back guarantee</span>
                </div>
                <div className="mt-4 flex items-center space-x-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure SSL encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;