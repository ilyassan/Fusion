import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section id="faq" className="py-16 sm:py-20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12">
          Your Questions, Answered
        </h2>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm sm:text-base">
              What does Fusion offer as an ERP system?
            </AccordionTrigger>
            <AccordionContent className="text-sm sm:text-base">
              Fusion is a complete ERP solution, providing real-time dashboards and tools for CRM, inventory, sales, employee management, tasks, and financial reporting—everything you need to run your business efficiently in one platform.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-sm sm:text-base">
              How secure is my business data with Fusion?
            </AccordionTrigger>
            <AccordionContent className="text-sm sm:text-base">
              Your data is fully encrypted in transit and at rest, adhering to GDPR, CCPA, and top industry standards. You own your data, and we never share it without your consent—security is our priority.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-sm sm:text-base">
              Can I upgrade my plan later as my business grows?
            </AccordionTrigger>
            <AccordionContent className="text-sm sm:text-base">
              Absolutely! Scale seamlessly to higher plans without losing data or settings. Our team ensures a smooth transition so you can focus on growing your business.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-sm sm:text-base">
              Does Fusion integrate with my existing tools?
            </AccordionTrigger>
            <AccordionContent className="text-sm sm:text-base">
              Yes, Fusion connects effortlessly with tools like Salesforce, QuickBooks, Slack, and more. Pro and Enterprise plans unlock custom API access for tailored integrations.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-sm sm:text-base">
              What support can I expect from Fusion?
            </AccordionTrigger>
            <AccordionContent className="text-sm sm:text-base">
              Free plan offers 48-hour email support, Pro provides 24-hour priority support, and Enterprise includes 24/7 dedicated support with 1-hour critical response times. All plans get access to our extensive knowledge base.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}