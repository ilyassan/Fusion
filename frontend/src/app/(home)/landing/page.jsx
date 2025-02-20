
import { 
  BarChart3, Users, LineChart, PieChart,
  Settings, GitBranch, MessageSquare, Shield,
  Check, Star, Zap
} from 'lucide-react';

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-navy-900 text-white hover:bg-navy-800',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    special: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300
      ${variants[variant]}
      ${sizes[size]}
      ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Navbar = () => {
  return (
    <nav className="bg-white fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Fusion</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button variant="special" size="sm">
              Start Free
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const PriceCard = ({ title, price, features, isPopular, className = '' }) => (
  <div className={`relative bg-white rounded-2xl shadow-xl p-8 transition-transform duration-300 hover:scale-105 ${className}`}>
    {isPopular && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      </div>
    )}
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">${price}</span>
        {price > 0 && <span className="text-gray-500">/month</span>}
      </div>
    </div>
    <ul className="space-y-4 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <Check className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-gray-600">{feature}</span>
        </li>
      ))}
    </ul>
    <Button 
      variant={isPopular ? "special" : "outline"} 
      className="w-full"
    >
      Get Started
    </Button>
  </div>
);

const features = [
  { icon: <BarChart3 className="w-8 h-8" />, title: "Advanced Analytics", description: "Get deep insights into your business performance with real-time analytics and customizable dashboards" },
  { icon: <Users className="w-8 h-8" />, title: "Team Collaboration", description: "Seamlessly work together with your team members through integrated communication tools" },
  { icon: <LineChart className="w-8 h-8" />, title: "Growth Tracking", description: "Monitor your business growth with comprehensive metrics and predictive analysis" },
  { icon: <PieChart className="w-8 h-8" />, title: "Financial Overview", description: "Keep track of your finances with detailed reports and forecasting capabilities" }
];

const LandingPage = () => {
  const pricingPlans = [
    {
      title: "Free",
      price: 0,
      features: [
        "Up to 5 team members",
        "Basic analytics",
        "2 projects",
        "Community support"
      ]
    },
    {
      title: "Pro",
      price: 49,
      isPopular: true,
      features: [
        "Unlimited team members",
        "Advanced analytics",
        "Unlimited projects",
        "Priority support",
        "Custom integrations",
        "Advanced security"
      ]
    },
    {
      title: "Enterprise",
      price: 99,
      features: [
        "Everything in Pro",
        "Custom deployment",
        "Dedicated support",
        "SLA guarantee",
        "Advanced permissions",
        "Custom training"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section with Image */}
      <section className="relative bg-gradient-to-r from-navy-900 to-blue-900 text-white pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid-8"></div>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 mb-6">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Trusted by 1000+ companies</span>
              </div>
              <h1 className="text-5xl font-bold mb-6 animate-fade-up">
                Transform Your Business Management
              </h1>
              <p className="text-xl mb-8 text-gray-300 animate-fade-up animate-delay-100">
                All-in-one platform for analytics, team collaboration, and business growth. Get started in minutes.
              </p>
              <Button variant="special" size="lg" className="animate-fade-up animate-delay-200">
                Start Free Trial
              </Button>
            </div>
            <div className="relative animate-fade-left">
              <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl overflow-hidden border border-white/20">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Dashboard Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Powerful Features for Modern Business</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Choose the perfect plan for your business needs. All plans include core features.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PriceCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-navy-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "99%", label: "Customer Satisfaction" },
              { number: "1M+", label: "Active Users" },
              { number: "150+", label: "Countries Served" },
              { number: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of businesses already using Fusion to streamline their operations and drive growth.</p>
          <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-4">Fusion</h3>
              <p className="text-sm">Modern business management platform for forward-thinking companies.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors"><MessageSquare className="w-5 h-5" /></a>
                <a href="#" className="hover:text-white transition-colors"><Users className="w-5 h-5" /></a>
                <a href="#" className="hover:text-white transition-colors"><LineChart className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>&copy; 2025 Fusion. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;