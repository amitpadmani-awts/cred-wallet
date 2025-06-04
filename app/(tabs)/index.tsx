import { Fab, FabLabel } from '@/components/ui/fab';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function HomeScreen() {
  return (
    <SafeAreaView className='p-4 flex-1'>
      <Text size="2xl" bold className='mb-4'>Welcome,</Text><VStack space="md">
          {/* <Button onPress={()=> router.push('/credentialOffer')}>
            <ButtonText>View Credential Offer</ButtonText>
          </Button>
          <Button onPress={()=> router.push('/proofRequest')}>
            <ButtonText>View Proof Request</ButtonText>
          </Button> */}
      </VStack>
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

