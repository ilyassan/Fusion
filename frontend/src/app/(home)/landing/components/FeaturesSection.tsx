// app/landing/components/FeaturesSection.js
export default function FeaturesSection() {
    const features = [
      { title: 'Powerful Dashboards', description: 'Get real-time insights into your business.' },
      { title: 'Customer Management', description: 'Streamline your customer relationships.' },
      { title: 'Sales Tracking', description: 'Track your sales and boost revenue with ease.' },
      { title: 'Expense Management', description: 'Monitor and control expenses efficiently.' },
    ];
  
    return (
      <section className="py-16 bg-gray-100">
        <h2 className="text-center text-3xl font-bold mb-8">Features You'll Love</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="text-center bg-white shadow-md p-6 rounded-lg">
              <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  