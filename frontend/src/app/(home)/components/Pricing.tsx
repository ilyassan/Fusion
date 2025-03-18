import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 sm:py-20 bg-gray-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Plans to Power Your Business
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-600">
            Choose a plan tailored to your needs and unlock the full potential of Fusion’s ERP capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          <Card className="animate-fade-in overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Free</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Ideal for small businesses starting with ERP basics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">$0</div>
              <Button variant="outline" className="w-full mb-4 sm:mb-6">
                Sign Up Now
              </Button>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm sm:text-base">Basic ERP dashboard</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm sm:text-base">100 contacts & 50 inventory items</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm sm:text-base">Email support (48-hour response)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm sm:text-base">1 user</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 overflow-hidden border-blue-500 shadow-lg relative animate-fade-in">
            <div className="absolute border-t border-r border-blue-500 top-0 right-0 bg-blue-500 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-bl-lg">
              POPULAR
            </div>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Pro</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Perfect for growing businesses needing advanced ERP tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">$49</div>
              <Button className="w-full mb-4 sm:mb-6 btn-primary">Get Started</Button>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm sm:text-base">All Free features</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm sm:text-base">2,500 contacts & 1,000 inventory items</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm sm:text-base">Priority support (24-hour response)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm sm:text-base">Custom reports & task management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm sm:text-base">5 users</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="animate-fade-in overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Enterprise</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Built for large organizations with complex ERP needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">$199</div>
              <Button variant="outline" className="w-full mb-4 sm:mb-6">
                Get Started
              </Button>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm sm:text-base">All Pro features</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm sm:text-base">Unlimited contacts & inventory</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm sm:text-base">24/7 dedicated support (1-hour critical response)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm sm:text-base">Advanced API & integrations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm sm:text-base">Unlimited users</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}