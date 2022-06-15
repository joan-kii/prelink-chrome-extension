chrome.action.onClicked.addListener((tab) => {
  
  // Switch ChE on/off
  let toggleOnOff = chrome.action.getBadgeText({tabId: tab.id})
    .then((result) => {
      if (!result) {
        // Set badge
        chrome.action.setBadgeText({tabId: tab.id, text: 'ON'});
        chrome.action.setBadgeBackgroundColor({ color: '#AAA' })

        // Insert script_on into tab
        chrome.scripting.executeScript({
          target: {tabId: tab.id},
          files: ['content_on.js']
        })
      } else {
        chrome.action.setBadgeText({tabId: tab.id, text: ''});

        // Insert script_off into tab
        chrome.scripting.executeScript({
          target: {tabId: tab.id},
          files: ['content_off.js']
        })
      }
  })
});


// Seguir aquí (cambiar scripting por tab.sendMessage, añadir IIEF en contentScript.js, eliminar content_on y content_off)
