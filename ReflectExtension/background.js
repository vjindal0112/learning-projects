

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
  if(this.tabIDs.includes(tabID)) {
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

WebsiteItem.prototype.setoTime = function(time) {
  this.oTime = time;
}

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
  function arrayRemove(arr, value) {

   return arr.filter(function(ele){
       return ele != value;
   });
  }
  this.tabIDs = arrayRemove(this.tabIDs, tabID);
};

WebsiteItem.prototype.equals = function(websiteItemOther) {
  if (this.website == websiteItemOther.website) {
    return true;
  }
  return false;
};

WebsiteItem.prototype.print = function() {
  console.log(this.website + " ||\t" + this.tabIDs.join(", ") + " |\t" + this.totalTime);
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

function printWebsites() {
  for(var i = 0; i < websites.length; i++) {
    websites[i].print();
  }
}

chrome.tabs.onActivated.addListener(function(tabDetails) {
  // tabDetails is an object
  var tabID = tabDetails.tabId;

  // TODO ***
  // maybe only need single tabID in WebsiteItem?
  // there is only ever one active tab. That is the only one that needs to be kept track of.
  // this might greatly simplify my code as well.

});

function getCurrUrl() {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      return tabs[0].url;
  });
}

chrome.tabs.onRemoved.addListener(function(tabID, removeInfo) {
  for(var i = 0; i < websites.length; i++) {
    if(websites[i].hasID(tabID)) {
      websites[i].removeID(tabID, new Date());
    }
  }
  // printWebsites(); TODO
  console.log(tabID);

});

chrome.tabs.onCreated.addListener(function(tab) {
  // var temp = new WebsiteItem(tab.url, tab.id, new Date());
  console.log(tab);
});

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab) {
  if(changeInfo.url) {
    var temp = new WebsiteItem(changeInfo.url, tab.id, new Date());
    var alreadyExists = false;
    for(var i = 0; i < websites.length; i++) {
      if(websites[i].hasID(tab.id)) {
        websites[i].removeID(tab.id, new Date());
      }
      if(websites[i].equals(temp)) {
        websites[i].addID(tab.id);
        websites[i].setoTime(new Date());
        alreadyExists = true;
      }
    }
    if(!alreadyExists) {
      websites.push(temp);
    }
    // printWebsites(); TODO
  }
  // console.log("New changeInfo");
  // console.log(changeInfo + ", \n" + changeInfo.url);
  console.log(changeInfo);

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


  // var temp = new WebsiteItem(tabDetails.url, tabDetails.id, new Date());
  // var alreadyExists = false;
  // for(var i = 0; i < websites.length; i++) {
  //   if(websites[i].equals(temp)) {
  //     console.log("We here: " + tabDetails.id);
  //     websites[i].addID(tabDetails.id);
  //     alreadyExists = true;
  //   }
  // }
  // if(!alreadyExists) {
  //   websites.push(temp);
  // }
  // console.log(websites);
});
