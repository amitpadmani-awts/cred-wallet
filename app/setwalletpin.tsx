import { Button, ButtonText } from "@/components/ui/button"
import { Input, InputField } from "@/components/ui/input"
import { Text } from "@/components/ui/text"
import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast'
import { ConsoleLogger, InitConfig, LogLevel } from '@credebl/ssi-mobile'
import { router } from "expo-router"
import { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"

export default function SetWalletPinScreen() {
    const [pin, setPin] = useState('')
    const [confirmPin, setConfirmPin] = useState('')
    const toast = useToast()

    const onSubmit = async ()  => {
        if(pin.length !== 6 || confirmPin.length !== 6) {
            toast.show({
                placement: "top",
                duration: 3000,
                render: ({ id }) => {
                    const uniqueToastId = "toast-" + id
                    return (
                    <Toast nativeID={uniqueToastId} action="error" variant="solid">
                        <ToastTitle>Error!</ToastTitle>
                        <ToastDescription>
                            Pin length should be 6 digit
                        </ToastDescription>
                    </Toast>
                    )
                },
            })
            return
        }

        if(pin !== confirmPin){
            toast.show({
                placement: "top",
                duration: 3000,
                render: ({ id }) => {
                    const uniqueToastId = "toast-" + id
                    return (
                    <Toast nativeID={uniqueToastId} action="error" variant="solid">
                        <ToastTitle>Error!</ToastTitle>
                        <ToastDescription>
                            Pin and Confirm should be matched
                        </ToastDescription>
                    </Toast>
                    )
                },
            })
            return
        }

        const config: InitConfig = {
        label: 'ADEYA Wallet',
        walletConfig: {
            id: 'adeya-wallet',
            key: 'adeya-wallet-key'
        },
        logger: new ConsoleLogger(LogLevel.debug),
        autoUpdateStorageOnStartup: true
        }

        // await initializeAgent({
        // agentConfig: config,
        // modules: {
        //     ...getAgentModules({
        //         mediatorInvitationUrl: 'https://stage-mediator.ngotag.com/invite?oob=eyJAdHlwZSI6Imh0dHBzOi8vZGlkY29tbS5vcmcvb3V0LW9mLWJhbmQvMS4xL2ludml0YXRpb24iLCJAaWQiOiJhM2Y5ZGI1My1mNGU5LTRhZjItYjk0OC0zOWMyMWRjNWE4MDAiLCJsYWJlbCI6Im5nb3RhZ19tZWRpYXRvciIsImFjY2VwdCI6WyJkaWRjb21tL2FpcDEiLCJkaWRjb21tL2FpcDI7ZW52PXJmYzE5Il0sImhhbmRzaGFrZV9wcm90b2NvbHMiOlsiaHR0cHM6Ly9kaWRjb21tLm9yZy9kaWRleGNoYW5nZS8xLjAiLCJodHRwczovL2RpZGNvbW0ub3JnL2Nvbm5lY3Rpb25zLzEuMCJdLCJzZXJ2aWNlcyI6W3siaWQiOiIjaW5saW5lLTAiLCJzZXJ2aWNlRW5kcG9pbnQiOiJodHRwczovL3N0YWdlLW1lZGlhdG9yLm5nb3RhZy5jb20iLCJ0eXBlIjoiZGlkLWNvbW11bmljYXRpb24iLCJyZWNpcGllbnRLZXlzIjpbImRpZDprZXk6ejZNa3NxM25kWXNHaGo4VEZxbUozTVFhVUY4Qm1FU28zeXRjMnZLQVg0TmdhRWY2Il0sInJvdXRpbmdLZXlzIjpbXX0seyJpZCI6IiNpbmxpbmUtMSIsInNlcnZpY2VFbmRwb2ludCI6IndzczovL3N0YWdlLW1lZGlhdG9yLm5nb3RhZy5jb20iLCJ0eXBlIjoiZGlkLWNvbW11bmljYXRpb24iLCJyZWNpcGllbnRLZXlzIjpbImRpZDprZXk6ejZNa3NxM25kWXNHaGo4VEZxbUozTVFhVUY4Qm1FU28zeXRjMnZLQVg0TmdhRWY2Il0sInJvdXRpbmdLZXlzIjpbXX1dfQ',
        //         mediatorPickupStrategy: MediatorPickupStrategy.PickUpV2LiveMode
        //     })
        // }
        // })
        router.push('/(tabs)')

    }

    return (
        <SafeAreaView className="flex-1 p-4">
            <Text className='mt-12' size={'3xl'} bold>Secure your wallet</Text>
            <Text className="mt-4" size={'xl'}>This PIN protects access to your digital identity wallet.</Text>
            <Text className="mt-4" size={'xl'}  bold>Make sure to remember it—if you lose your PIN, you’ll need to reset the wallet, re-onboard, and re-add all your credentials.</Text>
            <Text className="mt-4" size={'xl'}>We <Text size={'xl'} bold className="text-warning-700">cannot recover your PIN </Text> for security reasons.</Text>
            
            <Text className="mt-8" size="xl">Enter Wallet Pin</Text>
            <Input
                className="mt-2"
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                >
                <InputField 
                    maxLength={6} 
                    keyboardType="numeric" 
                    secureTextEntry={true}
                    placeholder="*****" 
                    onChangeText={(pin)=> setPin(pin)} />
                </Input>

            <Text className="mt-8" size="xl">Confirm Wallet Pin</Text>
            <Input
                className="mt-2"
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                >
                <InputField 
                    maxLength={6} 
                    keyboardType="numeric" 
                    secureTextEntry={true}
                    placeholder="*****" 
                    onChangeText={(pin)=> setConfirmPin(pin)} />
                </Input>
            
            <Button onPress={()=> onSubmit()} className="mt-12 bg-success-500" size="xl" variant="solid" action="primary">
                <ButtonText>Submit</ButtonText>
            </Button>
        </SafeAreaView>
    )
}