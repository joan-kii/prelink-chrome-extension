// Link styles
const css = 'background-color: yellow';

// Get links
let links = document.querySelectorAll('a');

// Aply css to external links
for (let link of links) {
  const href = link.getAttribute('href');
  if (href !== null && href.startsWith('h')) {
    link.style = css;
  }
}

// Seguir aquí (corregir css a todas las tabs, corregir reload current tab variable links)