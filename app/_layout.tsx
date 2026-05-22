import { Stack } from 'expo-router';
import { FilterProvider } from '../store/filter-store';
import { useFonts } from 'expo-font';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'PlayfairDisplay-Bold': require('../assets/fonts/PlayfairDisplay-Bold.ttf'),
    'DMSans-Regular':       require('../assets/fonts/DMSans-Regular.ttf'),
    'DMSans-Medium':        require('../assets/fonts/DMSans-Medium.ttf'),
    'DMSans-SemiBold':      require('../assets/fonts/DMSans-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#D97706" />
      </View>
    );
  }

  return (
    <FilterProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="sale-detail" />
        <Stack.Screen name="create-sale" />
        <Stack.Screen name="filter" />
      </Stack>
    </FilterProvider>
  );
}
