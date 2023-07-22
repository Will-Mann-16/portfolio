/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

// see https://www.sanity.io/docs/api-versioning for how versioning works
import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId,
} from '~/lib/sanity.api'
import { schemaTypes, singletonActions, singletonTypes } from '~/schemas'
import { productionUrl } from '~/utils/productionUrl'

export default defineConfig({
  basePath: '/studio',
  name: 'willmann-portfolio',
  title: 'Will Mann Portfolio',
  projectId,
  dataset,
  //edit schemas in './src/schemas'
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Pages')
              .child(S.document().schemaType('page').documentId('about')),
            S.documentTypeListItem('blogPost').title('Blog posts'),
            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('technology').title('Technologies'),
          ]),
    }),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    productionUrl({ previewSecretId, types: ['post'], apiVersion }),
  ],
})
