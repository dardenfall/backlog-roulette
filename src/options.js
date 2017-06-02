var srOptions = {
  profileUrl: '',
  unplayedOnly: true
}

document.getElementById('whats-this-button').addEventListener('click', function(){
  window.open('help.html',window, {toolbar:'no',
                                  location:'no',
                                  status:'no',
                                  menubar:'no',
                                  scrollbars:'yes',
                                  resizable:'yes',
                                  width:100,
                                  height:50});
})
function validate(){

  var profileUrl = srOptions.profileUrl = document.getElementById('profile-url').value;

  if(profileUrl === ''){
    status.textContent = 'please input your steamcommunity url';
    return false;
  }

  return true;
}

// Saves options to chrome.storage
function save_options() {

  if(!validate()){
    return;
  }

  //update this for each new option
  srOptions.profileUrl = document.getElementById('profile-url').value;
  srOptions.unplayedOnly = document.getElementById('unplayed-only').checked;

  chrome.storage.local.set({
      options: srOptions
  },
  function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
  });

}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {

  chrome.storage.local.get({
    options: srOptions,
  }, function(storage) {

    //update this for each new option
    document.getElementById('profile-url').value = storage.options.profileUrl ?
    storage.options.profileUrl : "http://steamcommunity.com/id/<YOUR ID HERE>";
    document.getElementById('unplayed-only').checked = storage.options.unplayedOnly;

    srOptions = storage.options;
  });

}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
