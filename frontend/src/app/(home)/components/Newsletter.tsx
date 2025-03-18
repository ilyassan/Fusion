import { Button } from "@/components/ui/button";

export default function Newsletter() {
  return (
    <section className="py-16 sm:py-20 bg-blue-100">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Stay Ahead with Fusion
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
            Subscribe for expert tips, ERP updates, and strategies to optimize your business operations.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md border border-gray-300 w-full sm:max-w-xs"
              aria-label="Email address for newsletter"
            />
            <Button type="submit" className="w-full sm:w-auto btn-primary">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}