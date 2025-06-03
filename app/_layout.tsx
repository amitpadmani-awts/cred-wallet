import 'fast-text-encoding';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import 'react-native-reanimated';

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider mode="light">
      <NavigationContainer independent={true}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack initialRouteName="onboardingScreen">
          <Stack.Screen name='onboardingScreen' options={{ headerShown: false }} />
          <Stack.Screen name='setWalletPin' options={{ headerShown: false }} />
          <Stack.Screen name='scannerScreen' options={{ title: 'QR Scanner' }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="credentialOffer" options={{ headerShown: false }} />
          <Stack.Screen name="proofRequest" options={{ headerShown: false }} />
          <Stack.Screen name="credentialDetail" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
