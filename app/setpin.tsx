
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text size='4xl' bold>Secure your wallet</Text>
      <Text className='mt-8' size='lg'>Make sure you remember your PIN — if you forget it, you will need to set up again and re-add your credentials</Text>
      <VStack space="xs">
          <Text className="text-typography-500">Email</Text>
          <Input className="min-w-[250px]">
            <InputField type="text" />
          </Input>
        </VStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
});
