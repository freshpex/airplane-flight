import { ArrowRight, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  'Premium in-flight dining experience',
  'Spacious and comfortable seating',
  'Personal entertainment systems',
  'Free Wi-Fi on select routes',
  'Priority boarding and check-in',
  'Generous baggage allowance',
];

export function Experience() {
  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-right animate-once animate-duration-1000">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-qatar-burgundy/10 text-qatar-burgundy text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-1 fill-qatar-gold stroke-qatar-gold" />
              Premium Travel Experience
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience Luxury at 30,000 Feet</h2>
            <p className="text-lg text-neutral-700 mb-8">
              Our award-winning service ensures every journey is as memorable as the destination. 
              Enjoy world-class amenities, gourmet dining, and personalized attention that sets us apart.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-qatar-burgundy/10 flex items-center justify-center mr-3">
                    <Check className="h-3.5 w-3.5 text-qatar-burgundy" />
                  </div>
                  <span className="text-neutral-700">{feature}</span>
                </div>
              ))}
            </div>

            <Button variant="qatar" size="lg" className="group">
              Explore Our Services
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4 animate-fade-left animate-once animate-duration-1000">
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1583915587649-a6bf6f1c1148?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Premium dining"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1562071707-7249ab429b2a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="First class cabin"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1610642434633-7e7ea32bb762?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Cabin service"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1540339832862-474599807836?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Business lounge"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
