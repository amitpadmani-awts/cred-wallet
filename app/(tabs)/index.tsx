import { Fab, FabLabel } from '@/components/ui/fab';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function HomeScreen() {
  return (
    <SafeAreaView className='p-4 flex-1'>
      <Text size={'4xl'}>Welcome Amit,</Text>
      <Fab
        onPress={()=> router.push('/scannerscreen')}
        size="lg"
        className='bg-success-500'
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}
      >
        <FabLabel>Scan</FabLabel>
      </Fab>
    </SafeAreaView>
  );
}

