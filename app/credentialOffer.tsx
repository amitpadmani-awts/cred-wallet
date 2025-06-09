import CredentialCard from "@/components/credentialCard"
import { Button, ButtonText } from "@/components/ui/button"
import { Divider } from "@/components/ui/divider"
import { HStack } from "@/components/ui/hstack"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { useAgent } from "@/context/AgentContext"
import {
  acceptCredentialOffer,
  AutoAcceptCredential,
  type ConnectionRecord,
  declineCredentialOffer,
  DidRecord,
  DidRepository,
  getConnectionById,
  getFormattedCredentialData,
  KeyType,
} from "@credebl/ssi-mobile"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"

export default function CredentialOfferScreen() {
  const { id, connectionId } = useLocalSearchParams()
  const [attributes, setAttributes] = useState(null)
  const [credentialName, setCredentialName] = useState("")
  const [connectionRecord, setConnectionRecord] = useState<ConnectionRecord | null>(null)
  const { agent } = useAgent()

  const fetchCredentialData = async (id: string, connectionId: string) => {
    if (!agent) return

    try {
      const formattedData = await getFormattedCredentialData(agent, id)
      console.log("formattedData = ", JSON.stringify(formattedData, null, 2))

      if (formattedData?.offer?.jsonld?.credential?.credentialSubject) {
        setAttributes(formattedData.offer.jsonld.credential.credentialSubject)
      }

      if (formattedData?.offer?.jsonld?.credential?.type?.length > 1) {
        setCredentialName(formattedData.offer.jsonld.credential.type[1])
      } else {
        setCredentialName("Credential")
      }

      const connectionRecord = await getConnectionById(agent, connectionId)
      setConnectionRecord(connectionRecord)
    } catch (error) {
      console.error("Error fetching credential data:", error)
      setCredentialName("Credential")
      setAttributes(null)
    }
  }

  useEffect(() => {
    if (typeof id === "string" && typeof connectionId === "string") {
      fetchCredentialData(id, connectionId)
    }
  }, [id, connectionId, agent])

  const getDefaultHolderDidDocument = async () => {
  try {
    if(!agent) return
    
    let defaultDidRecord: DidRecord | null
    const didRepository = await agent.dependencyManager.resolve(DidRepository)

    defaultDidRecord = await didRepository.findSingleByQuery(agent.context, {
      isDefault: true,
    })

    if (!defaultDidRecord) {
      const did = await agent.dids.create({
        method: 'key',
        options: {
          keyType: KeyType.Ed25519,
        },
      })

      const [didRecord] = await agent.dids.getCreatedDids({
        did: did.didState.did,
        method: 'key',
      })

      didRecord.setTag('isDefault', true)

      await didRepository.update(agent.context, didRecord)
      defaultDidRecord = didRecord
    }

    const resolvedDidDocument = await agent.dids.resolveDidDocument(defaultDidRecord.did)

    return resolvedDidDocument
  } catch (error) {
    console.log('Error did create', error)
  }
}

  const handleAcceptCredential = async () => {
    if (!agent || !id) return
    const credentialFormatData = await getFormattedCredentialData(agent, id as string)
    try {
      // Added holder did as id if did is not present and negotiate offer
      if (
        !credentialFormatData?.offer?.jsonld?.credential?.credentialSubject?.id &&
        credentialFormatData?.offer?.jsonld
      ) {
        const holderDid = await getDefaultHolderDidDocument()
        await agent.credentials.negotiateOffer({
          credentialFormats: {
            jsonld: {
              credential: {
                ...credentialFormatData?.offer?.jsonld?.credential,
                credentialSubject: {
                  ...credentialFormatData?.offer?.jsonld?.credential?.credentialSubject,
                  // Added holder did as id if did is not present
                  id: holderDid?.id,
                },
              },
              options: {
                ...credentialFormatData?.offer?.jsonld?.options,
              },
            },
          },
          credentialRecordId: id as string,
          // we added auto accept credential to always accept the credential further flows
          autoAcceptCredential: AutoAcceptCredential.Always,
        })
      } else {
        await acceptCredentialOffer(agent, {
          credentialRecordId: id as string,
        })
      }
    } catch (error) {
      console.error("Error accepting credential:", error)
    }
    router.back()
  }

  const handleRejectCredential = async () => {
    if (!agent || !id) return

    try {
      await declineCredentialOffer(agent, id as string)
      router.back()
    } catch (error) {
      console.error("Error rejecting credential:", error)
    }
  }

  return (
    <SafeAreaView className="flex-1 p-4">
      <VStack space="md">
        <Text size="2xl" bold className="mb-4">
          Credential Offer
        </Text>
        <CredentialCard
          credential={{
            id: (id as string) || "",
            name: credentialName || "Credential",
            issuer: connectionRecord?.theirLabel || "Agent",
          }}
        />

        <Text bold>Attributes:</Text>
        <Divider className="my-0.5" />
        {attributes &&
          Object.entries(attributes).map(([key, value]) => (
            <HStack key={key} space="md">
              <Text bold>{key}:</Text>
              <Text>{(value as string) || ""}</Text>
            </HStack>
          ))}

        <VStack className="mt-4 flex-1">
          <Button
            onPress={() => handleAcceptCredential()}
            className="bg-success-500"
            size="xl"
            variant="solid"
            action="primary"
          >
            <ButtonText>Accept</ButtonText>
          </Button>
          <Button
            onPress={() => handleRejectCredential()}
            className="border-success-500 mt-2"
            size="xl"
            variant="outline"
          >
            <ButtonText className="text-success-500">Decline</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </SafeAreaView>
  )
}
