import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Radius, Spacing } from '../constants/theme';

// ── CuratedBadge ────────────────────────────────────────────────────────
export const CuratedBadge = () => (
  <View style={styles.curatedBadge}>
    <Text style={styles.curatedText}>CURATED</Text>
  </View>
);

// ── ReviewedBadge ───────────────────────────────────────────────────────
export const ReviewedBadge = () => (
  <View style={styles.reviewedBadge}>
    <Text style={styles.reviewedText}>✓  Reviewed</Text>
  </View>
);

// ── AppNavBar ───────────────────────────────────────────────────────────
export const AppNavBar = () => (
  <View style={styles.navBar}>
    <Text style={styles.navLogo}>
      Garage<Text style={styles.navLogoAccent}>Treasure</Text>
    </Text>
    <CuratedBadge />
  </View>
);

// ── FilterChips ─────────────────────────────────────────────────────────
type ChipProps = { label: string; active?: boolean };

export const FilterChip = ({ label, active = false }: ChipProps) => (
  <View style={[styles.chip, active && styles.chipActive]}>
    <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
  </View>
);

export const FilterChipRow = () => (
  <View style={styles.chipRow}>
    <FilterChip label="This weekend" active />
    <FilterChip label="Near me" />
    <FilterChip label="Estate" />
  </View>
);

// ── ReviewNoticeBar ─────────────────────────────────────────────────────
export const ReviewNoticeBar = () => (
  <View style={styles.noticeBar}>
    <Text style={styles.noticeIcon}>🔍</Text>
    <Text style={styles.noticeText}>
      Every listing is reviewed before going live. No spam, no outdated posts.
    </Text>
  </View>
);

// ── SubmitButton ────────────────────────────────────────────────────────
type BtnProps = { label: string; onPress?: () => void };
export const PrimaryButton = ({ label, onPress }: BtnProps) => (
  <View style={styles.primaryBtn}>
    <Text style={styles.primaryBtnText} onPress={onPress}>{label}</Text>
  </View>
);

// ── TimelineDot ─────────────────────────────────────────────────────────
type DotStatus = 'done' | 'active' | 'waiting';
type TLRowProps = { status: DotStatus; label: string; sub: string };

export const TimelineRow = ({ status, label, sub }: TLRowProps) => {
  const dotColor =
    status === 'done'   ? Colors.green  :
    status === 'active' ? Colors.amber  : Colors.dark2;
  return (
    <View style={styles.tlRow}>
      <View style={[styles.tlDot, { backgroundColor: dotColor,
        borderWidth: status === 'waiting' ? 1 : 0,
        borderColor: '#444' }]} />
      <Text style={styles.tlLabel}>{label} <Text style={styles.tlSub}>{sub}</Text></Text>
    </View>
  );
};

// ── SaleCard ─────────────────────────────────────────────────────────────
type SaleCardProps = {
  emoji:    string;
  thumbBg:  string;
  type:     string;
  name:     string;
  schedule: string;
  distance: string;
};
export const SaleCard = ({ emoji, thumbBg, type, name, schedule, distance }: SaleCardProps) => (
  <View style={styles.saleCard}>
    <View style={[styles.saleThumb, { backgroundColor: thumbBg }]}>
      <Text style={{ fontSize: 20 }}>{emoji}</Text>
    </View>
    <View style={styles.saleInfo}>
      <Text style={styles.saleType}>{type}</Text>
      <Text style={styles.saleName}>{name}</Text>
      <Text style={styles.saleMeta}>{schedule}</Text>
      <View style={styles.saleFooter}>
        <ReviewedBadge />
        <Text style={styles.saleDist}>{distance}</Text>
      </View>
    </View>
  </View>
);

// ── Styles ───────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // nav
  navBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
    backgroundColor: Colors.warm, borderBottomWidth: 0.5, borderBottomColor: Colors.border,
  },
  navLogo: { fontFamily: Typography.displayFont, fontSize: 16, color: Colors.charcoal },
  navLogoAccent: { color: Colors.amber },

  // curated badge
  curatedBadge: {
    backgroundColor: Colors.amberLight, borderRadius: Radius.pill,
    paddingHorizontal: 10, paddingVertical: 3,
  },
  curatedText: {
    fontFamily: Typography.monoFont, fontSize: 9, fontWeight: '600',
    color: Colors.amberDark, letterSpacing: 0.8,
  },

  // reviewed badge
  reviewedBadge: {
    backgroundColor: Colors.greenLight, borderRadius: Radius.sm,
    paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start',
  },
  reviewedText: {
    fontFamily: Typography.monoFont, fontSize: 9, fontWeight: '600', color: Colors.green,
  },

  // chips
  chipRow: { flexDirection: 'row', gap: 6, paddingHorizontal: Spacing.md, paddingVertical: 6, backgroundColor: Colors.warm },
  chip: { borderRadius: Radius.pill, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 0.5, borderColor: Colors.border },
  chipActive: { backgroundColor: Colors.charcoal, borderColor: Colors.charcoal },
  chipText: { fontSize: 10, fontFamily: Typography.sansMedium, color: Colors.charcoal },
  chipTextActive: { color: Colors.cream },

  // notice bar
  noticeBar: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: Colors.amberLight, borderWidth: 0.5, borderColor: Colors.amberMid,
    borderRadius: Radius.md, marginHorizontal: Spacing.md, marginVertical: 8,
    padding: Spacing.sm,
  },
  noticeIcon: { fontSize: 14 },
  noticeText: { flex: 1, fontSize: 11, fontFamily: Typography.sansFont, color: Colors.amberDark, lineHeight: 16 },

  // primary button
  primaryBtn: {
    backgroundColor: Colors.charcoal, borderRadius: Radius.md,
    marginHorizontal: Spacing.md, marginTop: Spacing.md,
    paddingVertical: 13, alignItems: 'center',
  },
  primaryBtnText: { fontSize: 13, fontFamily: Typography.sansSemiBold, color: Colors.cream, letterSpacing: 0.3 },

  // timeline
  tlRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 5 },
  tlDot: { width: 9, height: 9, borderRadius: 999 },
  tlLabel: { fontSize: 11, fontFamily: Typography.sansMedium, color: Colors.textOnDark },
  tlSub: { fontSize: 11, fontFamily: Typography.sansFont, color: Colors.muted },

  // sale card
  saleCard: {
    flexDirection: 'row', gap: 10, alignItems: 'flex-start',
    backgroundColor: Colors.warm, borderWidth: 0.5, borderColor: Colors.border,
    borderRadius: Radius.md, padding: 10, marginBottom: 8,
  },
  saleThumb: { width: 42, height: 42, borderRadius: 9, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  saleInfo: { flex: 1 },
  saleType: { fontFamily: Typography.monoFont, fontSize: 9, color: Colors.amber, letterSpacing: 0.6, textTransform: 'uppercase' },
  saleName: { fontSize: 11.5, fontFamily: Typography.sansSemiBold, color: Colors.charcoal, marginVertical: 2, lineHeight: 16 },
  saleMeta: { fontSize: 10, fontFamily: Typography.sansFont, color: Colors.muted },
  saleFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  saleDist: { fontSize: 10, color: Colors.muted },
});
