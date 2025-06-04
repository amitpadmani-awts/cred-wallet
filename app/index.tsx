// app/index.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Delay until first render to ensure layout is ready
  }, []);

  const setRoute = async () => {
    const agentStatus = await AsyncStorage.getItem('agentInitState')
    console.log('\n\n\n agentStatus = ', agentStatus)
    if(agentStatus === 'true') {
      router.replace('/enterWalletPin');
    } else {
      router.replace('/onboardingscreen');
    }
  }

  useEffect(() => {
    if (isMounted) {
      setRoute()
    }
  }, [isMounted]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
