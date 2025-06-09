import CredentialCard from "@/components/credentialCard"
import { Text } from "@/components/ui/text"
import { useAgent } from "@/context/AgentContext"
import { getAllCredentialExchangeRecords, getAllW3cCredentialRecords, getConnectionById } from "@credebl/ssi-mobile"
import { useEffect, useState } from "react"
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

      const credentialExchangeRecord = await getAllCredentialExchangeRecords(agent)
      const displayRecord = []

      for (const record of records) {
        try {
          console.log("record id = ", record?.id)

          if (!record?.id || !credentialExchangeRecord) continue

          const matchedRecord = credentialExchangeRecord.find((data) => data?.credentials?.[0]?.id === record?.id)

          if (!matchedRecord?.connectionId) continue

          const connectionRecord = await getConnectionById(agent, matchedRecord.connectionId)

          const payload = {
            id: record.id,
            name: record?.credential?.type?.[1] || "Unknown Credential",
            issuer: connectionRecord?.theirLabel || "Unknown Agent",
          }
          displayRecord.push(payload)
          console.log("payload = ", JSON.stringify(payload, null, 2))
        } catch (recordError) {
          console.log("Error processing record:", recordError)
          continue
        }
      }

      console.log("displayRecord = ", JSON.stringify(displayRecord, null, 2))
      setDisplayCredentialRecord(displayRecord)
    } catch (error) {
      console.log("ERROR = ", error)
      setDisplayCredentialRecord([])
    }
  }

  useEffect(() => {
    fetchAllCredentialRecord()
  }, [agent])

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
