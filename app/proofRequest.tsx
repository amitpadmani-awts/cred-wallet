import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Text } from '@/components/ui/text';
import { VStack } from "@/components/ui/vstack";
import { useAgent } from "@/context/AgentContext";
import { acceptProofRequest, declineProofRequest, getConnectionById, getCredentialsForProofRequest, getProofFormatData } from "@credebl/ssi-mobile";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProofRequestScreen() {

  const {id, connectionId} = useLocalSearchParams()
  const { agent } = useAgent()
  const [connectionLabel, setConnectionLabel] = useState('Agent')
  const [requestedAttributes, setRequestedAttributes] = useState([])

  const request = {
    id: "request-456",
    verifier: "Job Platform Inc.",
    purpose: "Employment verification",
    requestedAttributes: [
      "Degree Type",
      "Issuance Date",
      "Issuer"
    ],
    expires: "2023-12-31",
    status: "pending"
  };

  const extractAttributePathsFromProofRequest = async(requestPayload: any) => {
  const inputDescriptors = requestPayload?.request?.presentationExchange?.presentation_definition?.input_descriptors

  if (!inputDescriptors || !Array.isArray(inputDescriptors)) return []

  const paths = []

  for (const descriptor of inputDescriptors) {
    const fields = descriptor?.constraints?.fields
    if (!fields || !Array.isArray(fields)) continue

    for (const field of fields) {
      if (field.path && Array.isArray(field.path)) {
        paths.push(...field.path)
      }
    }
  }

  return paths
}

  const fetchCredentialForProof = async()=> {
    if(!agent) return
    // Method will returen all the credentials that match againt the proof request
    const credentials = await getCredentialsForProofRequest(agent, {
      proofRecordId: id as string
    })

    // Return proof request data that verifier is asking
    const data = await getProofFormatData(agent, id as string)

    console.log('\n\n\n\n data FOR PROOF = ', JSON.stringify(data, null, 2))
    console.log('\n\n\n\n CRED FOR PROOF = ', JSON.stringify(credentials, null, 2))

    const connectionRecord = await getConnectionById(agent, connectionId as string)
    setConnectionLabel(connectionRecord.theirLabel ?? 'Agent')

    const att = await extractAttributePathsFromProofRequest(data)
    console.log('att = ', JSON.stringify(att, null, 2))
    setRequestedAttributes(att)
  }

  useEffect(() => {
    fetchCredentialForProof()
  }, [id, connectionId, agent])

  const handleShareProof = async() => {
    if(!agent) return
    const proof = await acceptProofRequest(agent, {
      proofRecordId: id as string
    })
    router.back()
  }

  const handleDeclineProof = async() => {
    if(!agent) return
    const proof = await declineProofRequest(agent, {
      proofRecordId: id as string
    })
    router.back()
  }

  return (
    <SafeAreaView className="flex-1 p-4">
      <VStack space="md">
        <Text size="2xl" bold className='mb-4'>Proof Request</Text>
        <HStack className="space-between">
          <Text>From: {connectionLabel}</Text>
        </HStack>
                
        <Text className="mt-4" bold>Requested Attributes:</Text>
        <Divider className="my-0.5" />
        {requestedAttributes && requestedAttributes.map((attr, index) => (
          <Text key={index}>• {attr}</Text>
        ))}
        
        <VStack space="md" className="mt-4">
          <Button onPress={() => handleShareProof()} className="bg-success-500" size="xl" variant="solid" action="primary">
            <ButtonText>Share</ButtonText>
          </Button>
          <Button onPress={()=> handleDeclineProof()} className="border-success-500" size="xl" variant="outline">
            <ButtonText className="text-success-500">Decline</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}