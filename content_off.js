// Get links
let links = document.querySelectorAll('a');

// Aply css to external links
for (let link of links) {
  const href = link.getAttribute('href');
  if (href !== null && href.startsWith('h')) {
    link.removeAtribute('style');
  }
}