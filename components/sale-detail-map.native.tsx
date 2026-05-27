import MapView, { Marker, Region } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';

type SaleDetailMapProps = {
  latitude: number;
  longitude: number;
  title: string;
  approximate?: boolean;
};

export default function SaleDetailMap({
  latitude,
  longitude,
  title,
  approximate = true,
}: SaleDetailMapProps) {
  const region: Region = {
    latitude,
    longitude,
    latitudeDelta: 0.06,
    longitudeDelta: 0.06,
  };

  return (
    <View style={styles.wrap}>
      <MapView style={styles.map} initialRegion={region} scrollEnabled={false} zoomEnabled={false}>
        <Marker coordinate={{ latitude, longitude }} title={title}>
          <View style={styles.marker}>
            <Text style={styles.markerText}>$</Text>
          </View>
        </Marker>
      </MapView>
      {approximate && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Approximate area</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 150,
    borderRadius: 12,
    marginTop: 16,
    overflow: 'hidden',
    backgroundColor: '#E8F4F8',
  },
  map: {
    flex: 1,
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  markerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    color: '#1D1D1F',
    fontSize: 12,
    fontWeight: '700',
  },
});
