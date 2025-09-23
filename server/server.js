import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import booksRouter from './routes/books.js'
import fs from 'fs' 

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Serve built static assets from Vite build output
app.use('/public', express.static(path.resolve(__dirname, './public')))
app.use('/scripts', express.static(path.resolve(__dirname, './public/scripts')))

// API routes
app.use('/books', booksRouter)

// Quick root ping
app.get('/', (_req, res) => {
res.status(200).send('<h1 style="text-align:center;margin-top:50px;">Rebuild API</h1>')
})

// 404 fallback
app.use((req, res) => {
  const prod404 = path.resolve(__dirname, './public/404.html')
  const dev404  = path.resolve(__dirname, '../client/public/404.html')
  const file = fs.existsSync(prod404) ? prod404 : dev404
  res.status(404).sendFile(file)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
console.log(`🚀 Server listening on http://localhost:${PORT}`)
})