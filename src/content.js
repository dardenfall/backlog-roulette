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

chrome.runtime.onMessage.addListener(function (){

  getOptions().then(function(options){
    var scriptElements = document.querySelectorAll('script')

    var rgElement;
    var matcher = /var rgGames.+[}\];]/;

    //find and execute/create the 'rgGames' array used by steamcommunity.com
    //This holds app id information along with usage stats for all games a user
    //owns.  If steam changes this, it's a breaking change
    for(var i=0; i < scriptElements.length; i++){
      var results = scriptElements[i].textContent.match(matcher);

      if(results){
        eval(results[0]);
        break;
      }
    }

    var filtered = rgGames;
    if(options['unplayedOnly']){
        filtered = filtered.filter(function(item){
            return typeof item.last_played === 'undefined';
        });
    }

    var backlogGame = filtered[ Math.floor(Math.random() * filtered.length)];

    var openGame = confirm("start " + backlogGame.name+ "?");

    if(openGame){
      window.open('steam://run/'+backlogGame.appid);
    }
  })
})
