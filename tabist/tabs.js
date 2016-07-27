var body = document.getElementById("body");
var currentWindow = null;
var ul = null;

function clickHandler(){
  chrome.tabs.update(this.tabId, {active:true}); 
  chrome.windows.update(this.windowId, {focused: true});
}

//loop through the tabs and group them by windows for display
chrome.tabs.query({}, function(tabs){
  //display a nice sequential number on the tab.
  var windowDisplayNum = 1;
  for(var i = 0, len = tabs.length; i < len; i++){
    var li = document.createElement("li");
    var link = document.createElement("a");

    var isNewWindow = !(currentWindow === tabs[i].windowId);
    if(isNewWindow){
      //insert a new window header and change the ul
      currentWindow = tabs[i].windowId;

      ul = document.createElement("ul")

      var windowTitle = document.createElement("h2");
      windowTitle.innerText = "Window " + windowDisplayNum++;

      body.appendChild(windowTitle);
      body.appendChild(ul)
  }

    link.href = "#"; 
    link.onclick = clickHandler;
    link.tabId = tabs[i].id;
    link.windowId = tabs[i].windowId;

    var text = tabs[i].title || tabs[i].url;
    var audibleText = tabs[i].audible ? "(Audible) " : "";
    link.innerText = audibleText + text;


    li.appendChild(link)
    ul.appendChild(li);
}
}); 

// where to go to possibly fix the tab title bug when there are tabs that have been unloaded
// http://searchfox.org/mozilla-central/source/browser/components/extensions/ext-utils.js#386
