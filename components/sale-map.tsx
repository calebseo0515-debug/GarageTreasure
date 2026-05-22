import { StyleSheet, Text, View } from 'react-native';

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

export default function SaleMap({ sales }: SaleMapProps) {
  return (
    <View style={styles.mapPlaceholder}>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{sales.length}</Text>
          <Text style={styles.statLabel}>Active Sales</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>2.3</Text>
          <Text style={styles.statLabel}>mi nearby</Text>
        </View>
      </View>

      <View style={styles.mapCenter}>
        <Text style={styles.mapTitle}>Interactive Map</Text>
        <Text style={styles.mapSubtitle}>Available on iPhone app</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E8F4F8',
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#86868B',
    fontWeight: '500',
  },
  mapCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1D1D1F',
    marginBottom: 8,
  },
  mapSubtitle: {
    fontSize: 15,
    color: '#86868B',
  },
});
