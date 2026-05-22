import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSales } from '../../hooks/use-sales';
import { SaleCard, ReviewNoticeBar } from '../../components/karina-components';
import { Colors, Typography, Spacing } from '../../constants/theme';

export default function SalesScreen() {
  const router = useRouter();
  const { sales, loading } = useSales();

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

      <ReviewNoticeBar />

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Colors.amber} />
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
                schedule={`${formatDate(s.start_date)} · ${s.start_time?.slice(0,5)} – ${s.end_time?.slice(0,5)}`}
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
  list: { padding: Spacing.md },
});
