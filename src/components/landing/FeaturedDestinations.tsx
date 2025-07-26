import { ChevronRight } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  price: number;
}

const destinations: Destination[] = [
  {
    id: "1",
    name: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 499,
  },
  {
    id: "2",
    name: "Dubai",
    country: "UAE",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 599,
  },
  {
    id: "3",
    name: "New York",
    country: "USA",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 699,
  },
  {
    id: "4",
    name: "Tokyo",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 799,
  },
];

export function FeaturedDestinations() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Destinations
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of popular destinations with
            exclusive deals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              className="group relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                <h3 className="text-xl font-bold">{destination.name}</h3>
                <p className="text-sm font-medium text-white/80">
                  {destination.country}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <div>
                    <p className="text-xs text-white/70">From</p>
                    <p className="text-xl font-semibold">
                      ${destination.price}
                    </p>
                  </div>

                  <button
                    className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm transition-colors group-hover:bg-qatar-burgundy"
                    aria-label="View destination"
                  >
                    <ChevronRight className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className="inline-flex items-center text-qatar-burgundy hover:text-qatar-burgundy/80 font-medium transition-colors">
            View all destinations
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
