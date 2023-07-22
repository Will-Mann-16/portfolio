import { Box, Stack, Text } from '@chakra-ui/react'
import {
  PortableText as BasePortableText,
  PortableTextProps,
} from '@portabletext/react'
import { getImageDimensions } from '@sanity/asset-utils'
import Image from 'next/image'

import { urlForImage } from '~/lib/sanity.image'

const components = {
  types: {
    image: ({ value }) => {
      const { width, height } = getImageDimensions(value.asset)

      return (
        <Stack alignItems="center">
          <Box
            position="relative"
            rounded="md"
            w="full"
            overflow="hidden"
            aspectRatio={width / height}
          >
            <Image
              src={urlForImage(value).url()}
              alt={value.alt}
              layout="fill"
              objectFit="contain"
            />
          </Box>
          {value.caption && (
            <Text fontStyle="italic" textAlign="center" color="brand.200">
              {value.caption}
            </Text>
          )}
        </Stack>
      )
    },
  },
}

export function PortableText(props: PortableTextProps) {
  return <BasePortableText components={components} {...props} />
}
