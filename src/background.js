chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "ON",
    });
  });

const extensions = 'https://developer.chrome.com/docs/extensions';
const yt = 'https://www.youtube.com/';

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
      console.log("Tab updated:", tab.url);
      await chrome.scripting.executeScript({
        files: ["speedVideo.js"],
        target: { tabId: tabId },
      });
    }
  });