const labels = document.querySelectorAll('.form-control label');

labels.forEach(label => {
  console.log(label)
  label.innerHTML = label.innerText
    .split('')
    .map((letter, index) => `<span style="transition-delay:${index * 60}ms">${letter}</span>`)
    .join('');
});
