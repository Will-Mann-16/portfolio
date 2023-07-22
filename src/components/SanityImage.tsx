import { ImageAsset } from '@sanity/types'
import Image, { ImageProps } from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

import { getClient } from '~/lib/sanity.client'
import { SanityImageType } from '~/lib/sanity.image'

interface SanityImageProps
  extends Omit<ImageProps, 'src' | 'width' | 'height' | 'loader'> {
  image: SanityImageType
}

export function SanityImage({ image, alt, fill, ...props }: SanityImageProps) {
  const client = getClient()
  const imageProps = useNextSanityImage(client, image.asset)

  if (fill) {
    return (
      <Image
        src={imageProps.src}
        loader={imageProps.loader}
        fill
        placeholder={image.asset?.metadata?.lqip ? 'blur' : undefined}
        blurDataURL={image.asset?.metadata?.lqip}
        {...props}
        alt={alt}
      />
    )
  }

  return (
    <Image
      {...imageProps}
      placeholder={image.asset?.metadata?.lqip ? 'blur' : undefined}
      blurDataURL={image.asset?.metadata?.lqip}
      alt={alt}
      {...props}
    />
  )
}
