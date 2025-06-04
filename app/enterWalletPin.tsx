import { Button, ButtonText } from "@/components/ui/button"
import { Input, InputField } from "@/components/ui/input"
import { Text } from "@/components/ui/text"
import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast'
import { useAgent } from "@/context/AgentContext"
import { router } from "expo-router"
import { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"

export default function EnterWalletPinScreen() {
    const [pin, setPin] = useState('')
    const toast = useToast()
    const { initAgent } = useAgent()
    
    const onSubmit = async ()  => {
        if(pin.length !== 6) {
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

        try {
            await initAgent(pin)
        } catch (error) {
            console.error('\n\n\n error init agent ', error)
            toast.show({
                placement: "top",
                duration: 3000,
                render: ({ id }) => {
                    const uniqueToastId = "toast-" + id
                    return (
                    <Toast nativeID={uniqueToastId} action="error" variant="solid">
                        <ToastTitle>Error!</ToastTitle>
                        <ToastDescription>
                            Unable to open your wallet
                        </ToastDescription>
                    </Toast>
                    )
                },
            })
        }

        router.push('/(tabs)')

    }

    return (
        <SafeAreaView className="flex-1 p-4">
            <Text className='mt-12' size={'3xl'} bold>Access your wallet</Text>
            <Text className="mt-4" size={'xl'}>Please provide valid wallet pin to access your wallet.</Text>
            
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
            
            <Button onPress={()=> onSubmit()} className="mt-12 bg-success-500" size="xl" variant="solid" action="primary">
                <ButtonText>Submit</ButtonText>
            </Button>
        </SafeAreaView>
    )
}