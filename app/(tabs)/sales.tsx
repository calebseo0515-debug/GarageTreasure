import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSales } from '../../hooks/use-sales';
import { SaleCard, ReviewNoticeBar, FilterChipRow } from '../../components/karina-components';
import { Colors, Typography, Spacing } from '../../constants/theme';
import { useFilters } from '../../store/filter-store';
import { formatSaleTime } from '../../lib/format-sale-time';

export default function SalesScreen() {
  const router = useRouter();
  const { filters } = useFilters();
  const { sales, loading } = useSales(filters);

  const handleSalePress = (saleId: string) => {
    router.push({ pathname: '/sale-detail', params: { id: saleId } });
  };

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

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Sales</Text>
        <Text style={styles.headerSub}>{sales.length} active this weekend</Text>
      </View>

      <FilterChipRow />
      <ReviewNoticeBar />

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Colors.amber} />
        </View>
      ) : sales.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🗺</Text>
          <Text style={styles.emptyTitle}>No sales found</Text>
          <Text style={styles.emptySub}>Try adjusting your filters or check back Friday.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {sales.map(s => (
            <TouchableOpacity
              key={s.id}
              onPress={() => handleSalePress(s.id)}
              activeOpacity={0.8}
            >
              <SaleCard
                emoji={getSaleEmoji(s.sale_type)}
                thumbBg={getSaleThumbBg(s.sale_type)}
                type={getSaleTypeLabel(s.sale_type)}
                name={s.title}
                schedule={`${formatDate(s.start_date)} · ${formatSaleTime(s.start_time, s.end_time)}`}
                distance={s.city}
              />
            </TouchableOpacity>
          ))}
          <View style={{ height: 32 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.warm,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontFamily: Typography.displayFont,
    fontSize: 22,
    color: Colors.charcoal,
    marginBottom: 2,
  },
  headerSub: {
    fontFamily: Typography.sansFont,
    fontSize: 12,
    color: Colors.muted,
  },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyTitle: { fontFamily: Typography.displayFont, fontSize: 16, color: Colors.charcoal, textAlign: 'center', marginBottom: 8 },
  emptySub: { fontFamily: Typography.sansFont, fontSize: 12, color: Colors.muted, textAlign: 'center', lineHeight: 18 },
  list: { padding: Spacing.md },
});
