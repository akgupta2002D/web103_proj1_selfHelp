async function renderBooks() {
const grid = document.getElementById('book-grid')
grid.innerHTML = ''
try {
const res = await fetch('/books')
const data = await res.json()

if (!Array.isArray(data) || data.length === 0) {
grid.innerHTML = '<p>No books available 😞</p>'
return
}

data.forEach((book) => {
const card = document.createElement('article')
card.className = 'book-card'

const figure = document.createElement('figure')
const img = document.createElement('img')
img.src = book.coverImage
img.alt = `${book.title} cover`
figure.appendChild(img)

const h3 = document.createElement('h3')
h3.textContent = book.title

const p = document.createElement('p')
p.className = 'muted'
p.textContent = `${book.author} • ${book.category}`

const a = document.createElement('a')
a.href = `/books/${book.id}`
a.setAttribute('role', 'button')
a.textContent = 'Read more'

card.append(figure, h3, p, a)
grid.appendChild(card)
})
} catch (e) {
console.error(e)
grid.innerHTML = '<p>Failed to load books.</p>'
}
}

// Simple dev 404 guard similar to the lab (optional)
const requestedUrl = window.location.pathname.replace(/^\//, '')
if (requestedUrl && !requestedUrl.startsWith('public')) {
window.location.href = '/404.html'
} else {
renderBooks()
}