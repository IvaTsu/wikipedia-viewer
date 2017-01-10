
$(document).ready(function() {
  var searchBtn = document.getElementById('search-btn');
  searchBtn.addEventListener('click', createRequest, false);
});

function createRequest() {
  var request = getSearchValue();
  console.log(request);

  var httpRequest = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + request +"&limit=500&callback=?";

  $.getJSON(httpRequest, function(json) {
    $(".message").html(JSON.stringify(json));
  });
  
}

function getSearchValue() {
  return document.getElementById('search-value').value;
}
