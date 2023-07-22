import blockContent from './blockContent'
import blogPost from './blogPost'
import page from './page'
import project from './project'
import technology from './technology'

export const singletonActions = new Set([
  'publish',
  'discardChanges',
  'restore',
])
export const singletonTypes = new Set(['page'])

export const schemaTypes = [blogPost, blockContent, project, technology, page]
