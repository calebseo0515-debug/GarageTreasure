import MapView, { Marker, Region } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';

type Sale = {
  id: string | number;
  title: string;
  latitude: number;
  longitude: number;
};

type SaleMapProps = {
  sales: Sale[];
  userLatitude?: number;
  userLongitude?: number;
  radiusMiles?: number;
};

function milesToDelta(miles: number) {
  const delta = (miles / 69) * 2.2;
  return Math.max(0.05, delta);
}

export default function SaleMap({
  sales,
  userLatitude,
  userLongitude,
  radiusMiles = 25,
}: SaleMapProps) {
  const router = useRouter();
  const mapRef = useRef<MapView>(null);

  const centerLat = userLatitude ?? 33.5731;
  const centerLng = userLongitude ?? -117.1971;
  const delta = milesToDelta(radiusMiles);

  const initialRegion: Region = {
    latitude: centerLat,
    longitude: centerLng,
    latitudeDelta: delta,
    longitudeDelta: delta,
  };

  useEffect(() => {
    mapRef.current?.animateToRegion(
      {
        latitude: centerLat,
        longitude: centerLng,
        latitudeDelta: delta,
        longitudeDelta: delta,
      },
      500
    );
  }, [centerLat, centerLng, delta]);

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={initialRegion}
      showsUserLocation
      showsMyLocationButton
    >
      {sales.map((sale) => (
        <Marker
          key={sale.id}
          coordinate={{
            latitude: sale.latitude,
            longitude: sale.longitude,
          }}
          title={sale.title}
          onPress={() =>
            router.push({
              pathname: '/sale-detail',
              params: { id: String(sale.id) },
            })
          }
        >
          <View style={styles.marker}>
            <Text style={styles.markerText}>$</Text>
          </View>
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  marker: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  markerText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
