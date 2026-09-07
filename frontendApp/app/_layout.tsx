import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '@/contexts/AuthContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AuthProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#F8F9FF' },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="product/my-products" options={{ headerShown: false }} />
            <Stack.Screen name="auction/index" options={{ headerShown: false }} />
            <Stack.Screen name="auction/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="checkout/index" options={{ headerShown: false }} />
            <Stack.Screen name="order/index" options={{ headerShown: false }} />
            <Stack.Screen name="order/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="chat/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="wallet/index" options={{ headerShown: false }} />
            <Stack.Screen name="wallet/deposit" options={{ headerShown: false }} />
            <Stack.Screen name="wallet/withdraw" options={{ headerShown: false }} />
            <Stack.Screen name="verification/index" options={{ headerShown: false }} />
            <Stack.Screen name="dispute/index" options={{ headerShown: false }} />
            <Stack.Screen name="dispute/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="dispute/create" options={{ headerShown: false }} />
            <Stack.Screen name="notifications/index" options={{ headerShown: false }} />
            <Stack.Screen name="safespot/index" options={{ headerShown: false }} />
            <Stack.Screen name="barter/offer" options={{ headerShown: false }} />
            <Stack.Screen name="help/index" options={{ headerShown: false }} />
            <Stack.Screen name="auth/login" options={{ headerShown: false }} />
            <Stack.Screen name="auth/register" options={{ headerShown: false }} />
            <Stack.Screen name="auth/forgot-password" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

