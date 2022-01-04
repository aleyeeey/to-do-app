import React from 'react'
import {
  ScrollView,
  Box,
  Text,
  VStack,
  Icon,
  Image,
  useColorModeValue
} from 'native-base'
import { Feather } from '@expo/vector-icons'
import AnimatedColorBox from '../components/animated-color-box'
import NavBar from '../components/navbar'
import Masthead from '../components/masthead'
import LinkButton from '../components/link-button'

const AboutScreen = () => {
  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'warmGray.900')}
      w="full"
    >
      <Masthead
        title="Über diese App"
        image={require('../assets/about-masthead.png')}
      >
        <NavBar />
      </Masthead>
      <ScrollView
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt="-20px"
        pt="30px"
        p={4}
      >
        <VStack flex={1} space={4}>
          <Box alignItems="center">
            <Image
              source={require('../assets/ali.jpeg')}
              borderRadius="full"
              resizeMode="cover"
              w={120}
              h={120}
              alt="author"
            />
          </Box>
          <Text fontSize="md" w="full">
            Das ist eine Beispiel-App die ich programmiert habe um meine
            Code-Skills und meine Codequalität zu zeigen.
          </Text>
          <LinkButton
            colorScheme="dark"
            size="lg"
            borderRadius="full"
            href="https://github.com/aleyeeey"
            leftIcon={
              <Icon as={Feather} name="github" size="sm" opacity={0.5} />
            }
          >
            Mein Github Profil
          </LinkButton>
          <LinkButton
            colorScheme={useColorModeValue('blue', 'darkBlue')}
            size="lg"
            borderRadius="full"
            href="https://www.linkedin.com/in/ali-örgey/"
            leftIcon={
              <Icon as={Feather} name="linkedin" size="sm" opacity={0.5} />
            }
          >
            Mein LinkedIn Profil
          </LinkButton>
          <LinkButton
            colorScheme="purple"
            size="lg"
            borderRadius="full"
            href="https://www.oergey.de"
            leftIcon={
              <Icon as={Feather} name="external-link" size="sm" opacity={0.5} />
            }
          >
            Meine Homepage
          </LinkButton>
        </VStack>
      </ScrollView>
    </AnimatedColorBox>
  )
}

export default AboutScreen
