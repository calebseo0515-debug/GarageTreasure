import { StyleSheet, View, Text, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const { height } = Dimensions.get('window');

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
      {/* Header */}
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

      {/* Map Container */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          {/* Stats at Top of Map */}
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
          
          {/* Map Text */}
          <View style={styles.mapCenter}>
            <Text style={styles.mapTitle}>Interactive Map</Text>
            <Text style={styles.mapSubtitle}>Available on iPhone app</Text>
          </View>
        </View>
      </View>

      {/* Filter Bar - Fixed at Bottom */}
      <View style={styles.filterBar}>
        <View style={styles.filterChips}>
          <View style={styles.filterChip}>
            <Text style={styles.filterEmoji}>📅</Text>
            <Text style={styles.filterText}>This Weekend</Text>
          </View>
          <View style={styles.filterChip}>
            <Text style={styles.filterEmoji}>📍</Text>
            <Text style={styles.filterText}>6 mi</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.allFiltersButton}
          onPress={() => router.push('/filter')}
        >
          <Text style={styles.allFiltersText}>Filters</Text>
        </TouchableOpacity>
      </View>

      {/* FAB - Above Filter Bar */}
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
    marginBottom: 0,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E8F4F8',
    borderRadius: 20,
    overflow: 'hidden',
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
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 8,
  },
  filterChips: {
    flexDirection: 'row',
    flex: 1,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 4,
  },
  filterEmoji: {
    fontSize: 14,
  },
  filterText: {
    fontSize: 13,
    color: '#1D1D1F',
    fontWeight: '500',
  },
  allFiltersButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
  },
  allFiltersText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '300',
  },
});