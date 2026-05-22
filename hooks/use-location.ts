import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

// Temecula 기본값
const DEFAULT_LOCATION = {
  latitude: 33.5731,
  longitude: -117.1971,
};

export function useLocation() {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    requestLocation();
  }, []);

  async function requestLocation() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      setHasPermission(true);
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    } catch {
      // 권한 없으면 Temecula 기본값 유지
    }
  }

  return { location, hasPermission };
}
