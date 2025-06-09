// screens/CredentialDetail.tsx
import CredentialCard from "@/components/credentialCard";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useAgent } from '@/context/AgentContext';
import { ConnectionRecord, getAllCredentialExchangeRecords, getConnectionById, getW3cCredentialRecordById } from '@credebl/ssi-mobile';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// const credentialData = {
//     id: "cred-1",
//     type: "Degree Credential",
//     issuer: "University of Example",
//     issueDate: "2023-06-15",
//     expirationDate: "2033-06-15",
//     issuerLogo: 'https://media.licdn.com/dms/image/v2/D4D0BAQHDeOKfd5mDaQ/company-logo_200_200/company-logo_200_200/0/1712938741859/ayanworks_logo?e=1753920000&v=beta&t=SJuChvclmHig3_U-23_WVQZhCgiv-eqc9SL8iXa3rnU',
//     attributes: [
//       { name: "Degree", value: "Bachelor of Science" },
//       { name: "Field", value: "Computer Science" },
//       { name: "GPA", value: "3.8" },
//       { name: "Honors", value: "Summa Cum Laude" }
//     ]
// };

export default function CredentialDetailScreen() {
  const { id } = useLocalSearchParams();
  const [attributes, setAttributes] = useState(null)
  const [credentialName, setCredentialName] = useState("")
  const [connectionRecord, setConnectionRecord] = useState<ConnectionRecord | null>(null)
  const { agent } = useAgent()


  const fetchCredentialData = async (id: string) => {
      if (!agent) return
  
      try {
        console.log('00000000  = ', id)
        const credential = await getW3cCredentialRecordById(agent, id)
        console.log('11 = ', JSON.stringify(credential.credential, null, 2))
  
        if (credential?.type) {
          setCredentialName(credential.credential.type[1])
        } else {
          setCredentialName("Credential")
        }

        setAttributes(credential.credential.credentialSubject.claims)

        const credRecord = await getAllCredentialExchangeRecords(agent)
        const matchedRecord = credRecord.find(
            (data) =>
              Array.isArray(data.credentials) &&
              data.credentials.some((cred) => cred.credentialRecordId === id)
        )

        const connectionId = matchedRecord?.getTag('connectionId')
        const connectionRecord = await getConnectionById(agent, connectionId as string)
        setConnectionRecord(connectionRecord)
      } catch (error) {
        console.error("Error fetching credential data:", error)
        setCredentialName("Credential")
        setAttributes(null)
      }
    }

  useEffect(() => {
    if (typeof id === "string") {
      fetchCredentialData(id)
    }
  }, [id, agent])

  return (
    <SafeAreaView className="flex-1 p-4 bg-gray-50">
        <ScrollView >
      <VStack space="md">
        <CredentialCard
            credential={{
            id: (id as string) || "",
            name: credentialName || "Credential",
            issuer: connectionRecord?.theirLabel || "Agent"
          }}
        />
        <Text size='xl' className='mt-4' bold>Attributes:</Text>
        <Divider className="my-0.5" />
        {attributes &&
          Object.entries(attributes).map(([key, value]) => (
            <HStack key={key} space="md">
              <Text bold>{key}:</Text>
              <Text>{(value as string) || ""}</Text>
            </HStack>
          ))}
      </VStack>
    </ScrollView>
    </SafeAreaView>
  );
}