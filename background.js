chrome.action.onClicked.addListener((tabId) => {
  // Switch ChE on/off
  chrome.action.getBadgeText({tabId: tabId.id})
    .then((result) => {
      if (!result) {
        // Set badge
        chrome.action.setBadgeText({tabId: tabId.id, text: 'ON'});
        chrome.action.setBadgeBackgroundColor({ color: '#AAA' });

        // Insert script_on into tab
        chrome.tabs.sendMessage(tabId.id, {action: 'ON', tab: tabId.id, url: tabId.url});
      } else {
        chrome.action.setBadgeText({tabId: tabId.id, text: ''});

        // Insert script_off into tab
        chrome.tabs.sendMessage(tabId.id, {action: 'OFF', tab: tabId.id});
      }
  })
});