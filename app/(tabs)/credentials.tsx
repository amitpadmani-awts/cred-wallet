import { Text } from "@/components/ui/text";
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Credentials() {
  return (
    <SafeAreaView style={styles.container}>
        <Text size="4xl">Credential Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
});
