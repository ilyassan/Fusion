import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Real Businesses, Real Results
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-600">
            See how Fusion’s ERP transforms operations for companies like yours.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">"Total Game-Changer"</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                John Doe, Operations Manager at Acme Corp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm sm:text-base">
                "Fusion streamlined our sales, inventory, and team workflows—productivity is up 30% in just months!"
              </p>
            </CardContent>
          </Card>
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">"Support That Delivers"</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Jane Smith, CEO at InnovateTech
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm sm:text-base">
                "From CRM to inventory, Fusion simplified everything. The support team made onboarding a breeze."
              </p>
            </CardContent>
          </Card>
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">"Best ERP Investment"</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Alex Brown, Founder at GrowEasy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm sm:text-base">
                "Fusion’s all-in-one platform cut our operational costs by 20%. It’s worth every penny!"
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}