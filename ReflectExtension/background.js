
var tabs = [];

chrome.runtime.onInstalled.addListener(function() {
   chrome.contextMenus.create({
     "id": "sampleContextMenu",
     "title": "Sample Context Menu",
     "contexts": ["selection"]
   });
});

 // chrome.tabs.onCreated.addListener(function(tab) {
 //   tabs.push(tab.id);
 //   console.log(tabs);
 // });
 //
 // chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
 //   tabs.push(tab.url);
 //   console.log("Updated: " + tabs.join(", "))
 // });



// This kind of worked, some websites would not trigger it for some reason

 // chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
 //   console.log("We Here");
 //   var url = details.url;
 //   var posStart = url.indexOf("www.");
 //   var offSetStart = 4;
 //   if(posStart == -1) {
 //     posStart = url.indexOf("://");
 //     offSetStart = 3;
 //   }
 //   var posEnd = url.indexOf(".", posStart + offSetStart);
 //   if(posStart != -1 && posEnd != -1) {
 //     var website = url.substring(posStart+offSetStart, posEnd);
 //     tabs.push(website);
 //     console.log(tabs.join(", \n"));
 //   }
 //
 //
 // });


chrome.history.onVisited.addListener(function(details) {
  // details is a HistoryItem object
    var url = details.url;
    var posStart = url.indexOf("www.");
    var offSetStart = 4;
    if(posStart == -1) {
      posStart = url.indexOf("://");
      offSetStart = 3;
    }
    var posEnd = url.indexOf(".", posStart + offSetStart);
    if(posStart != -1 && posEnd != -1) {
      var website = url.substring(posStart+offSetStart, posEnd);
      tabs.push(website);
      console.log(tabs.join(", \n"));
    }
});
