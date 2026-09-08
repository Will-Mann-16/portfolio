import { Box, Image as ChakraImage, Stack } from '@chakra-ui/react'
import Image, { ImageProps } from 'next/image'

import { imageMeta } from '~/lib/contentImage'

type ContentImageProps = Omit<
  ImageProps,
  'src' | 'width' | 'height' | 'loader' | 'placeholder' | 'blurDataURL'
> & {
  src: string
  alt: string
}

export function ContentImage({ src, alt, fill, ...props }: ContentImageProps) {
  const meta = imageMeta(src)
  if (!meta) {
    return <ChakraImage src={src} alt={alt} />
  }
  if (fill) {
    return <Image src={src} alt={alt} fill {...props} />
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={meta.width}
      height={meta.height}
      {...props}
    />
  )
}

export function BodyImage({ src, alt }: { src: string; alt: string }) {
  const meta = imageMeta(src)
  const width = meta?.width ?? 1600
  const height = meta?.height ?? 900
  return (
    <Stack alignItems="center">
      <Box
        position="relative"
        rounded="md"
        w="full"
        overflow="hidden"
        aspectRatio={`${width} / ${height}`}
      >
        <Image src={src} alt={alt} fill style={{ objectFit: 'contain' }} />
      </Box>
    </Stack>
  )
}
