async function renderBook() {
const id = parseInt(window.location.href.split('/').pop(), 10)
const article = document.getElementById('book-article')

try {
const res = await fetch('/books')
const data = await res.json()
const book = Array.isArray(data) ? data.find((b) => b.id === id) : null

if (!book) {
article.innerHTML = '<h3>No book found 😞</h3>'
return
}

document.getElementById('coverImage').src = book.coverImage
document.getElementById('title').textContent = book.title
document.getElementById('author').textContent = `by ${book.author}`
document.getElementById('category').textContent = book.category
document.getElementById('publishedOn').textContent = book.publishedOn
document.getElementById('readingTime').textContent = book.readingTime
document.getElementById('tags').textContent = book.tags.join(', ')
document.getElementById('summary').textContent = book.summary

document.title = `Rebuild — ${book.title}`
} catch (e) {
console.error(e)
article.innerHTML = '<h3>Failed to load book.</h3>'
}
}

renderBook()