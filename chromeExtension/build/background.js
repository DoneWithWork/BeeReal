chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    chrome.tabs.create({
      url: 'onboarding.html',
    });
  }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getCoupons') {
    fetch('https://joinbeereal.com/api/coupons?url=' + request.domain)
      .then((response) => response.json())
      .then((data) => {
        sendResponse({ success: true, coupons: data || [] });
      })
      .catch((err) => {
        sendResponse({ coupons: [] });
      });
    return true;
  }
  if (request.action === 'setBadgeText') {
    chrome.action.setBadgeText({
      text: request.text,
    });
  }
  if (request.action === 'openPopup') {
    chrome.action.openPopup();
  }
});
