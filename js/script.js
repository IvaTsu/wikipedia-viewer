
$(document).ready(function() {
  var searchBtn = document.getElementById('search-btn');
  searchBtn.addEventListener('click', createRequest, false);
});

function createRequest() {
  var httpRequest;
  var request = getSearchValue();
  if (!request) {
    $(".content").append('<div class="block">' +
      "<h1>" + "Sorry, there is nothing to show" + "</h1>" +
      '</div>');
  } else {
    var numberOfPages = getNumberOfPages();
    if (numberOfPages > 0) {
      httpRequest = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + request + "&limit=" + numberOfPages + "&callback=?";
    } else {
      httpRequest = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + request + "&limit=10&callback=?";
    }
    $.getJSON(httpRequest, function(json) {
      formContent(json);
    });
  }
}

function formContent(json) {
  var objNames = formRequest(1, json);
  var objDescriptions = formRequest(2, json);
  var objLink = formRequest(3, json);
  for (var i = 0; i < objNames.length; i++) {
    addBlock(objNames[i], objDescriptions[i], objLink[i]);
  }
}

function addBlock(heading, content, link) {
  $(".content").append('<div class="block" onclick=window.open("' + link + '")>' +
    "<h1>" + heading +"</h1>" +
    "<p>" + content +"</p>" +
    '</div>');
}

function formRequest(objTypeNumber, json) {
  $(".content").empty();
  var objName = [];
  for (var j = 0; j < json[objTypeNumber].length; j++) {
    objName[j] = json[objTypeNumber][j];
  }
  return objName;
}

function getNumberOfPages() {
  return document.getElementById('number').value;
}

function getSearchValue() {
  return document.getElementById('search-value').value;
}
