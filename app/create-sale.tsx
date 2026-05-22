import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function CreateSaleScreen() {
  const router = useRouter();

  const emailSubmission = () => {
    const subject = encodeURIComponent('GarageTreasure sale submission');
    const body = encodeURIComponent(
      [
        'Sale title:',
        'Sale address or city:',
        'Sale date:',
        'Sale hours:',
        'Main items:',
        'Source link, if available:',
      ].join('\n\n')
    );

    Linking.openURL(`mailto:seo0515@hotmail.com?subject=${subject}&body=${body}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
          <Text style={styles.cancelText} numberOfLines={1}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Submit Sale</Text>
        <View style={{ width: 80 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.eyebrow}>CURATED LISTINGS</Text>
        <Text style={styles.title}>Submit a sale for review</Text>
        <Text style={styles.body}>
          GarageTreasure is currently reviewing listings manually before they go live.
          Send us the sale details and we will review it for the map.
        </Text>

        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>Every listing is reviewed</Text>
          <Text style={styles.noticeText}>
            No spam. No outdated listings. Just real local sales near Murrieta,
            Temecula, Wildomar, Menifee, and nearby cities.
          </Text>
        </View>

        <View style={styles.steps}>
          <Text style={styles.step}>1. Send sale details</Text>
          <Text style={styles.step}>2. GarageTreasure reviews the listing</Text>
          <Text style={styles.step}>3. Approved listings go live on the map</Text>
        </View>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.submitButton} onPress={emailSubmission}>
          <Text style={styles.submitText}>Email sale for review</Text>
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
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  cancelButton: {
    width: 80,
  },
  cancelText: {
    fontSize: 17,
    color: '#007AFF',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1D1D1F',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  eyebrow: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#1D1D1F',
    letterSpacing: -0.6,
    marginBottom: 12,
  },
  body: {
    fontSize: 17,
    color: '#636366',
    lineHeight: 25,
    marginBottom: 22,
  },
  notice: {
    backgroundColor: '#FFF8E1',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FFE08A',
    marginBottom: 18,
  },
  noticeTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1D1D1F',
    marginBottom: 5,
  },
  noticeText: {
    fontSize: 14,
    color: '#6B5B2A',
    lineHeight: 20,
  },
  steps: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    gap: 10,
  },
  step: {
    fontSize: 16,
    color: '#1D1D1F',
    fontWeight: '600',
  },
  bottomBar: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0,0,0,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  submitText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: -0.3,
  },
});
