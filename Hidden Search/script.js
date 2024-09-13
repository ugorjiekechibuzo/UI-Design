const search = document.querySelector('.search');
const btn = document.querySelector('.search-btn');
const input= document.querySelector('.search-box');

btn.addEventListener('click', () => {
  search.classList.toggle('active');
  input.focus();
})
