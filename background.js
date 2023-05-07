// Description: This file contains the background script of the extension.

// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
  // Check if the CSS is already inserted by getting the 'focusModeStatus' value from the storage
  const { focusModeStatus } = await chrome.storage.local.get('focusModeStatus');
  const nextState = focusModeStatus === 'ON' ? 'OFF' : 'ON';

  // Save the nextState to the storage
  await chrome.storage.local.set({ focusModeStatus: nextState });

  if (nextState === 'ON') {
    // Insert the CSS file when the user turns the extension on
    await chrome.scripting.insertCSS({
      files: ['focus-mode.css'],
      target: { tabId: tab.id }
    });
  } else if (nextState === 'OFF') {
    // Remove the CSS file when the user turns the extension off
    await chrome.scripting.removeCSS({
      files: ['focus-mode.css'],
      target: { tabId: tab.id }
    });
  }
});
