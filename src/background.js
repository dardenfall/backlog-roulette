//retrieve extension options, where the result passed to the resolution
//is a variable whose members are the option names
var getOptions = function(option){

    var returnPromise = new Promise(
        function(resolve, reject){
          chrome.storage.local.get('options',
          function(storage) {
            if(!storage.options){
                storage.options = {};
            }
            resolve(storage.options);
          });
        }
    );

    return returnPromise;
}

var state = "notclicked";

//Listen for a click of the extension button
chrome.browserAction.onClicked.addListener(function(){
  getOptions().then(function(options){
    var profileUrl = options['profileUrl'];
    var unplayedOnly = options['unplayedOnly'];
    if(!profileUrl){
      alert("Please set steam url for the roulette (rt click->options)")
      return;
    }
    state = "clicked";
    chrome.tabs.update(undefined,
      {url:profileUrl + "/games/?tab=all",
      active:true}
    )
  })
})

//Add a listener to the users profile page or a
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(state !== "clicked"){
    return;
  }

  getOptions().then(function(options){
    var profileUrl = options['profileUrl'];
    //if the user hasn't set up their prefs, don't do anything
    if(!profileUrl){
      return;
    }

    var page = profileUrl + "/games/?tab=all";

    // make sure the status is 'complete' and it's the right tab
    if (changeInfo.status == 'complete' && tab.url === page) {
      chrome.tabs.sendMessage(tabId, {foo:"bar"})
      state = "notclicked";
    }
  })

});
