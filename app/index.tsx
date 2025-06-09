import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator, Text, View } from "react-native"

export default function Index() {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log("Index component mounted")
    setIsMounted(true)
  }, [])

  const setRoute = async () => {
    try {
      console.log("Getting agent status from AsyncStorage...")
      const agentStatus = await AsyncStorage.getItem("agentInitState")
      console.log("agentStatus = ", agentStatus)

      if (agentStatus === "true") {
        console.log("Navigating to enterWalletPin")
        router.push("/enterWalletPin")
      } else {
        console.log("Navigating to onboardingscreen")
        router.replace("/onboardingscreen")
      }
    } catch (error) {
      console.error("Error in setRoute:", error)
      setError(error?.toString() || "Unknown error")
    }
  }

  useEffect(() => {
    if (isMounted) {
      console.log("Component mounted, calling setRoute")
      setRoute()
    }
  }, [isMounted])

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Error</Text>
        <Text style={{ textAlign: "center" }}>{error}</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 10 }}>Loading...</Text>
    </View>
  )
}
