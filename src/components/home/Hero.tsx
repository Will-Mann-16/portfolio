import { Center, Heading } from '@chakra-ui/react'

import bg from '../../assets/bg.svg'
import { MotionBox } from '../Motion'

const animationVariants = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: 'easeInOut',
    },
  },
}

export function Hero() {
  return (
    <Center
      id="home"
      minH="80vh"
      bgImage={`url(${bg.src})`}
      w="full"
      h="full"
      bgAttachment="scroll"
      bgRepeat="no-repeat"
      bgPos="center"
      bgSize="cover"
    >
      <MotionBox
        variants={{
          hidden: {
            backgroundColor: 'rgba(25, 42, 86, 0)',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
            y: -100,
          },
          visible: {
            backgroundColor: 'rgba(25, 42, 86, 0.9)',
            y: 0,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            transition: {
              delay: 1,
              staggerChildren: 1.5,
              delayChildren: 3,
              ease: 'easeInOut',
            },
          },
        }}
        initial="hidden"
        animate="visible"
        pb={16}
        px={16}
        pt={8}
        rounded="xl"
        boxShadow="2xl"
      >
        <MotionBox variants={animationVariants}>
          <Heading
            as="h1"
            textAlign="center"
            color="white"
            letterSpacing="wider"
            fontSize={{ base: '4rem', md: '8rem' }}
          >
            Hello!
          </Heading>
        </MotionBox>
        <MotionBox mb={4} variants={animationVariants}>
          <Heading
            as="h1"
            textAlign="center"
            color="gray.300"
            fontSize={{ base: '2rem', md: '4rem' }}
          >
            I&apos;m Will Mann
          </Heading>
        </MotionBox>
        <MotionBox variants={animationVariants}>
          <Heading
            as="h1"
            textAlign="center"
            color="gray.400"
            fontSize={{ base: '1.5rem', md: '2rem' }}
          >
            And I&apos;m a software engineer
          </Heading>
        </MotionBox>
      </MotionBox>
    </Center>
  )
}
