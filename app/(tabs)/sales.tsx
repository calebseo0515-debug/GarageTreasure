import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function SalesScreen() {
  const router = useRouter();
  
  const sales = [
    {
      id: 1,
      title: "Big Estate Sale",
      subtitle: "Antiques & Furniture",
      date: "April 26, 2026",
      time: "8:00 AM - 4:00 PM",
      distance: "1.4 mi",
      address: "123 Main St, Los Angeles, CA",
      category: "Antiques, Furniture",
      status: "upcoming",
    },
    {
      id: 2,
      title: "Moving Sale",
      subtitle: "Everything Must Go!",
      date: "April 27, 2026",
      time: "9:00 AM - 3:00 PM",
      distance: "2.4 mi",
      address: "456 Oak Ave, Los Angeles, CA",
      category: "Electronics, Clothing",
      status: "today",
    },
    {
      id: 3,
      title: "Garage Sale",
      subtitle: "Tools & Sports Equipment",
      date: "April 27, 2026",
      time: "7:00 AM - 2:00 PM",
      distance: "3.2 mi",
      address: "789 Pine St, Los Angeles, CA",
      category: "Tools, Sports",
      status: "upcoming",
    },
  ];

  const handleSalePress = (saleId: number) => {
    router.push('/sale-detail');
  };

  const getStatusColor = (status: string) => {
    if (status === 'today') return '#FF3B30';
    return '#007AFF';
  };

  const getStatusText = (status: string) => {
    if (status === 'today') return 'Happening Today';
    return 'Upcoming';
  };

  return (
    <View style={styles.container}>
      {/* Premium Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Nearby Sales</Text>
        <Text style={styles.headerSubtitle}>{sales.length} active in your area</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {sales.map((sale, index) => (
          <TouchableOpacity 
            key={sale.id} 
            style={[
              styles.card,
              index === 0 && styles.firstCard
            ]}
            onPress={() => handleSalePress(sale.id)}
            activeOpacity={0.7}
          >
            {/* Status Badge */}
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(sale.status) }]}>
              <Text style={styles.statusText}>{getStatusText(sale.status)}</Text>
            </View>

            {/* Card Header */}
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleSection}>
                <Text style={styles.cardTitle}>{sale.title}</Text>
                <Text style={styles.cardSubtitle}>{sale.subtitle}</Text>
              </View>
              <View style={styles.distanceChip}>
                <Text style={styles.distanceText}>{sale.distance}</Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Info Grid */}
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>📅</Text>
                <Text style={styles.infoText}>{sale.date}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>🕐</Text>
                <Text style={styles.infoText}>{sale.time}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>📍</Text>
              <Text style={styles.infoText}>{sale.address}</Text>
            </View>

            {/* Categories */}
            <View style={styles.categoryRow}>
              {sale.category.split(', ').map((cat, idx) => (
                <View key={idx} style={styles.categoryPill}>
                  <Text style={styles.categoryText}>{cat}</Text>
                </View>
              ))}
            </View>

            {/* View Details Arrow */}
            <View style={styles.viewDetails}>
              <Text style={styles.viewDetailsText}>View Details</Text>
              <Text style={styles.arrow}>→</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Bottom Spacing */}
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  headerContainer: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#1D1D1F',
    letterSpacing: -1,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 17,
    color: '#86868B',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  firstCard: {
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 6,
  },
  statusBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingRight: 100,
  },
  cardTitleSection: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1D1D1F',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 15,
    color: '#86868B',
    fontWeight: '500',
  },
  distanceChip: {
    backgroundColor: '#E8F4F8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  distanceText: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginVertical: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  infoIcon: {
    fontSize: 18,
  },
  infoText: {
    fontSize: 15,
    color: '#1D1D1F',
    flex: 1,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
    marginBottom: 12,
  },
  categoryPill: {
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 13,
    color: '#1D1D1F',
    fontWeight: '500',
  },
  viewDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8,
    gap: 6,
  },
  viewDetailsText: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '600',
  },
  arrow: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
});