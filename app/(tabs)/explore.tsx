import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';

export default function AlertsScreen() {
  const [allNotifications, setAllNotifications] = useState(true);
  const [newSales, setNewSales] = useState(true);
  const [priceDrops, setPriceDrops] = useState(false);
  const [favorites, setFavorites] = useState(true);
  const [messages, setMessages] = useState(true);

  const [savedSearches, setSavedSearches] = useState([
    { id: 1, name: 'Antique Furniture', location: 'Los Angeles', distance: '6 mi' },
    { id: 2, name: 'Electronics', location: 'Santa Monica', distance: '12 mi' },
  ]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alerts</Text>
        <Text style={styles.headerSubtitle}>Stay updated on sales you care about</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Master Toggle */}
        <View style={styles.section}>
          <View style={styles.masterToggle}>
            <View style={styles.masterInfo}>
              <Text style={styles.masterTitle}>🔔 All Notifications</Text>
              <Text style={styles.masterSubtitle}>
                {allNotifications ? 'You will receive alerts' : 'Paused'}
              </Text>
            </View>
            <Switch
              value={allNotifications}
              onValueChange={setAllNotifications}
              trackColor={{ false: '#E5E5EA', true: '#34C759' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#E5E5EA"
            />
          </View>
        </View>

        {/* Notification Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Types</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>🆕 New Sales Nearby</Text>
              <Text style={styles.settingDescription}>When sales are posted in your area</Text>
            </View>
            <Switch
              value={newSales}
              onValueChange={setNewSales}
              disabled={!allNotifications}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>💰 Price Drops</Text>
              <Text style={styles.settingDescription}>When items you favorited drop in price</Text>
            </View>
            <Switch
              value={priceDrops}
              onValueChange={setPriceDrops}
              disabled={!allNotifications}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>⭐ Favorite Sales</Text>
              <Text style={styles.settingDescription}>Updates on sales you've saved</Text>
            </View>
            <Switch
              value={favorites}
              onValueChange={setFavorites}
              disabled={!allNotifications}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>💬 Messages</Text>
              <Text style={styles.settingDescription}>When sellers respond to your inquiries</Text>
            </View>
            <Switch
              value={messages}
              onValueChange={setMessages}
              disabled={!allNotifications}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Saved Searches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Saved Searches</Text>
            <TouchableOpacity>
              <Text style={styles.addButton}>+ Add</Text>
            </TouchableOpacity>
          </View>
          
          {savedSearches.map((search, index) => (
            <View key={search.id}>
              {index > 0 && <View style={styles.divider} />}
              <View style={styles.searchCard}>
                <View style={styles.searchIcon}>
                  <Text style={styles.searchEmoji}>🔍</Text>
                </View>
                <View style={styles.searchInfo}>
                  <Text style={styles.searchName}>{search.name}</Text>
                  <Text style={styles.searchDetails}>
                    📍 {search.location} • {search.distance}
                  </Text>
                </View>
                <TouchableOpacity style={styles.deleteButton}>
                  <Text style={styles.deleteText}>×</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Notification Schedule */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⏰ Quiet Hours</Text>
          <Text style={styles.sectionSubtitle}>Don't send notifications during these times</Text>
          
          <View style={styles.timeRange}>
            <View style={styles.timeCard}>
              <Text style={styles.timeLabel}>From</Text>
              <Text style={styles.timeValue}>10:00 PM</Text>
            </View>
            <Text style={styles.timeSeparator}>→</Text>
            <View style={styles.timeCard}>
              <Text style={styles.timeLabel}>To</Text>
              <Text style={styles.timeValue}>8:00 AM</Text>
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
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
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  masterToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  masterInfo: {
    flex: 1,
  },
  masterTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  masterSubtitle: {
    fontSize: 15,
    color: '#86868B',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1D1D1F',
  },
  sectionSubtitle: {
    fontSize: 15,
    color: '#86868B',
    marginTop: 4,
    marginBottom: 16,
  },
  addButton: {
    fontSize: 17,
    color: '#007AFF',
    fontWeight: '600',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 17,
    color: '#1D1D1F',
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 15,
    color: '#86868B',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginVertical: 4,
  },
  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  searchIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  searchEmoji: {
    fontSize: 24,
  },
  searchInfo: {
    flex: 1,
  },
  searchName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  searchDetails: {
    fontSize: 15,
    color: '#86868B',
  },
  deleteButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    fontSize: 32,
    color: '#86868B',
    fontWeight: '300',
  },
  timeRange: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeCard: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 13,
    color: '#86868B',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D1D1F',
  },
  timeSeparator: {
    fontSize: 20,
    color: '#86868B',
    marginHorizontal: 12,
  },
});