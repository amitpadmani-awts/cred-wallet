import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function ScannerScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [isScanned, setIsScanned] = useState(false)

    const onBarcodeScanned = (data: string) => {
        if(!isScanned) {
            setIsScanned(true)
            console.log('DATA = ', data)
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