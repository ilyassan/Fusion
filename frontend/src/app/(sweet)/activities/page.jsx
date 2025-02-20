"use client";
import { useState, useEffect } from 'react';
import { Rocket, Plus, ChevronLeft, X, Building2, ChevronRight, Check, Users, Mail } from 'lucide-react';

const SelectActivityPage = () => {
  // State management
  const [activities, setActivities] = useState([
    { id: 1, name: 'Tech Solutions Inc', role: 'Administrator', category: 'Technology', members: 15 },
    { id: 2, name: 'Digital Marketing Agency', role: 'Manager', category: 'Consulting', members: 8 },
  ]);
  const [modalStep, setModalStep] = useState(0);
  const [businessName, setBusinessName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [invitedEmails, setInvitedEmails] = useState(['']);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Static categories data
  const categories = [
    'Retail',
    'Real Estate',
    'Consulting',
    'Technology',
    'Healthcare',
    'Education',
    'Hospitality',
    'Other'
  ];

  // Success alert timeout
  useEffect(() => {
    if (showSuccessAlert) {
      const timer = setTimeout(() => setShowSuccessAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessAlert]);

  // Activity creation handler
  const handleAddActivity = () => {
    const newActivity = {
      id: activities.length + 1,
      name: businessName,
      role: 'Administrator',
      category: selectedCategory,
      members: invitedEmails.filter(email => email.trim() !== '').length + 1
    };
    
    setActivities([...activities, newActivity]);
    resetForm();
    setShowSuccessAlert(true);
  };

  // Form reset function
  const resetForm = () => {
    setModalStep(0);
    setBusinessName('');
    setSelectedCategory('');
    setInvitedEmails(['']);
    setShowCreateModal(false);
  };

  // Email field management
  const handleAddEmailField = () => setInvitedEmails([...invitedEmails, '']);
  const handleEmailChange = (index, value) => {
    const newEmails = [...invitedEmails];
    newEmails[index] = value;
    setInvitedEmails(newEmails);
  };

  // Role color coding
  const getRoleColor = (role) => {
    switch (role) {
      case 'Administrator': return 'bg-blue-100 text-blue-800';
      case 'Manager': return 'bg-green-100 text-green-800';
      case 'Employee': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 animate-slide-in sm:top-6 sm:right-6">
          <Check className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">Business created successfully!</span>
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center">
            <div className="flex items-center gap-2">
              <Rocket className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-semibold text-blue-600">Fusion</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Activities</h1>
            <p className="text-gray-600 mt-1">Select an activity to manage or create a new one</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>New Activity</span>
          </button>
        </div>

        {/* Activities List */}
        <div className="space-y-3">
          {activities.map(activity => (
            <div
              key={activity.id}
              className="group bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 p-2.5 rounded-lg">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{activity.name}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5">
                      <span className={`text-xs px-2 py-1 rounded-full ${getRoleColor(activity.role)}`}>
                        {activity.role}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Users className="w-4 h-4" />{activity.members}
                      </span>
                      <span className="text-sm text-gray-500">{activity.category}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              </div>
            </div>
          ))}
        </div>

        {/* Create Activity Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-xl">
              {/* Modal Header */}
              <div className="border-b border-gray-100 p-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {modalStep === 0 && 'Create New Activity'}
                  {modalStep === 1 && 'Select Category'}
                  {modalStep === 2 && 'Invite Team'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="px-4 pt-6 pb-4 border-b border-gray-100">
                <div className="relative">
                  {/* Step Numbers */}
                  <div className="flex justify-around mb-3">
                    {[0, 1, 2].map((step) => (
                      <div
                        key={step}
                        className={`w-8 h-8 rounded-full flex items-center justify-center 
                        transition-all duration-300 ${
                          modalStep >= step 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {step + 1}
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="h-1.5 bg-gray-100 -translate-y-1/2 rounded-full">
                    <div
                      className="h-full bg-blue-600 transition-all duration-500 ease-out rounded-full"
                      style={{ 
                        width: `${(modalStep) * 33.33}%`,
                        marginLeft: `${modalStep > 0 ? '8px' : '0'}`
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="overflow-hidden">
                  <div 
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${modalStep * 100}%)` }}
                  >
                    {/* Step 1: Business Name */}
                    <div className="min-w-full px-1">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Business name
                          </label>
                          <input
                            type="text"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            className="w-full outline-none px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Enter your business name"
                          />
                        </div>
                        <button
                          onClick={() => setModalStep(1)}
                          disabled={!businessName.trim()}
                          className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:hover:bg-blue-600"
                        >
                          Continue
                        </button>
                      </div>
                    </div>

                    {/* Step 2: Category Selection */}
                    <div className="min-w-full px-1">
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-3">
                          {categories.map((category) => (
                            <button
                              key={category}
                              onClick={() => setSelectedCategory(category)}
                              className={`p-4 text-left rounded-lg border transition-all ${
                                selectedCategory === category
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-blue-200'
                              }`}
                            >
                              <span className="text-sm font-medium text-gray-900">
                                {category}
                              </span>
                            </button>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={() => setModalStep(0)}
                            className="flex-1 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Back
                          </button>
                          <button
                            onClick={() => setModalStep(2)}
                            disabled={!selectedCategory}
                            className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Step 3: Invite Members */}
                    <div className="min-w-full px-1">
                      <div className="space-y-6">
                        <div className="space-y-4">
                          {invitedEmails.map((email, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => handleEmailChange(index, e.target.value)}
                                className="w-full outline-none mt-0.5 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                                placeholder="team.member@email.com"
                              />
                            </div>
                          ))}
                          <button
                            onClick={handleAddEmailField}
                            className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            Add another member
                          </button>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={() => setModalStep(1)}
                            className="flex-1 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Back
                          </button>
                          <button
                            onClick={handleAddActivity}
                            className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                          >
                            <Check className="w-5 h-5" />
                            Create Activity
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectActivityPage;