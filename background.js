"use strict";

function updateLocalStorage(){
    chrome.storage.local.get(["urls", "allowed_ips"], function (result) {
        // Set to local storage
        chrome.storage.local.set({ urls: result.urls });
        chrome.storage.local.set({ allowed_ips: result.allowed_ips });
    });
}

function setColor(tabID) {
    chrome.storage.local.get(['tabColors' + tabID], function(result) {
        const color = result['tabColors' + tabID] || "blue"; // default to blue if not set
        chrome.browserAction.setIcon({ path: `icon/${color}(32).png` });
    });
}

// Add this to handle the URL check
var validateIP = function(details) {
    var access_url = details.url;
    chrome.storage.local.get(["urls", "allowed_ips"], function(result) {
        var stored_urls = result.urls.split(",");
        var stored_ips = result.allowed_ips.substring(0, result.allowed_ips.length - 1).split("|,");

        // Proceed with your existing logic using stored_urls and stored_ips...
    });
};

// Your existing message listener will also need to change localStorage to chrome.storage.local
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "update") {
        updateLocalStorage();
    } else if (request.type === "refresh") {
        chrome.tabs.getSelected(null, function(tab) {
            var code = 'window.setTimeout(function(){window.location.reload();},500);';
            chrome.tabs.executeScript(tab.id, { code: code });
        });
    }
});

// Finally, replace all instances of `localStorage` with `chrome.storage.local` accordingly.
