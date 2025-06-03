import { router } from 'expo-router'
import { Image } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function OnboardingScreen() {
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <Onboarding
                onDone={()=> router.push('/setWalletPin')}
                onSkip={()=> router.push('/setWalletPin')}
                pages={[
                    {
                        backgroundColor: '#fff',
                        image: <Image style={{height: 300, width: 200}} source={require('@/assets/images/OnboardingScreen1.png')} />,
                        title: 'Welcome to Your Digital Identity Wallet',
                        subtitle: 'Securely store, manage, and share your verified credentials—all in one place. You are in full control of your identity.',
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image style={{height: 200, width: 300}} source={require('@/assets/images/OnboardingScreen2.png')} />,
                        title: 'You Control Your Identity',
                        subtitle: 'No more passwords or centralized accounts. With SSI, only you decide who can access your personal data and credentials.',
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image style={{height: 200, width: 300}} source={require('@/assets/images/OnboardingScreen3.png')} />,
                        title: 'Share Only What’s Needed',
                        subtitle: 'Present credentials selectively and privately—without revealing unnecessary information. Your data stays with you.',
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image style={{height: 200, width: 300}} source={require('@/assets/images/OnboardingScreen4.png')} />,
                        title: 'Ready to Take Control?',
                        subtitle: `Start by creating your wallet and receiving your first credential. It's simple, secure, and privacy-first.`,
                    },
                ]}
            />
        </SafeAreaView>
    )
}