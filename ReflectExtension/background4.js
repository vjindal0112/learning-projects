

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
};

WebsiteItem.prototype.isWebsite = function(url) {
  if(this.website == this.getWebsiteFromUrl(url)) {
    return true;
  } else {
    return false;
  }
};

WebsiteItem.prototype.clearID = function(currTime) {
  this.totalTime += Math.round((currTime - this.oTime)/1000.0);
  this.oTime = -1;
  this.tabID = -1;
};

WebsiteItem.prototype.equals = function(websiteItemOther) {
  if (this.website == websiteItemOther.website) {
    return true;
  }
  return false;
};

WebsiteItem.prototype.print = function() {
  console.log(this.website + " ||\t" + this.tabID + " |\t" + this.totalTime);
};

WebsiteItem.prototype.isActive = function() {
  return this.tabID != -1;
};



// WebsiteItem definition ends
///////////////////////////______________________________________////////////////////////////
// Event Listeners begin





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

function updateWebsiteItem(newTabID) {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var temp = new WebsiteItem(url, newTabID, new Date());
    var alreadyExists = false;
    for(var i = 0; i < websites.length; i++) {
      if(websites[i].isActive()) {
        websites[i].clearID(new Date()); // old tabID = -1, old oTime = -1, old totalTime += time
      }
      if(websites[i].equals(temp)) {
        websites[i].setID(newTabID, new Date()); // oTime = currTime, tabID = currTabID
        alreadyExists = true;
      }
    }
    if(!alreadyExists) {
      websites.push(temp);
    }
    printWebsites();
  });
}


chrome.tabs.onActivated.addListener(function(tabDetails) {
  // tabDetails is an object
  updateWebsiteItem(tabDetails.tabId);

});

chrome.tabs.onRemoved.addListener(function(tabID, removeInfo) {
  for(var i = 0; i < websites.length; i++) {
    if(websites[i].isID(tabID)) {
      websites[i].clearID(new Date()); // old tabID = -1, old oTime = -1, old totalTime += time
    }
  }
  printWebsites();

});

chrome.tabs.onCreated.addListener(function(tab) {
  // var temp = new WebsiteItem(tab.url, tab.id, new Date());
  // console.log(tab);
  var temp = new WebsiteItem(tab.url, tab.id, new Date());
  var alreadyExists = false;
  for(var i = 0; i < websites.length; i++) {
    if(websites[i].equals(temp)) {
      websites[i].setID(tab.id, new Date());
      alreadyExists = true;
    }
  }
  if(!alreadyExists) {
    websites.push(temp);
  }
  printWebsites();
});

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab) {
  updateWebsiteItem(tab.id);
});


//////// Writing Data Firebase /////////

function writeData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({

  });
}






///////////////////////// Firebase OAuth Stuff /////////////////////////

var config = {
  apiKey: 'AIzaSyBLXHpOZoGgWJipoCaGoR3ZXUktVObXaNQ',
  databaseURL: 'https://test-6a995.firebaseio.com',
  storageBucket: 'test-6a995.appspot.com'
};
firebase.initializeApp(config);
var db = firebase.database();


function initApp() {
  // Listen for auth state changes.
  firebase.auth().onAuthStateChanged(function(user) {
    console.log('User state change detected from the Background script of the Chrome Extension:', user);
  });
}

window.onload = function() {
  initApp();
};
