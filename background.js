chrome.action.onClicked.addListener((tab) => {
  
  // Switch ChE on/off
  let toggleOnOff = chrome.action.getBadgeText({tabId: tab.id})
    .then((result) => {
      if (!result) {
        // Set badge
        chrome.action.setBadgeText({tabId: tab.id, text: 'ON'});
        chrome.action.setBadgeBackgroundColor({ color: '#AAA' })

        // Insert script into tab
        chrome.scripting.executeScript({
          target: {tabId: tab.id},
          files: ['content.js']
        })
      } else {
        chrome.action.setBadgeText({tabId: tab.id, text: ''});
      }
    });
});
