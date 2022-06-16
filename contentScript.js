(() => {
  // Get links
  let links = document.querySelectorAll('a');

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.action === 'ON') {
      // Aply css to external links
      for (let link of links) {
        const href = link.getAttribute('href');
        if (href !== null && href.startsWith('h')) {
          link.classList.add('prelink');
        }
      }
    } else if (message.action === 'OFF') {
      // Aply css to external links
      for (let link of links) {
        const href = link.getAttribute('href');
        if (href !== null && href.startsWith('h')) {
          link.classList.remove('prelink');
        }
      }
    }

    sendResponse({payload: true});
  })

})();
