

var websites = [];

WebsiteItem.prototype.getWebsiteFromUrl = function(url) {
  var posStart = url.indexOf("www.");
  var offSetStart = 4;
  if(posStart == -1) {
    posStart = url.indexOf("://");
    offSetStart = 3;
  }
  var posEnd = url.indexOf(".", posStart + offSetStart);
  var website = "";
  if(posStart != -1 && posEnd != -1) {
    website = url.substring(posStart+offSetStart, posEnd);
  }
  return website;
};

function WebsiteItem(url, tabID, oTime) {
    this.website = this.getWebsiteFromUrl(url);
    this.tabIDs = [tabID]
    this.oTime = oTime;
    this.totalTime = 0;
}

WebsiteItem.prototype.hasID = function(tabID) {
  if(tabIDs.includes(tabID)) {
    return true;
  }
  return false;
};

WebsiteItem.prototype.addID = function(tabID) {
  if(!tabID) {
    return
  } else {
    if(!this.tabIDs.includes(tabID)) {
      this.tabIDs.push(tabID);
    }
  }
};

WebsiteItem.prototype.isWebsite = function(url) {
  if(this.website == this.getWebsiteFromUrl(url)) {
    return true;
  } else {
    return false;
  }
};

WebsiteItem.prototype.removeID = function(tabID, currTime) {
  this.totalTime += currTime - this.oTime;
  this.oTime = -1;
};

WebsiteItem.prototype.equals = function(websiteItemOther) {
  if (this.website == websiteItemOther.website) {
    return true;
  }
  return false;
};


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

chrome.tabs.onActivated.addListener(function(tabDetails) {
  // tabDetails is an object

});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {

});


chrome.history.onVisited.addListener(function(tabDetails) {
  // // tabDetails is a HistoryItem object
  // var url = tabDetails.url;
  // var posStart = url.indexOf("www.");
  // var offSetStart = 4;
  // if(posStart == -1) {
  //   posStart = url.indexOf("://");
  //   offSetStart = 3;
  // }
  // var posEnd = url.indexOf(".", posStart + offSetStart);
  // if(posStart != -1 && posEnd != -1) {
  //   var website = url.substring(posStart+offSetStart, posEnd);
  //   // if website not already in data, add to data, along with tabID
  //   if(!history.includes(website.toLowerCase()) {
  //     history.push(website.toLowerCase());
  //     history[history.length-1][1].push(tabDetails.id);
  //   }
  //   console.log(history.join(", \n"));
  // }

  // HistoryItem
  // id: gives unique identifier for **history entry** not tab


  var temp = new WebsiteItem(tabDetails.url, tabDetails.id, new Date());
  var alreadyExists = false;
  for(var i = 0; i < websites.length; i++) {
    if(websites[i].equals(temp)) {
      console.log("We here: " + tabDetails.id);
      websites[i].addID(tabDetails.id);
      alreadyExists = true;
    }
  }
  if(!alreadyExists) {
    websites.push(temp);
  }
  console.log(websites);
});
