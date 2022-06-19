// Get save settings button
const button = document.querySelector('#save');

// Listen to click save button
button.addEventListener('click', (e) => {
  e.preventDefault();
  
  // Get settings values
  const colorSelect = document.querySelector('#color').value;
  const bannerSelect = document.querySelector('#banner').value;
  
  const options = {
    color: colorSelect,
    banner: bannerSelect
  };

  chrome.storage.sync.set({options});
  close();
});
