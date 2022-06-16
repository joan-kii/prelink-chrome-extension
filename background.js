chrome.tabs.onUpdated.addListener((tabId) => {
  chrome.action.onClicked.addListener(() => {
    
    // Switch ChE on/off
    chrome.action.getBadgeText({tabId})
      .then((result) => {
        if (!result) {
          // Set badge
          chrome.action.setBadgeText({tabId, text: 'ON'});
          chrome.action.setBadgeBackgroundColor({ color: '#AAA' })
  
          // Insert script_on into tab
          chrome.tabs.sendMessage(tabId, {action: 'ON', tab: tabId});
        } else {
          chrome.action.setBadgeText({tabId, text: ''});
  
          // Insert script_off into tab
          chrome.tabs.sendMessage(tabId, {action: 'OFF', tab: tabId});
        }
    })
  });
});
