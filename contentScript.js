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

  // Reload extension after change options
  chrome.storage.onChanged.addListener(() => {
    window.location.reload();
  });
  
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
          if (options.color === 'multicolor') {
            link.classList.add('multicolor');
          } else if (options.color === 'red') {
            link.classList.add('red');
          } 

          if (options.banner === 'hover') link.classList.add('hover');

          // Create tooltip text
          const certificate = href.startsWith('https') ? 
            'This site has a security certificate' : 
            'This site does not have a security certificate';
          const host = new URL(href).host;
          const tooltipText = `Site: ${host}`;

          // Get browser position link (avoid header top overflow)
          const linkX = link.offsetTop;

          link.setAttribute('data-tooltip', tooltipText);
          // // Create data attributes in link according to position
          if (linkX < 35) link.setAttribute('data-tooltip-position', 'bottom');
          link.setAttribute('data-tooltip', tooltipText); 
        }
      }
    } else if (message.action === 'OFF') {
      
      // Remove links data-tooltips and classes
      let prelinks = document.querySelectorAll('[data-tooltip]');
      for (let link of prelinks) {
        link.removeAttribute('data-tooltip', 'data-tooltip-bottom');
        link.classList.remove('multicolor', 'red', 'hover', 'fixed');
      }
    }

    sendResponse({payload: true});
  })
})();
