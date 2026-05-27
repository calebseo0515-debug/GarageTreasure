import { StyleSheet, Text, View } from 'react-native';

type SaleDetailMapProps = {
  latitude: number;
  longitude: number;
  title: string;
  approximate?: boolean;
};

export default function SaleDetailMap({ approximate = true }: SaleDetailMapProps) {
  return (
    <View style={styles.mapPreview}>
      <Text style={styles.mapIcon}>Map</Text>
      <Text style={styles.mapText}>{approximate ? 'Approximate Area' : 'Map Preview'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    height: 150,
    backgroundColor: '#E8F4F8',
    borderRadius: 12,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapIcon: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '700',
    marginBottom: 8,
  },
  mapText: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '600',
  },
});
