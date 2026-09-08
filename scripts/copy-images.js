const { cpSync, mkdirSync } = require('fs')
const { join } = require('path')

const src = join(process.cwd(), 'content', 'images')
const dest = join(process.cwd(), 'public', 'images')

mkdirSync(join(process.cwd(), 'public'), { recursive: true })
cpSync(src, dest, { recursive: true })
