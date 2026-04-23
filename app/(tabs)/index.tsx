import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MapScreen() {
  const [region, setRegion] = useState({
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
      <View style={styles.header}>
        <Text style={styles.title}>🗺️ GarageTreasure</Text>
      </View>
      
      <View style={styles.webPlaceholder}>
        <Text style={styles.webText}>🌐 Web Development Mode</Text>
        <Text style={styles.webSubtext}>On actual iPhone app:</Text>
        <Text style={styles.webSubtext}>✅ Google Maps display</Text>
        <Text style={styles.webSubtext}>✅ Current location tracking</Text>
        <Text style={styles.webSubtext}>✅ {sales.length} sale markers</Text>
        
        <View style={styles.salesList}>
          <Text style={styles.salesTitle}>📍 Registered Sales:</Text>
          {sales.map(sale => (
            <Text key={sale.id} style={styles.saleItem}>• {sale.title}</Text>
          ))}
        </View>
      </View>
      
      <View style={styles.filterBar}>
        <Text style={styles.filterText}>Date: This Weekend | Distance: 10km | Category: All</Text>
      </View>

      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  webPlaceholder: {
    flex: 1,
    backgroundColor: '#e8f4f8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  webText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 30,
  },
  webSubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  salesList: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',
  },
  salesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  saleItem: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  filterBar: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF5733',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
});