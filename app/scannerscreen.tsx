import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast';
import { useAgent } from '@/context/AgentContext';
import { acceptInvitationFromUrl } from '@credebl/ssi-mobile';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function ScannerScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [isScanned, setIsScanned] = useState(false)
    const toast = useToast()
    const { agent } = useAgent()

    const onBarcodeScanned = async (data: string) => {
        if(!isScanned) {
          setIsScanned(true)
          console.log('DATA = ', data)

          if(data.includes('https://s3.ap-southeast-1.amazonaws.com')) {
              console.log('\n\n\n\n data = ', data)  
              const response = await fetch(data);
                const fullURL = await response.json();
                console.log('\n\n\n\n FUll URL = ', fullURL)
                if(!agent) return
                const connection = await acceptInvitationFromUrl(agent, fullURL)
                console.log('connection RECORd = ', JSON.stringify(connection, null, 2))
                router.back()
          } else {
            toast.show({
                placement: "top",
                duration: 3000,
                render: ({ id }) => {
                    const uniqueToastId = "toast-" + id
                    return (
                    <Toast nativeID={uniqueToastId} action="error" variant="solid">
                        <ToastTitle>Error!</ToastTitle>
                        <ToastDescription>
                            Invalid QR Code
                        </ToastDescription>
                    </Toast>
                    )
                },
            })
          }
        }

        setTimeout(() => {
            setIsScanned(false)
        }, 5000);

    }

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
        <View style={styles.container}>
            <Text style={styles.message}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission}>
                <ButtonText>Grant permission</ButtonText>
            </Button>
        </View>
        );
    }

    return (
        <CameraView 
            barcodeScannerSettings={{
                barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={(result)=> onBarcodeScanned(result.data)}
            style={{flex: 1}} />
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});