// Run IIEF in current tab 
(() => {
  // Get user settings
  const options = {
    color: 'multicolor',
    banner: 'hover'
  };

  chrome.storage.sync.get('options', (result) => {
    if (!result.options) {
      chrome.storage.sync.set({options});
    } else {
      Object.assign(options, result.options);
    }
  });
  
  // Listen to messages from background
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    chrome.storage.sync.get('options', (result) => {
      console.log(result.options)
      // Seguir aquí (asignar classes y data-tootips según options)
    })

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

          // Get browser position link (avoid header top overflow)
          const linkX = link.offsetTop;

          // // Create data attributes in link according to position
          if (linkX < 35) {
            link.setAttribute('data-tooltip', tooltipText);
            link.setAttribute('data-tooltip-position', 'bottom');
          } else {
            link.setAttribute('data-tooltip', tooltipText);
          }
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
