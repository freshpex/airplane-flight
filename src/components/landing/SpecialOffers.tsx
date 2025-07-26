import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Tag } from "lucide-react";

interface Offer {
  id: string;
  title: string;
  destination: string;
  image: string;
  price: number;
  discountPercentage: number;
  validUntil: string;
}

const offers: Offer[] = [
  {
    id: "1",
    title: "Summer Escape",
    destination: "Bali, Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 799,
    discountPercentage: 25,
    validUntil: "July 31, 2025",
  },
  {
    id: "2",
    title: "City Break",
    destination: "London, UK",
    image:
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 599,
    discountPercentage: 20,
    validUntil: "August 15, 2025",
  },
  {
    id: "3",
    title: "Winter Wonderland",
    destination: "Zurich, Switzerland",
    image:
      "https://images.unsplash.com/photo-1576500712891-1a8caf2b3f89?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 899,
    discountPercentage: 15,
    validUntil: "September 30, 2025",
  },
];

export function SpecialOffers() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
          }
        });
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".offer-card");
      cards.forEach((card) => observer.observe(card));
    }

    return () => {
      if (containerRef.current) {
        const cards = containerRef.current.querySelectorAll(".offer-card");
        cards.forEach((card) => observer.unobserve(card));
      }
    };
  }, []);

  const calculateOldPrice = (price: number, discountPercentage: number) => {
    return Math.round(price / (1 - discountPercentage / 100));
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-qatar-gold/10 text-qatar-burgundy text-sm font-medium mb-4">
            <Tag className="h-4 w-4 mr-2" />
            Limited Time Offers
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Special Deals & Promotions
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Take advantage of our exclusive deals and save on your next
            adventure
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {offers.map((offer, index) => (
            <div
              key={offer.id}
              className="offer-card opacity-0 bg-white rounded-xl overflow-hidden shadow-lg border border-neutral-200 transition-transform duration-300 hover:shadow-xl hover:scale-105"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-qatar-burgundy text-white font-bold px-3 py-1.5 rounded-md">
                  -{offer.discountPercentage}%
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{offer.title}</h3>
                <div className="flex items-center text-neutral-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{offer.destination}</span>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-qatar-burgundy">
                        ${offer.price}
                      </span>
                      <span className="ml-2 text-sm text-neutral-500 line-through">
                        $
                        {calculateOldPrice(
                          offer.price,
                          offer.discountPercentage,
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-500">
                      Round trip, all inclusive
                    </p>
                  </div>

                  <div className="flex items-center text-sm text-neutral-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Until {offer.validUntil}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-qatar-burgundy text-qatar-burgundy hover:bg-qatar-burgundy/10"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="qatar" size="lg">
            View All Offers
          </Button>
        </div>
      </div>
    </section>
  );
}
