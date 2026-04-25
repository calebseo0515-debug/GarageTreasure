import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function MapScreen() {
  const router = useRouter(); 
  const [region] = useState({
    latitude: 34.0522,
    longitude: -118.2437,
  });

  const sales = [
    { id: 1, title: "Big Estate Sale", latitude: 34.0522, longitude: -118.2437 },
    { id: 2, title: "Moving Sale", latitude: 34.0622, longitude: -118.2537 },
    { id: 3, title: "Garage Sale", latitude: 34.0422, longitude: -118.2337 }
  ];

  return (
    <View style={styles.container}>
      {/* Elegant Header with Blur Effect */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.logo}>GarageTreasure</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.icon}>🔍</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
              <Text style={styles.icon}>🔔</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Discover Hidden</Text>
        <Text style={styles.heroTitle}>Treasures Nearby</Text>
        <Text style={styles.heroSubtitle}>
          Find amazing deals at garage sales around Los Angeles
        </Text>
      </View>

      {/* Map Placeholder - Premium Feel */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <View style={styles.mapOverlay}>
            <Text style={styles.mapTitle}>Interactive Map</Text>
            <Text style={styles.mapSubtitle}>Available on iPhone app</Text>
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{sales.length}</Text>
                <Text style={styles.statLabel}>Active Sales</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>2.3</Text>
                <Text style={styles.statLabel}>mi nearby</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Floating Filter Card */}
      <View style={styles.floatingCard}>
        <View style={styles.filterRow}>
          <View style={styles.filterChip}>
            <Text style={styles.filterEmoji}>📅</Text>
            <Text style={styles.filterText}>This Weekend</Text>
          </View>
          <View style={styles.filterChip}>
            <Text style={styles.filterEmoji}>📍</Text>
            <Text style={styles.filterText}>6 mi</Text>
          </View>
          <TouchableOpacity 
  style={styles.filterButton}
  onPress={() => router.push('/filter')}
>
  <Text style={styles.filterButtonText}>All Filters</Text>
</TouchableOpacity>
        </View>
      </View>

      {/* Premium FAB */}
      <TouchableOpacity 
  style={styles.fab}
  onPress={() => router.push('/create-sale')}
>
  <Text style={styles.fabIcon}>+</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  headerContainer: {
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  logo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1D1D1F',
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    position: 'relative',
  },
  icon: {
    fontSize: 24,
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#1D1D1F',
    letterSpacing: -1,
    lineHeight: 40,
  },
  heroSubtitle: {
    fontSize: 17,
    color: '#86868B',
    marginTop: 8,
    lineHeight: 24,
  },
  mapContainer: {
    flex: 1,
    margin: 16,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E8F4F8',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  mapOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  mapTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1D1D1F',
    marginBottom: 8,
  },
  mapSubtitle: {
    fontSize: 15,
    color: '#86868B',
    marginBottom: 32,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 28,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#86868B',
    fontWeight: '500',
  },
  floatingCard: {
    position: 'absolute',
    bottom: 180,
    left: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  filterEmoji: {
    fontSize: 16,
  },
  filterText: {
    fontSize: 15,
    color: '#1D1D1F',
    fontWeight: '500',
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 280,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  fabIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
  },
});