// screens/CredentialDetail.tsx
import CredentialCard from '@/components/credentialCard';
import { Box } from '@/components/ui/box';
import { Divider } from "@/components/ui/divider";
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const credentialData = {
    id: "cred-1",
    type: "Degree Credential",
    issuer: "University of Example",
    issueDate: "2023-06-15",
    expirationDate: "2033-06-15",
    issuerLogo: 'https://media.licdn.com/dms/image/v2/D4D0BAQHDeOKfd5mDaQ/company-logo_200_200/company-logo_200_200/0/1712938741859/ayanworks_logo?e=1753920000&v=beta&t=SJuChvclmHig3_U-23_WVQZhCgiv-eqc9SL8iXa3rnU',
    attributes: [
      { name: "Degree", value: "Bachelor of Science" },
      { name: "Field", value: "Computer Science" },
      { name: "GPA", value: "3.8" },
      { name: "Honors", value: "Summa Cum Laude" }
    ]
};

export default function CredentialDetailScreen() {
  const { id } = useLocalSearchParams();
  const credential = credentialData;

  if (!credential) {
    return (
      <Box >
        <Text>Credential not found</Text>
      </Box>
    );
  }

  return (
    <SafeAreaView className="flex-1 p-4 bg-gray-50">
        <ScrollView >
      <VStack space="md">
        <CredentialCard credential={credential} />
        <Text size='xl' className='mt-4' bold>Attributes:</Text>
        <Divider className="my-0.5" />
        {credential.attributes.map((attr: any, index: number) => (
          <HStack key={index} space="md">
            <Text bold>{attr.name}:</Text>
            <Text>{attr.value}</Text>
          </HStack>
        ))}
      </VStack>
    </ScrollView>
    </SafeAreaView>
  );
}