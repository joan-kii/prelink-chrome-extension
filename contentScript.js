(() => {
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let links = document.querySelectorAll('a');

    if (message.action === 'ON') {
      // Initialize tooltip
      let certificate;
      let site;
      let tooltip;

      // Aply css to external links
      for (let link of links) {
        // Get href
        const href = link.getAttribute('href');

        // Check external link
        if (href !== null && href.startsWith('h') && !href.includes(message.url)) {

          /* // Create tooltip
          certificate = document.createElement('h5');
          certificate.className= 'secure';

          site = document.createElement('p');
          site.className = 'site';

          tooltip = document.createElement('div');
          tooltip.className = 'prelink-tooltip';

          certificate.innerHTML = href.startsWith('https') ? 
            'This site has a security certificate' : 
            'This site does not have a security certificate';
          const host = new URL(href).host;
          site.innerHTML = host;

          // Add class to link
          link.classList.add('prelink');

          // Add tooltip to DOM
          tooltip.append(certificate);
          tooltip.append(site);
          link.parentNode.insertBefore(tooltip, link); */
          link.setAttribute('data-tooltip', new URL(href).host);
        }
      }
    } else if (message.action === 'OFF') {
      
      // Remove links classes
      let prelinks = document.querySelectorAll('.prelink');
      for (let link of prelinks) {
        link.classList.remove('prelink');
      }

      // Remove tooltips
      let tooltips = document.querySelectorAll('.prelink-tooltip');
      for (let tooltip of tooltips) {
        tooltip.remove();
      }
    }

    sendResponse({payload: true});
  })
})();
