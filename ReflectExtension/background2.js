

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
    this.tabID = tabID
    this.oTime = oTime;
    this.totalTime = 0;
    this.active = true;
}

WebsiteItem.prototype.isID = function(tabID) {
  if(this.tabIDs == tabID) {
    return true;
  }
  return false;
};

WebsiteItem.prototype.setID = function(tabID, time) {
  if(!tabID) {
    return;
  } else {
    this.tabID = tabID;
    this.oTime = time;
  }
  this.active = true;
};

WebsiteItem.prototype.isWebsite = function(url) {
  if(this.website == this.getWebsiteFromUrl(url)) {
    return true;
  } else {
    return false;
  }
};

WebsiteItem.prototype.clearID = function(currTime) {
  this.totalTime += currTime - this.oTime;
  this.oTime = -1;
  this.tabID = -1;
  this.active = false;
};

WebsiteItem.prototype.equals = function(websiteItemOther) {
  if (this.website == websiteItemOther.website) {
    return true;
  }
  return false;
};

WebsiteItem.prototype.print = function() {
  console.log(this.website + " ||\t" + this.tabID + " |\t" + this.totalTime + " |\t" + this.active);
};


chrome.runtime.onInstalled.addListener(function() {
   chrome.contextMenus.create({
     "id": "sampleContextMenu",
     "title": "Sample Context Menu",
     "contexts": ["selection"]
   });
});

function printWebsites() {
  for(var i = 0; i < websites.length; i++) {
    websites[i].print();
  }
}

chrome.tabs.onActivated.addListener(function(tabDetails) {
  // tabDetails is an object
  var tabID = tabDetails.tabId;
  var url = getCurrUrl(); // TODO: doesn't work
  console.log(url);
  if(url) {
    var temp = new WebsiteItem(url, tabID, new Date());
    for(var i = 0; i < websites.length; i++) {
      if(websites[i].equals(temp)) {
        websites[i].setID(tabID, new Date());
      } else if(websites[i].active) {
        websites[i].clearID(new Date());
      }
    }
  }
  printWebsites();

});

function getCurrUrl() { // TODO: doesn't work
  var url;
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
       url = tabs[0].url;
  });
  return url;
}

chrome.tabs.onRemoved.addListener(function(tabID, removeInfo) {
  for(var i = 0; i < websites.length; i++) {
    if(websites[i].isID(tabID)) {
      websites[i].clearID(new Date());
    }
  }
  printWebsites();

});

chrome.tabs.onCreated.addListener(function(tab) {
  // var temp = new WebsiteItem(tab.url, tab.id, new Date());
  // console.log(tab);
});

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab) {
  if(changeInfo.url) {
    var temp = new WebsiteItem(changeInfo.url, tab.id, new Date());
    var alreadyExists = false;
    for(var i = 0; i < websites.length; i++) {
      if(websites[i].active) {
        websites[i].clearID(new Date());
      }
      if(websites[i].equals(temp)) {
        console.log("---------------------------------------");
        console.log(websites[i].website);
        console.log(temp.website);
        console.log((websites[i].website == temp.website));
        websites[i].setID(tab.id, new Date());
        alreadyExists = true;
      }
    }
    if(!alreadyExists) {
      websites.push(temp);
    }
    printWebsites();
  }

});
