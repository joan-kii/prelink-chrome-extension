// Run IIEF in current tab 
(() => {
  
  // Listen to messages from background
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    // Get all links in page
    let links = document.querySelectorAll('a');
    
    // Check type of message
    if (message.action === 'ON') {
      for (let link of links) {

        // Get href
        const href = link.getAttribute('href');

        // Check external link
        if (href !== null && href.startsWith('h') && !href.includes(message.url)) {

          // Set class to link
          link.classList.add('prelink');

          // Create tooltip text
          const certificate = href.startsWith('https') ? 
            'This site has a security certificate' : 
            'This site does not have a security certificate';
          const host = new URL(href).host;
          const tooltipText = `Site: ${host}`;

          // Create data attribute in link
          link.setAttribute('data-tooltip', tooltipText);
        }
      }
    } else if (message.action === 'OFF') {
      
      // Remove links data-tooltips and classes
      let prelinks = document.querySelectorAll('[data-tooltip]');
      for (let link of prelinks) {
        link.removeAttribute('data-tooltip');
        link.classList.remove('prelink');
      }
    }

    sendResponse({payload: true});
  })
})();
