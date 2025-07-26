// UnsplashService.ts
// This service provides functionality to fetch images from Unsplash

// Constants for image requests
const UNSPLASH_API_URL = 'https://api.unsplash.com';
const DEFAULT_IMAGE_COUNT = 30;

// Image categories with pre-selected collections for better results
const COLLECTIONS = {
  hotel: ['10749406', '1862642', '671213', '3349859'], // Hotel collections
  car: ['3694365', '1989995', '193849', '4462719'],    // Car collections  
  flight: ['4765084', '3106804', '3337201'],           // Aviation collections
  travel: ['3694708', '3376637', '1976082']            // General travel collections
};

// Cache for images to avoid repeated API calls
const imageCache: Record<string, string[]> = {};

// Helper to shuffle an array - useful to randomize the images
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Preloads images for a specific category to avoid delays when displaying
 * @param category - The image category to preload (hotel, car, flight, travel)
 */
export const preloadImages = async (category: keyof typeof COLLECTIONS): Promise<void> => {
  try {
    if (!imageCache[category]) {
      await getImagesByCategory(category, DEFAULT_IMAGE_COUNT);
    }
  } catch (error) {
    console.error(`Failed to preload ${category} images:`, error);
  }
};

/**
 * Gets a random image URL for the specified category and query
 * @param category - The image category (hotel, car, flight, travel)
 * @param query - Optional search query for specificity (e.g. car model, hotel name)
 * @returns A random image URL from Unsplash
 */
export const getRandomImageByCategory = async (
  category: keyof typeof COLLECTIONS,
  query?: string
): Promise<string> => {
  try {
    let url = `${UNSPLASH_API_URL}/photos/random?count=1&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`;
    if (query) {
      url += `&query=${encodeURIComponent(query)}`;
    } else {
      url += `&collections=${COLLECTIONS[category].join(',')}`;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error('Unsplash API error');
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0 && data[0].urls && data[0].urls.regular) {
      return data[0].urls.regular;
    }
  } catch (error) {
    console.error(`Failed to fetch ${category} image:`, error);
  }
  return getDefaultImage(category);
};

/**
 * Gets multiple images for a category
 * @param category - The image category
 * @param count - Number of images to get
 * @returns Array of image URLs
 */
export const getMultipleImagesByCategory = async (
  category: keyof typeof COLLECTIONS, 
  count: number
): Promise<string[]> => {
  if (!imageCache[category] || imageCache[category].length < count) {
    await getImagesByCategory(category, Math.max(count, DEFAULT_IMAGE_COUNT));
  }

  // If still no images after fetch attempt, return default images
  if (!imageCache[category] || imageCache[category].length === 0) {
    return Array(count).fill(getDefaultImage(category));
  }

  // Return the requested number of images, cycling through if necessary
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(imageCache[category][i % imageCache[category].length]);
  }
  
  return shuffleArray(result).slice(0, count);
};

/**
 * Fetches images from Unsplash for a specific category
 * @param category - The image category
 * @param count - Number of images to fetch
 */
const getImagesByCategory = async (category: keyof typeof COLLECTIONS, count: number): Promise<void> => {
  try {
    const collections = COLLECTIONS[category].join(',');
    // Try to fetch using collections for better targeting
    const response = await fetch(
      `${UNSPLASH_API_URL}/photos/random?collections=${collections}&count=${count}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract regular-sized image URLs from the response
    imageCache[category] = data.map((item: any) => item.urls.regular);
    
  } catch (error) {
    console.error(`Failed to fetch ${category} images:`, error);
    // Fallback to default images if API fails
    imageCache[category] = [];
  }
};

/**
 * Returns a default image URL based on the category
 * @param category - The image category
 * @returns A default image URL
 */
const getDefaultImage = (category: string): string => {
  const defaults: Record<string, string> = {
    hotel: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    car: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
    flight: 'https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg',
    travel: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg'
  };
  
  return defaults[category] || defaults.travel;
};
