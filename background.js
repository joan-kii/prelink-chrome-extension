// Listen to click on chrome extension icon
chrome.action.onClicked.addListener((tabId) => {

  // Switch chrome extension on/off
  chrome.action.getBadgeText({tabId: tabId.id})
    .then((result) => {
      if (!result) {

        // Set badge ON
        chrome.action.setBadgeText({tabId: tabId.id, text: 'ON'});
        chrome.action.setBadgeBackgroundColor({ color: '#AAA' });

        // Send message ON to content script
        chrome.tabs.sendMessage(tabId.id, {action: 'ON', tab: tabId.id, url: tabId.url});
      } else {

        // Set badge OFF
        chrome.action.setBadgeText({tabId: tabId.id, text: ''});

        // Send message OFF to content script
        chrome.tabs.sendMessage(tabId.id, {action: 'OFF', tab: tabId.id});
      }
  })
});
