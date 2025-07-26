import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Check } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real application, you would handle the subscription logic here
      setSubscribed(true);
      setEmail("");

      // Reset after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  return (
    <section className="bg-qatar-burgundy py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-white/10 mb-6">
            <Mail className="h-6 w-6 text-white" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with Our Latest Offers
          </h2>

          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about exclusive
            deals, new destinations, and travel tips.
          </p>

          {subscribed ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center space-x-3 max-w-md mx-auto animate-fade-up animate-once">
              <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-white font-medium">
                Thank you for subscribing!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <Button
                type="submit"
                variant="gold"
                className="px-6 py-3 font-medium"
              >
                Subscribe
              </Button>
            </form>
          )}

          <p className="text-sm text-white/60 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
