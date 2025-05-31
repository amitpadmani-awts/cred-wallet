import CredentialCard from "@/components/credentialCard";
import { Button, ButtonText } from '@/components/ui/button';
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CredentialOfferScreen() {
  const offer = {
    id: "offer-123",
    issuer: "University of Example",
    type: "Degree Credential",
    issueDate: "2023-06-15",
    attributes: [
      { name: "Degree", value: "Bachelor of Science" },
      { name: "Field", value: "Computer Science" },
      { name: "Issuance Date", value: "June 2023" }
    ],
    status: "pending",
    issuerLogo: 'https://media.licdn.com/dms/image/v2/D4D0BAQHDeOKfd5mDaQ/company-logo_200_200/company-logo_200_200/0/1712938741859/ayanworks_logo?e=1753920000&v=beta&t=SJuChvclmHig3_U-23_WVQZhCgiv-eqc9SL8iXa3rnU'
  };

  return (
    <SafeAreaView className="flex-1 p-4">
      <VStack space="md">
        <Text size="2xl" bold className='mb-4'>Credential Offer</Text>
        <CredentialCard credential={offer} />
        
        <Text bold>Attributes:</Text>
        <Divider className="my-0.5" />
        {offer.attributes.map((attr, index) => (
          <HStack key={index} space="md">
            <Text bold>{attr.name}:</Text>
            <Text>{attr.value}</Text>
          </HStack>
        ))}
        
        <VStack className='mt-4 flex-1'>
          <Button className="bg-success-500" size="xl" variant="solid" action="primary">
            <ButtonText>Accept</ButtonText>
          </Button>
          <Button className="border-success-500 mt-2" size="xl" variant="outline">
            <ButtonText className="text-success-500">Decline</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}