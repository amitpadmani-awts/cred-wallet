// components/CredentialCard.tsx
import clsx from 'clsx';
import { Link } from 'expo-router';
import { Image, Pressable } from 'react-native';
import { Box } from './ui/box';
import { HStack } from './ui/hstack';
import { Text } from './ui/text';
import { VStack } from './ui/vstack';

// Generate random pastel color
const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 80%, 90%)`;
};

type CredentialCardProps = {
  credential: {
    id: string;
    name: string;
    issuer: string;
    issuerLogo: string;
    attributes?: { name: string; value: string }[];
  };
};

export default function CredentialCard({ credential }: CredentialCardProps) {
  const bgColor = getRandomColor();

  return (
    <Link href={`/credentialDetail?id=${credential.id}`} asChild>
      <Pressable>
        {({ pressed }) => (
          <Box 
            className={clsx(
                    "p-4 mb-3 rounded-lg border border-gray-200 shadow-md",
                    pressed && "scale-[0.98] opacity-90",
                    !pressed && "scale-100 opacity-100"
                )}
                style={{
                    backgroundColor: bgColor,
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // equivalent to shadow props
                }}
          >
            <HStack className="flex items-center space-x-4">
              <Box className="bg-white p-2 rounded-full border border-gray-300">
                <Image src={credential.issuerLogo} className="w-24 h-24 rounded-full object-cover" />
              </Box>
              
              <VStack className='flex- ml-4'>
                <HStack className="flex justify-between items-center">
                  <Text bold size="lg">
                    {credential.name}
                  </Text>
                </HStack>
                
                <Text size="sm" className='text-light-600'>
                  {credential.issuer}
                </Text>
              </VStack>
            </HStack>
          </Box>
        )}
      </Pressable>
    </Link>
  );
}