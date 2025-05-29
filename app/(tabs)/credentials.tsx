import { Text } from '@/components/ui/text';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Credentials() {
  return (
    <SafeAreaView className='p-4 bg-blue-100 flex-1'>
      <Text size={'4xl'}>Credentials</Text>
    </SafeAreaView>
  );
}
