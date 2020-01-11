global.browser = require("webextension-polyfill");
const axios = require("axios");

chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.onRemoved.addListener(function(tabId, removeInf) {
    console.log(tabId, removeInf);
    chrome.tabs.query(
      {
        url: "https://*.tradingview.com/*"
      },
      function(tabs) {
        if (tabs.length === 0) {
          chrome.storage.sync.set({ shouldHanleAlert: false });
        }
      }
    );
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              hostEquals: "cn.tradingview.com"
            }
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              hostEquals: "www.tradingview.com"
            }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type == "alert") {
      chrome.storage.sync.get(
        ["webhookurl", "shouldHanleAlert"],
        function(result) {
          if (result) {
            let webhookUrl = result.webhookurl;
            let shouldHanleAlert = result.shouldHanleAlert || false;
            if (webhookUrl && shouldHanleAlert) {
              axios({
                method: "post",
                url: webhookUrl,
                data: {
                  alertTitle: request.title,
                  alertContent: request.desc,
                  alertTime: request.date
                }
              }).then(
                function(result) {
                  console.log(result);
                },
                function(reason) {
                  console.log(reason);
                }
              );
            }
          }
        }.bind(this)
      );
    }
  });
});
