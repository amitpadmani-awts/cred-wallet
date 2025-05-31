import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Text } from '@/components/ui/text';
import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProofRequestScreen() {
  const request = {
    id: "request-456",
    verifier: "Job Platform Inc.",
    purpose: "Employment verification",
    requestedAttributes: [
      "Degree Type",
      "Issuance Date",
      "Issuer"
    ],
    expires: "2023-12-31",
    status: "pending"
  };

  return (
    <SafeAreaView className="flex-1 p-4">
      <VStack space="md">
        <Text size="2xl" bold className='mb-4'>Proof Request</Text>
        <HStack className="space-between">
          <Text>From: {request.verifier}</Text>
        </HStack>
        
        <Text>Purpose: {request.purpose}</Text>
        
        <Text className="mt-4" bold>Requested Attributes:</Text>
        <Divider className="my-0.5" />
        {request.requestedAttributes.map((attr, index) => (
          <Text key={index}>• {attr}</Text>
        ))}
        
        <VStack space="md" className="mt-4">
          <Button className="bg-success-500" size="xl" variant="solid" action="primary">
            <ButtonText>Share</ButtonText>
          </Button>
          <Button className="border-success-500" size="xl" variant="outline">
            <ButtonText className="text-success-500">Decline</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}