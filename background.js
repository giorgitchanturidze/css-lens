let tabsWithCss = new Set();

chrome.action.onClicked.addListener((tab) => {
    if (tabsWithCss.has(tab.id)) {
        removeStyles(tab.id);
        tabsWithCss.delete(tab.id);
    } else {
        injectStyles(tab.id);
        tabsWithCss.add(tab.id);
    }
});

function injectStyles(tabId) {
    chrome.scripting.insertCSS({
        target: { tabId: tabId },
        files: ['lens.css']
    });
    setIcon(tabId, 'icons/icon-on.png');
}

function removeStyles(tabId) {
    chrome.scripting.removeCSS({
        target: { tabId: tabId },
        files: ['lens.css']
    });
    setIcon(tabId, 'icons/icon-off.png');
}

function setIcon(tabId, iconPath) {
    chrome.action.setIcon({
        path: { '128': iconPath },
        tabId: tabId
    });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'loading' && tabsWithCss.has(tabId)) {
        injectStyles(tabId);
    }
});

chrome.tabs.onRemoved.addListener((tabId) => {
    tabsWithCss.delete(tabId);
});
