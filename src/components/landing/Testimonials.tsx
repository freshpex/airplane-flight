import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  quote: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Business Traveler",
    quote:
      "Skyways exceeded all my expectations. The business class experience was outstanding with comfortable seats, delicious meals, and attentive staff. Will definitely fly with them again!",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Frequent Flyer",
    quote:
      "The loyalty program offered by Skyways is unmatched. I've earned enough points for multiple free flights and upgrades. Their app makes booking and managing trips incredibly easy.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
  },
  {
    id: 3,
    name: "Priya Patel",
    position: "Family Traveler",
    quote:
      "Traveling with three kids can be stressful, but Skyways made our family vacation so smooth. The staff were incredibly helpful, and the in-flight entertainment kept the children engaged the whole time.",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4,
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const nextTestimonial = () => {
    if (animating) return;
    setAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (animating) return;
    setAnimating(true);
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  useEffect(() => {
    if (animating) {
      const timer = setTimeout(() => {
        setAnimating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [animating]);

  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-qatar-burgundy/5 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-qatar-gold/5 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Passengers Say
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Discover why travelers choose Skyways for their journeys around
              the world
            </p>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
                      <div className="flex items-center space-x-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-5 w-5",
                              i < testimonial.rating
                                ? "fill-qatar-gold text-qatar-gold"
                                : "fill-neutral-200 text-neutral-200",
                            )}
                          />
                        ))}
                      </div>

                      <blockquote className="text-lg sm:text-xl text-neutral-700 italic mb-8">
                        "{testimonial.quote}"
                      </blockquote>

                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-neutral-500">
                            {testimonial.position}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setAnimating(true);
                    setActiveIndex(i);
                  }}
                  className={cn(
                    "h-2.5 rounded-full transition-all",
                    i === activeIndex
                      ? "w-8 bg-qatar-burgundy"
                      : "w-2.5 bg-neutral-300 hover:bg-neutral-400",
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                ></button>
              ))}
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute top-1/2 left-4 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-neutral-50 transition-colors"
              disabled={animating}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-neutral-700" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute top-1/2 right-4 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-neutral-50 transition-colors"
              disabled={animating}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-neutral-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
