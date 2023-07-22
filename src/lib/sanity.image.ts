import createImageUrlBuilder from '@sanity/image-url'
import type { Image, ImageAsset } from 'sanity'

import { dataset, projectId } from '~/lib/sanity.api'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined
  }

  return imageBuilder?.image(source).auto('format')
}

export interface SanityImageType {
  _type: 'image'
  asset: ImageAsset
}
