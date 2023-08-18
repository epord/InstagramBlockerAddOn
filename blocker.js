window.addEventListener('scroll', function() {
  const windowHeight = window.innerHeight;
  elements = document.querySelectorAll('span');
  viewOlderPostElement = null;

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].textContent === 'View older posts') {
      viewOlderPostElement = elements[i];
      break;
    }
  }

  rootElement = viewOlderPostElement?.parentElement?.parentElement?.parentElement;
  rootElement.style.border = '5px solid red'


  document.body.style.maxHeight = rootElement.offsetTop + 'px';
  if (rootElement.getBoundingClientRect().top <= windowHeight - rootElement.offsetHeight) {
    window.scrollTo(0, rootElement.offsetTop - windowHeight + rootElement.offsetHeight);
  }
});