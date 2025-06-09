import CredentialCard from "@/components/credentialCard"
import { Text } from "@/components/ui/text"
import { useAgent } from "@/context/AgentContext"
import { getAllCredentialExchangeRecords, getAllW3cCredentialRecords, getConnectionById } from "@credebl/ssi-mobile"
import { useFocusEffect } from "expo-router"
import { useCallback, useState } from "react"
import { FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Credentials() {
  const { agent } = useAgent()
  const [displayCredentialRecord, setDisplayCredentialRecord] = useState([])

  const fetchAllCredentialRecord = async () => {
    if (!agent) return

    try {
      const records = await getAllW3cCredentialRecords(agent)
      console.log("records length = ", records?.length || 0)

      if (!records || records.length === 0) {
        setDisplayCredentialRecord([])
        return
      }

      const credentialExchangeRecords = await getAllCredentialExchangeRecords(agent);
      const displayRecord = []

      for (const record of records) {
        try {
          if (!record?.id || !credentialExchangeRecords) continue

          const matchedRecord = credentialExchangeRecords.find(
            (data) =>
              Array.isArray(data.credentials) &&
              data.credentials.some((cred) => cred.credentialRecordId === record?.id)
          )

          if (!matchedRecord?.connectionId) continue

          const connectionRecord = await getConnectionById(agent, matchedRecord.connectionId)

          const payload = {
            id: record.id,
            name: record?.credential?.type?.[1] || "Unknown Credential",
            issuer: connectionRecord?.theirLabel || "Unknown Agent",
          }
          displayRecord.push(payload)
        } catch (recordError) {
          console.log("Error processing record:", recordError)
          continue
        }
      }

      setDisplayCredentialRecord(displayRecord)
    } catch (error) {
      console.log("ERROR = ", error)
      setDisplayCredentialRecord([])
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchAllCredentialRecord()
    }, [agent])
  )

  return (
    <SafeAreaView className="p-4 flex-1">
      <Text size="2xl" bold className="mb-4">
        My Credentials
      </Text>

      <FlatList
        data={displayCredentialRecord || []}
        keyExtractor={(item) => item?.id || Math.random().toString()}
        renderItem={({ item }) => (item ? <CredentialCard credential={item} /> : null)}
        ListEmptyComponent={<Text>No credentials found</Text>}
      />
    </SafeAreaView>
  )
}
