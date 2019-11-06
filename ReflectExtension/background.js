
var tabs = [];

chrome.runtime.onInstalled.addListener(function() {
   chrome.contextMenus.create({
     "id": "sampleContextMenu",
     "title": "Sample Context Menu",
     "contexts": ["selection"]
   });
 });

 chrome.tabs.onCreated.addListener(function(tab) {
   tabs.push(tab.id);
   console.log(tabs);
 });

 chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
   tabs.push(tab.id);
   console.log("Updated: " + tabs.join(", "))
 });
