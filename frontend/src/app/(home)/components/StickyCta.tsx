import { Button } from "@/components/ui/button";

export default function StickyCTA() {
  return (
    <div className="hidden md:block fixed bottom-6 right-6 z-50">
      <Button
        size="lg"
        className="rounded-full shadow-lg btn-primary"
        aria-label="Start your free trial from sticky button"
      >
        Try Fusion Free
      </Button>
    </div>
  );
}