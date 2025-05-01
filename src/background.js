chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "ON",
    });
  });
  
  const extensions = 'https://developer.chrome.com/docs/extensions';
  const yt = 'https://www.youtube.com/';
  
  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    // Check if the status has changed to 'complete', indicating the page has finished loading.
    if (changeInfo.status === 'complete' && tab.url) {
      console.log("Tab finished loading:", tab.url);
      if (tab.url.includes("youtube.com/watch")) {
        await chrome.scripting.executeScript({
            files: ["speedVideo.js"],
            target: { tabId: tabId },
          });
      }
    }
  });