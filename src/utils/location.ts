export const getCurrentLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const isProductAvailableInRegion = (
  productRegions: string[],
  userRegion: string
): boolean => {
  return productRegions.includes(userRegion);
};

// Mock function to get region from coordinates
// In a real app, this would call a geocoding service
export const getRegionFromCoordinates = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock response - in reality, would use reverse geocoding
  return 'California, USA';
};