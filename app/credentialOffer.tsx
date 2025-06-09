import CredentialCard from "@/components/credentialCard"
import { Button, ButtonText } from "@/components/ui/button"
import { Divider } from "@/components/ui/divider"
import { HStack } from "@/components/ui/hstack"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { useAgent } from "@/context/AgentContext"
import {
  acceptCredentialOffer,
  type ConnectionRecord,
  declineCredentialOffer,
  getConnectionById,
  getFormattedCredentialData,
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

  const handleAcceptCredential = async () => {
    if (!agent || !id) return

    try {
      await acceptCredentialOffer(agent, {
        credentialRecordId: id as string,
      })
      router.back()
    } catch (error) {
      console.error("Error accepting credential:", error)
    }
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
            issuerLogo:
              connectionRecord?.imageUrl ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2zadAjQy_kg7ALX5Z86oxMhhOAhiiMPKzFA&s",
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
