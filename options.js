// Get save settings button
const button = document.querySelector('#save');

// Listen to click save button
button.addEventListener('click', (e) => {
  e.preventDefault();

  // Get settings values
  const colorSelect = document.querySelector('#color').value;
  const bannerSelect = document.querySelector('#banner').value;
  const saved = document.querySelector('#message');

  const options = {
    color: colorSelect,
    banner: bannerSelect
  };

  chrome.storage.sync.set({options});

  // Show saved message to user
  if (!saved.textContent) saved.append('Settings saved!');
  saved.classList.remove('d-none');
});
