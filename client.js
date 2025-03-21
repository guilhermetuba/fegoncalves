window.onload = function() {
  gapi.load('client:auth2', function() {
    initClient();
  });
};
