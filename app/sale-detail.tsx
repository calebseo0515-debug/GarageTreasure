import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function SaleDetailScreen() {
  const router = useRouter();

  const sale = {
    id: 1,
    title: "Big Estate Sale",
    subtitle: "Antiques & Furniture",
    date: "April 26, 2026",
    time: "8:00 AM - 4:00 PM",
    address: "123 Main St, Los Angeles, CA 90001",
    distance: "1.4 mi",
    description: "Moving sale! Selling furniture, vintage records, kitchen appliances, and much more. Early birds welcome! Cash only. Prices negotiable.",
    categories: ["Antiques", "Furniture", "Kitchen"],
    rating: 4.8,
    reviews: 23,
    host: "Sarah Johnson",
    memberSince: "2024",
  };

  return (
    <View style={styles.container}>
      {/* Premium Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton}>
          <Text style={styles.favoriteIcon}>♡</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image Section */}
        <View style={styles.heroImage}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imageIcon}>📷</Text>
            <Text style={styles.imageText}>Sale Gallery</Text>
            <Text style={styles.imageSubtext}>Swipe to view photos</Text>
          </View>
          
          {/* Floating Distance Badge */}
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceText}>{sale.distance} away</Text>
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{sale.title}</Text>
          <Text style={styles.subtitle}>{sale.subtitle}</Text>
          
          {/* Rating */}
          <View style={styles.ratingRow}>
            <View style={styles.ratingBadge}>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.ratingText}>{sale.rating}</Text>
            </View>
            <Text style={styles.reviews}>({sale.reviews} reviews)</Text>
          </View>
        </View>

        {/* Info Cards */}
        <View style={styles.cardsContainer}>
          {/* Date & Time Card */}
          <View style={styles.infoCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>📅</Text>
              <Text style={styles.cardTitle}>When</Text>
            </View>
            <Text style={styles.cardMainText}>{sale.date}</Text>
            <Text style={styles.cardSubText}>{sale.time}</Text>
          </View>

          {/* Location Card */}
          <View style={styles.infoCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>📍</Text>
              <Text style={styles.cardTitle}>Location</Text>
            </View>
            <Text style={styles.cardMainText}>{sale.address}</Text>
            
            {/* Map Preview */}
            <View style={styles.mapPreview}>
              <Text style={styles.mapIcon}>🗺️</Text>
              <Text style={styles.mapText}>Map Preview</Text>
            </View>
          </View>

          {/* Description Card */}
          <View style={styles.infoCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>📝</Text>
              <Text style={styles.cardTitle}>About This Sale</Text>
            </View>
            <Text style={styles.description}>{sale.description}</Text>
          </View>

          {/* Categories Card */}
          <View style={styles.infoCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>🏷️</Text>
              <Text style={styles.cardTitle}>What's Available</Text>
            </View>
            <View style={styles.categoryGrid}>
              {sale.categories.map((cat, index) => (
                <View key={index} style={styles.categoryChip}>
                  <Text style={styles.categoryText}>{cat}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Host Card */}
          <View style={styles.infoCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>👤</Text>
              <Text style={styles.cardTitle}>Hosted By</Text>
            </View>
            <View style={styles.hostInfo}>
              <View style={styles.hostAvatar}>
                <Text style={styles.hostInitial}>{sale.host[0]}</Text>
              </View>
              <View style={styles.hostDetails}>
                <Text style={styles.hostName}>{sale.host}</Text>
                <Text style={styles.hostMember}>Member since {sale.memberSince}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Floating Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.directionsButton}>
          <Text style={styles.directionsIcon}>🚗</Text>
          <Text style={styles.directionsText}>Get Directions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backIcon: {
    fontSize: 20,
    color: '#007AFF',
  },
  backText: {
    fontSize: 17,
    color: '#007AFF',
    fontWeight: '600',
  },
  favoriteButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 28,
    color: '#FF3B30',
  },
  scrollView: {
    flex: 1,
  },
  heroImage: {
    position: 'relative',
  },
  imagePlaceholder: {
    height: 300,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  imageText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  imageSubtext: {
    fontSize: 15,
    color: '#86868B',
  },
  distanceBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  distanceText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#007AFF',
  },
  titleSection: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1D1D1F',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 17,
    color: '#86868B',
    marginBottom: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  star: {
    fontSize: 16,
  },
  ratingText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1D1D1F',
  },
  reviews: {
    fontSize: 15,
    color: '#86868B',
  },
  cardsContainer: {
    padding: 16,
    gap: 16,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1D1D1F',
  },
  cardMainText: {
    fontSize: 17,
    color: '#1D1D1F',
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubText: {
    fontSize: 15,
    color: '#86868B',
  },
  mapPreview: {
    height: 140,
    backgroundColor: '#E8F4F8',
    borderRadius: 12,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  mapText: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '600',
  },
  description: {
    fontSize: 17,
    color: '#1D1D1F',
    lineHeight: 26,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryChip: {
    backgroundColor: '#E8F4F8',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '600',
  },
  hostInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  hostAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hostInitial: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  hostDetails: {
    flex: 1,
  },
  hostName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1D1D1F',
    marginBottom: 2,
  },
  hostMember: {
    fontSize: 15,
    color: '#86868B',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  directionsButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  directionsIcon: {
    fontSize: 20,
  },
  directionsText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: -0.3,
  },
});