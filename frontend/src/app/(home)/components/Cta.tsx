import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-16 sm:py-20 bg-blue-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Take Control of Your Business Today
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
            Join thousands of companies using Fusion to unify their operations, boost efficiency, and drive growth with a single, powerful ERP solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button size="lg" className="w-full sm:w-auto px-6 sm:px-8 btn-primary">
              Start Your Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-6 sm:px-8"
            >
              Schedule a Demo
            </Button>
          </div>
          <p className="mt-4 text-xs sm:text-sm text-gray-500">
            No credit card required. 14-day free trial with full access to all ERP features.
          </p>
        </div>
      </div>
    </section>
  );
}