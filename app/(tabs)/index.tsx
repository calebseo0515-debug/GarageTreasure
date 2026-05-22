import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import SaleMap from '../../components/sale-map';
import { useNearbySales } from '../../hooks/use-sales';
import { useFilters } from '../../store/filter-store';
import { useLocation } from '../../hooks/use-location';
import { AppNavBar, FilterChipRow, SaleCard } from '../../components/karina-components';
import { Colors, Typography, Radius, Spacing } from '../../constants/theme';

export default function MapScreen() {
  const router = useRouter();
  const { filters } = useFilters();
  const { location } = useLocation();
  const { sales, loading } = useNearbySales(
    location.latitude,
    location.longitude,
    filters.distance
  );

  return (
    <SafeAreaView style={styles.safe}>
      <AppNavBar />
      <FilterChipRow />

      {/* Map */}
      <View style={styles.mapContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.amber} />
          </View>
        ) : (
          <SaleMap
            sales={sales}
            userLatitude={location.latitude}
            userLongitude={location.longitude}
            radiusMiles={filters.distance}
          />
        )}
      </View>

      {/* Sale List */}
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {!loading && sales.length === 0 ? (
          <EmptyState onSubmit={() => router.push('/create-sale')} />
        ) : (
          <>
            <Text style={styles.listHeader}>
              {sales.length} sale{sales.length !== 1 ? 's' : ''} this weekend near you
            </Text>
            {sales.map(s => (
              <TouchableOpacity
                key={s.id}
                onPress={() => router.push({ pathname: '/sale-detail', params: { id: String(s.id) } })}
                activeOpacity={0.8}
              >
                <SaleCard
                  emoji={getSaleEmoji(s.sale_type)}
                  thumbBg={getSaleThumbBg(s.sale_type)}
                  type={getSaleTypeLabel(s.sale_type)}
                  name={s.title}
                  schedule={`${formatDate(s.start_date)} · ${s.start_time?.slice(0,5)} – ${s.end_time?.slice(0,5)}`}
                  distance={s.city}
                />
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>

      {/* Filter button */}
      <TouchableOpacity style={styles.filterBtn} onPress={() => router.push('/filter')}>
        <Text style={styles.filterBtnText}>⚙ Filters · {filters.distance} mi</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function EmptyState({ onSubmit }: { onSubmit: () => void }) {
  return (
    <View style={styles.emptyWrap}>
      <Text style={styles.emptyIcon}>🗺</Text>
      <Text style={styles.emptyTitle}>No sales listed near you{'\n'}this weekend yet.</Text>
      <Text style={styles.emptySub}>
        Check back Friday — we update the map as sales are reviewed and approved.
      </Text>
      <TouchableOpacity style={styles.emptyBtn} onPress={onSubmit} activeOpacity={0.8}>
        <Text style={styles.emptyBtnText}>Submit a sale for review →</Text>
      </TouchableOpacity>
    </View>
  );
}

function getSaleEmoji(type: string) {
  if (type === 'estate') return '🛋';
  if (type === 'moving') return '📦';
  if (type === 'yard') return '🌿';
  return '🔧';
}

function getSaleThumbBg(type: string) {
  if (type === 'estate') return Colors.amberLight;
  if (type === 'moving') return Colors.tealLight;
  if (type === 'yard') return '#DCFCE7';
  return '#EDE9FE';
}

function getSaleTypeLabel(type: string) {
  if (type === 'estate') return 'Estate Sale';
  if (type === 'moving') return 'Moving Sale';
  if (type === 'yard') return 'Yard Sale';
  return 'Garage Sale';
}

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  mapContainer: { height: 220 },
  loadingContainer: { height: 220, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.cream },
  list: { flex: 1 },
  listContent: { padding: Spacing.md, paddingBottom: 80 },
  listHeader: {
    fontSize: 11, fontFamily: Typography.sansSemiBold,
    color: Colors.muted, marginBottom: Spacing.sm, textTransform: 'uppercase', letterSpacing: 0.5,
  },
  filterBtn: {
    position: 'absolute', bottom: 16, alignSelf: 'center',
    backgroundColor: Colors.charcoal, borderRadius: Radius.pill,
    paddingHorizontal: 20, paddingVertical: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 8, elevation: 6,
  },
  filterBtnText: { fontSize: 12, fontFamily: Typography.sansSemiBold, color: Colors.cream },
  emptyWrap: { alignItems: 'center', paddingTop: 32, paddingHorizontal: 24 },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyTitle: {
    fontFamily: Typography.displayFont, fontSize: 16, color: Colors.charcoal,
    textAlign: 'center', lineHeight: 24, marginBottom: 10,
  },
  emptySub: {
    fontFamily: Typography.sansFont, fontSize: 12, color: Colors.muted,
    textAlign: 'center', lineHeight: 18, marginBottom: 20,
  },
  emptyBtn: {
    backgroundColor: Colors.charcoal, borderRadius: Radius.pill,
    paddingHorizontal: 20, paddingVertical: 10,
  },
  emptyBtnText: { fontFamily: Typography.sansSemiBold, fontSize: 12, color: Colors.cream },
});
