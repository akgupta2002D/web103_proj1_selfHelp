const header = document.querySelector('header')

const nav = document.createElement('nav')
const container = document.createElement('ul')
container.setAttribute('role', 'list')

const left = document.createElement('li')
const brand = document.createElement('a')
brand.className = 'brand'
const logo = document.createElement('img')
const title = document.createElement('strong')
title.textContent = 'Rebuild'
brand.append(logo, ' ', title)
brand.href = location.pathname.startsWith('/public/') ? '/public/index.html' : '/'
left.appendChild(brand)

const right = document.createElement('li')
const homeBtn = document.createElement('a')
homeBtn.href = brand.href
homeBtn.setAttribute('role', 'button')
homeBtn.textContent = 'Home'
right.appendChild(homeBtn)

container.append(left, right)
nav.appendChild(container)
header.appendChild(nav)