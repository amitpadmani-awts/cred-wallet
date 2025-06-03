import '@ethersproject/shims';
import 'fast-text-encoding';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import 'react-native-reanimated';

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GluestackUIProvider mode="light"><ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name='onboardingscreen' options={{headerShown: false}} />
          <Stack.Screen name='setwalletpin' options={{headerShown: false}} />
          <Stack.Screen name='scannerscreen' options={{title: 'QR Scanner'}} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="credentialOffer" options={{ headerShown: false }} />
          <Stack.Screen name="proofRequest" options={{ headerShown: false }} />
          <Stack.Screen name="credentialDetail"/>
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider></GluestackUIProvider>
  );
}
