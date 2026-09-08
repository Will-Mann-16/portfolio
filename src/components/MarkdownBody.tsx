import { Link, Text } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'

import { BodyImage } from '~/components/ContentImage'
import { markdownImageSrc } from '~/lib/contentImage'

type MarkdownBodyProps = {
  markdown: string
  captionColor?: string
}

const IMAGE_BLOCK = /^!\[([^\]]*)\]\(([^)]+)\)$/
const CAPTION_BLOCK = /^\*(.+)\*$/

function MarkdownParagraph({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <Text as="p">{children}</Text>,
        a: ({ href, children }) => {
          const external = href?.startsWith('http')
          return (
            <Link href={href} textDecoration="underline" isExternal={external}>
              {children}
            </Link>
          )
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  )
}

export function MarkdownBody({
  markdown,
  captionColor = 'brand.200',
}: MarkdownBodyProps) {
  const blocks = markdown.split(/\n\n+/).filter(Boolean)
  const nodes = []

  for (let i = 0; i < blocks.length; i++) {
    const image = blocks[i].match(IMAGE_BLOCK)
    const caption = blocks[i + 1]?.match(CAPTION_BLOCK)
    if (image) {
      const src = markdownImageSrc(image[2])
      nodes.push(<BodyImage key={i} src={src} alt={image[1]} />)
      if (caption && !blocks[i + 1].includes('\n')) {
        nodes.push(
          <Text
            key={`${i}-caption`}
            fontStyle="italic"
            textAlign="center"
            color={captionColor}
          >
            {caption[1]}
          </Text>
        )
        i += 1
      }
      continue
    }
    nodes.push(<MarkdownParagraph key={i} markdown={blocks[i]} />)
  }

  return <>{nodes}</>
}
