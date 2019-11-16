
function WebsiteItem(url, tabIDs, oTime) {
    this.website = getWebsiteFromUrl(url);
    this.tabIDs = tabIDs
    this.oTime = oTime;
    this.totalTime = 0;
}

WebsiteItem.prototype.getWebsiteFromUrl = function(url) {
  var url = tabDetails.url;
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

WebsiteItem.prototype.hasID = function(tabID) {
  if(tabIDs.includes(tabID)) {
    return true;
  }
  return false;
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
