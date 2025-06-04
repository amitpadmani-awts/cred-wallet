import CredentialCard from '@/components/credentialCard';
import { Button, ButtonText } from '@/components/ui/button';
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useAgent } from "@/context/AgentContext";
import { acceptCredentialOffer, ConnectionRecord, declineCredentialOffer, getConnectionById, getFormattedCredentialData } from "@credebl/ssi-mobile";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CredentialOfferScreen() {
  const { id, connectionId } = useLocalSearchParams()
  const [attributes, setAttributes] =  useState()
  const [credentialName, setCredentialName] = useState()
  const [connectionRecord, setConnectionRecord] = useState<ConnectionRecord>()
  const { agent } = useAgent()

  const fetchCredentialData = async (id: string, connectionId: string) => {
    if(!agent) return
    const formattedData = await getFormattedCredentialData(agent, id)
    console.log('\n\n\n\n formattedData = ', JSON.stringify(formattedData, null, 2))
    setAttributes(formattedData.offer?.jsonld.credential.credentialSubject)
    console.log(formattedData.offer.jsonld.credential.type[1])
    setCredentialName(formattedData.offer.jsonld.credential.type[1])
    const connectionRecord = await getConnectionById(agent, connectionId)
    setConnectionRecord(connectionRecord)
  }

  useEffect(() => {
    fetchCredentialData(id as string, connectionId as string)
  }, [id, connectionId])

  const handleAcceptCredential = async() => {
    if(!agent) return
    await acceptCredentialOffer(agent, {
      credentialRecordId: id as string
    })
    router.back()
  }

  const handleRejectCredential = async() => {
    if(!agent) return
    await declineCredentialOffer(agent, id as string)
    router.back()
  }

  return (
    <SafeAreaView className="flex-1 p-4">
      <VStack space="md">
        <Text size="2xl" bold className='mb-4'>Credential Offer</Text>
        <CredentialCard credential={{
          id: id as string,
          name: credentialName ?? 'Credential',
          issuer: connectionRecord?.theirLabel ?? 'Agent',
          issuerLogo: connectionRecord?.imageUrl ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2zadAjQy_kg7ALX5Z86oxMhhOAhiiMPKzFA&s',
        }} />
        
        <Text bold>Attributes:</Text>
        <Divider className="my-0.5" />
        {attributes && Object.entries(attributes).map(([key, value]) => (
          <HStack key={key} space="md">
            <Text bold>{key}:</Text>
            <Text>{value as string}</Text>
          </HStack>
        ))}
        
        <VStack className='mt-4 flex-1'>
          <Button onPress={() => handleAcceptCredential()} className="bg-success-500" size="xl" variant="solid" action="primary">
            <ButtonText>Accept</ButtonText>
          </Button>
          <Button onPress={()=> handleRejectCredential()} className="border-success-500 mt-2" size="xl" variant="outline">
            <ButtonText className="text-success-500">Decline</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}