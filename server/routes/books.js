// server/routes/books.js
import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import bookData from '../data/books.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// All books (JSON API)
router.get('/', (_req, res) => {
  res.status(200).json(bookData)
})

// Helper to resolve book.html whether we're in dev (client/public)
// or prod (server/public)
function resolveBookHtml() {
  const prod = path.resolve(__dirname, '../public/book.html')                 // after build
  const dev  = path.resolve(__dirname, '../../client/public/book.html')       // during dev
  return fs.existsSync(prod) ? prod : dev
}

// Detail page shell (static HTML; JS hydrates via /books API)
router.get('/:bookId', (_req, res) => {
  res.status(200).sendFile(resolveBookHtml())
})

export default router
