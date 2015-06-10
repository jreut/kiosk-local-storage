window.onload = function() {
  var refreshView = function() {
    /* get all the objects with `null` */
    chrome.storage.local.get(null, function(items) {
      contents.textContent = JSON.stringify(items);
    });    
  };

  var storageCallback = function() {
    if (chrome.runtime.lastError) {
      console.log('Error: ' + chrome.runtime.lastError);
    } else {
      refreshView();
    }
  };

  var contents = document.querySelector('#contents');
  var form = document.querySelector('form');
  var key = form.querySelector('input[name=key]');
  var value = form.querySelector('input[name=value]');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var obj = {};
    obj[key.value] = value.value;
    chrome.storage.local.set(obj, storageCallback);
  });
  
  form.addEventListener('reset', function(e) {
    e.preventDefault();
    chrome.storage.local.clear(storageCallback);
  });
  
  refreshView();
};
