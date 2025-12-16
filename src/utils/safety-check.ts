// Safety Check-In Utility Functions

// Calculate distance between two coordinates using Haversine formula
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

// Check if user has already been asked about a specific emergency
export const hasBeenAskedAboutEmergency = (emergencyId: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  const askedEmergencies = localStorage.getItem('safety_check_asked');
  if (!askedEmergencies) return false;
  
  const emergencyIds: string[] = JSON.parse(askedEmergencies);
  return emergencyIds.includes(emergencyId);
};

// Mark emergency as asked
export const markEmergencyAsAsked = (emergencyId: string): void => {
  if (typeof window === 'undefined') return;
  
  const askedEmergencies = localStorage.getItem('safety_check_asked');
  const emergencyIds: string[] = askedEmergencies ? JSON.parse(askedEmergencies) : [];
  
  if (!emergencyIds.includes(emergencyId)) {
    emergencyIds.push(emergencyId);
    localStorage.setItem('safety_check_asked', JSON.stringify(emergencyIds));
  }
};

// Save user's safety status
export const saveSafetyStatus = (emergencyId: string, isSafe: boolean): void => {
  if (typeof window === 'undefined') return;
  
  const safetyStatuses = localStorage.getItem('safety_statuses');
  const statuses: Record<string, { isSafe: boolean; timestamp: string }> = safetyStatuses
    ? JSON.parse(safetyStatuses)
    : {};
  
  statuses[emergencyId] = {
    isSafe,
    timestamp: new Date().toISOString(),
  };
  
  localStorage.setItem('safety_statuses', JSON.stringify(statuses));
};

// Configuration
export const SAFETY_CHECK_CONFIG = {
  PROXIMITY_THRESHOLD_KM: 10, // Show check-in if emergency is within 10km
  CHECK_INTERVAL_MS: 30000, // Check for new emergencies every 30 seconds
};
