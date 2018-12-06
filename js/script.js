$(document).ready(() => {
	const searchBtn = document.getElementById('search-btn');
	searchBtn.addEventListener('click', createRequest, false);
	onEnterTap($('#search-value'));
	onEnterTap($('#number'));
});

function createRequest() {
	$('header').addClass('hide');
	let httpRequest;
	const request = getSearchValue();
	if (!request) {
		$('.content').append(
			'<div class="block">' +
				"<h1 class='block-header'>" +
				'Sorry, there is nothing to show' +
				'</h1>' +
				'</div>'
		);
	} else {
		const numberOfPages = getNumberOfPages();
		if (numberOfPages > 0) {
			httpRequest = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${request}&limit=${numberOfPages}&callback=?`;
		} else {
			httpRequest = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${request}&limit=10&callback=?`;
		}
		$.getJSON(httpRequest, json => {
			formContent(json);
		});
	}
}

function formContent(json) {
	const objNames = formRequest(1, json);
	const objDescriptions = formRequest(2, json);
	const objLink = formRequest(3, json);
	for (let i = 0; i < objNames.length; i++) {
		addBlock(objNames[i], objDescriptions[i], objLink[i]);
	}
}

function addBlock(heading, content, link) {
	$('.content').append(
		`<div class="block" onclick=window.open("${link}")>` +
			`<h1 class='block-header'>${heading}</h1>` +
			`<p class='block-content'>${content}</p>` +
			`</div>`
	);
}

function formRequest(objTypeNumber, json) {
	$('.content').empty();
	const objName = [];
	for (let j = 0; j < json[objTypeNumber].length; j++) {
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

function onEnterTap(field) {
	field.keyup(event => {
		if (event.keyCode == 13) {
			$('#img-search').click();
		}
	});
}
