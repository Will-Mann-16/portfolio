import sizes from '~/lib/imageSizes.json'

export type ContentImage = {
  src: string
  width: number
  height: number
  blurDataURL: string
}

type ImageMeta = {
  width: number
  height: number
  blur: string
}

export function publicImage(relFromImages: string): ContentImage {
  const src = `/images/${relFromImages.replace(/^\//, '')}`
  const meta = sizes[src as keyof typeof sizes] as ImageMeta | undefined
  if (!meta) {
    throw new Error(`Missing image size for ${src}`)
  }
  return {
    src,
    width: meta.width,
    height: meta.height,
    blurDataURL: meta.blur,
  }
}

export function markdownImageSrc(mdPath: string) {
  return mdPath.replace(/^\.\.\/images\//, '/images/')
}

export function imageMeta(src: string): ImageMeta | undefined {
  return sizes[src as keyof typeof sizes] as ImageMeta | undefined
}
