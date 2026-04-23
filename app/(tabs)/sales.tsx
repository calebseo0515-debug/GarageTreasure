import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SalesScreen() {
  const sales = [
    {
      id: 1,
      title: "Big Estate Sale - Antiques & Furniture",
      date: "April 26, 2026",
      time: "8:00 AM - 4:00 PM",
      distance: "2.3 km",
      address: "123 Main St, Los Angeles, CA",
      category: "Antiques, Furniture",
    },
    {
      id: 2,
      title: "Moving Sale - Everything Must Go!",
      date: "April 27, 2026",
      time: "9:00 AM - 3:00 PM",
      distance: "3.8 km",
      address: "456 Oak Ave, Los Angeles, CA",
      category: "Electronics, Clothing",
    },
    {
      id: 3,
      title: "Garage Sale - Tools & Sports Equipment",
      date: "April 27, 2026",
      time: "7:00 AM - 2:00 PM",
      distance: "5.1 km",
      address: "789 Pine St, Los Angeles, CA",
      category: "Tools, Sports",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📋 Sales List</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {sales.map((sale) => (
          <TouchableOpacity key={sale.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{sale.title}</Text>
              <Text style={styles.distance}>{sale.distance}</Text>
            </View>
            
            <Text style={styles.date}>📅 {sale.date}</Text>
            <Text style={styles.time}>🕐 {sale.time}</Text>
            <Text style={styles.address}>📍 {sale.address}</Text>
            <Text style={styles.category}>🏷️ {sale.category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  distance: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  time: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  category: {
    fontSize: 14,
    color: '#FF5733',
    marginTop: 8,
    fontWeight: '600',
  },
});