(() => {
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let links = document.querySelectorAll('a');

    if (message.action === 'ON') {
      // Get links
      let certificate = document.createElement('h5');
      certificate.className= 'secure';
      let site = document.createElement('p');
      site.className = 'site';
      let tooltip = document.createElement('span');
      tooltip.className = 'tooltip';

      // Aply css to external links
      for (let link of links) {
        const href = link.getAttribute('href');
        if (href !== null && href.startsWith('h')) {
          link.classList.add('prelink');
          certificate.innerHTML = href.startsWith('https') ? 
            'This site has a security certificate' : 
            'This site does not have a security certificate';
          const host = new URL(href).host;
          site.innerHTML = host;
          tooltip.append(certificate);
          tooltip.append(site);
          link.append(tooltip);
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
