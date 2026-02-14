import Ionicons from '@expo/vector-icons/Ionicons'; // <--- Tady je ten důležitý import
import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
// IconSymbol už nepotřebujeme, pokud používáme všude Ionicons, ale nechám ho tam, kdyby ses k němu chtěl vrátit
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Mapa',
          // Tady použijeme Ionicons s ikonou 'map'
          tabBarIcon: ({ color }) => <Ionicons size={28} name="map" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Kalendář',
          // Tady je ta tvoje ikonka 'browsers'
          tabBarIcon: ({ color }) => <Ionicons size={28} name="browsers" color={color} />,
        }}
      />
    </Tabs>
  );
}