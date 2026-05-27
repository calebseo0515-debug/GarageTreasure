import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { DateFilter, useFilters } from '../store/filter-store';

export default function FilterScreen() {
  const router = useRouter();
  const { filters, setFilters } = useFilters();

  const [selectedDate, setSelectedDate] = useState<DateFilter>(filters.date);
  const [selectedDistance, setSelectedDistance] = useState(filters.distance);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(filters.categories);

  const dateOptions: DateFilter[] = ['Today', 'This Weekend', 'All'];
  const distanceOptions = [3, 6, 12, 25, 50];
  const categoryOptions = ['Antiques', 'Furniture', 'Electronics', 'Clothing', 'Tools', 'Sports', 'Books', 'Kitchen', 'Toys', 'Other'];

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const resetFilters = () => {
    setSelectedDate('This Weekend');
    setSelectedDistance(6);
    setSelectedCategories([]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
          <Text style={styles.cancelText} numberOfLines={1}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <TouchableOpacity onPress={resetFilters} style={styles.resetButton}>
          <Text style={styles.resetText} numberOfLines={1}>Reset</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Date Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Date</Text>
          <View style={styles.optionsGrid}>
            {dateOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionChip,
                  selectedDate === option && styles.optionChipSelected
                ]}
                onPress={() => setSelectedDate(option)}
              >
                <Text style={[
                  styles.optionText,
                  selectedDate === option && styles.optionTextSelected
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Distance Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Distance</Text>
          <Text style={styles.sectionSubtitle}>Within {selectedDistance} miles</Text>
          
          <View style={styles.distanceSlider}>
            {distanceOptions.map((distance) => (
              <TouchableOpacity
                key={distance}
                style={[
                  styles.distanceOption,
                  selectedDistance === distance && styles.distanceOptionSelected
                ]}
                onPress={() => setSelectedDistance(distance)}
              >
                <Text style={[
                  styles.distanceText,
                  selectedDistance === distance && styles.distanceTextSelected
                ]}>
                  {distance}
                </Text>
                <Text style={[
                  styles.distanceLabel,
                  selectedDistance === distance && styles.distanceLabelSelected
                ]}>
                  mi
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Category Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏷️ Categories</Text>
          <Text style={styles.sectionSubtitle}>
            {selectedCategories.length === 0 ? 'All categories' : `${selectedCategories.length} selected`}
          </Text>
          
          <View style={styles.categoryGrid}>
            {categoryOptions.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategories.includes(category) && styles.categoryChipSelected
                ]}
                onPress={() => toggleCategory(category)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategories.includes(category) && styles.categoryTextSelected
                ]}>
                  {category}
                </Text>
                {selectedCategories.includes(category) && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Apply Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={() => {
            setFilters({
              ...filters,
              distance: selectedDistance,
              date: selectedDate,
              categories: selectedCategories,
            });
            router.back();
          }}
        >
          <Text style={styles.applyText}>Apply Filters</Text>
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
  resetButton: {
    width: 80,
    alignItems: 'flex-end',
  },
  resetText: {
    fontSize: 17,
    color: '#007AFF',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 15,
    color: '#86868B',
    marginBottom: 20,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionChip: {
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionChipSelected: {
    backgroundColor: '#E8F4F8',
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 15,
    color: '#1D1D1F',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#007AFF',
    fontWeight: '700',
  },
  distanceSlider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  distanceOption: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  distanceOptionSelected: {
    backgroundColor: '#E8F4F8',
    borderColor: '#007AFF',
  },
  distanceText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D1D1F',
  },
  distanceTextSelected: {
    color: '#007AFF',
  },
  distanceLabel: {
    fontSize: 13,
    color: '#86868B',
    marginTop: 2,
  },
  distanceLabelSelected: {
    color: '#007AFF',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  categoryChipSelected: {
    backgroundColor: '#E8F4F8',
    borderColor: '#007AFF',
  },
  categoryText: {
    fontSize: 15,
    color: '#1D1D1F',
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: '#007AFF',
    fontWeight: '700',
  },
  checkmark: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '700',
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
  applyButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  applyText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: -0.3,
  },
});
