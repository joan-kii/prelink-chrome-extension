chrome.action.onClicked.addListener(() => {

  // Switch ChE on/off
  let toggleBadgeText = chrome.action.getBadgeText({})
    .then((result) => {
      if (!result) {
        chrome.action.setBadgeText({text: 'ON'});
        chrome.action.setBadgeBackgroundColor({ color: '#AAA' })
      } else {
        chrome.action.setBadgeText({'text': ''});
      }
    });

  // Seguir aquí (get links from DOM) 
});
