import { router } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Onboarding
          onDone={() => router.push("/setpin")}
          onSkip={() => router.push("/setpin")}
          pages={[
            {
              backgroundColor: '#fff',
              image: <Image height={200} width={200} source={require('../assets/images/favicon.png')} />,
              title: 'Onboarding',
              subtitle: 'Done with React Native Onboarding Swiper',
            },
            {
              backgroundColor: '#fff',
              image: <Image height={200} width={200} source={require('../assets/images/favicon.png')} />,
              title: 'Onboarding',
              subtitle: 'Done with React Native Onboarding Swiper Done with React Native Onboarding Swiper Done with React Native Onboarding Swiper',
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    flex: 1,
    alignItems: 'center',
  },
});
