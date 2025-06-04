import CredentialCard from '@/components/credentialCard';
import { Text } from '@/components/ui/text';
import { useAgent } from '@/context/AgentContext';
import { getAllW3cCredentialRecords } from '@credebl/ssi-mobile';
import { useEffect } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const credentials = [
  {
    id: "cred-1",
    type: "Degree Credential",
    issuer: "University of Example",
    issueDate: "2023-06-15",
    status: "valid",
    issuerLogo: 'https://media.licdn.com/dms/image/v2/D4D0BAQHDeOKfd5mDaQ/company-logo_200_200/company-logo_200_200/0/1712938741859/ayanworks_logo?e=1753920000&v=beta&t=SJuChvclmHig3_U-23_WVQZhCgiv-eqc9SL8iXa3rnU'
  },
  {
    id: "cred-2",
    type: "ID Card",
    issuer: "Government",
    issueDate: "2022-01-10",
    status: "expired",
    issuerLogo: 'https://media.licdn.com/dms/image/v2/D4D0BAQHDeOKfd5mDaQ/company-logo_200_200/company-logo_200_200/0/1712938741859/ayanworks_logo?e=1753920000&v=beta&t=SJuChvclmHig3_U-23_WVQZhCgiv-eqc9SL8iXa3rnU'
  },
  {
    id: "cred-3",
    type: "Professional License",
    issuer: "State Board",
    issueDate: "2023-03-22",
    status: "valid",
    issuerLogo: 'https://media.licdn.com/dms/image/v2/D4D0BAQHDeOKfd5mDaQ/company-logo_200_200/company-logo_200_200/0/1712938741859/ayanworks_logo?e=1753920000&v=beta&t=SJuChvclmHig3_U-23_WVQZhCgiv-eqc9SL8iXa3rnU'
  }
];

export default function Credentials() {
  const { agent } = useAgent()

  const fetchAllCredentialRecord = async () => {
    if(!agent) return
    const records = await getAllW3cCredentialRecords(agent)
    console.log('\n\n\n\n records length = ', records.length)
    console.log('\n\n\n\n records = ', JSON.stringify(records, null, 2))
  }

  useEffect(()=> {
    fetchAllCredentialRecord()
  }, [])

  return (
    <SafeAreaView className='p-4 flex-1'>
      <Text size="2xl" bold className='mb-4'>My Credentials</Text>
      
      <FlatList
        data={credentials}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CredentialCard credential={item} />}
      />
    </SafeAreaView>
  );
}
