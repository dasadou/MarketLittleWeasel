document.getElementById('start').addEventListener('click', function () {
	let keyword = document.getElementById('keyword').value; // Get keyword from input field
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: 'start', keyword: keyword});
	});
});

document.getElementById('stop').addEventListener('click', function () {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: 'stop'});
	});
});

document.getElementById('showAll').addEventListener('click', function () {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: 'showAll'});
	});
});

function openTab(tabId, elmnt) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablink");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].style.backgroundColor = "";
	}
	document.getElementById(tabId).style.display = "block";
	elmnt.style.backgroundColor = "#ccc";
}

document.getElementById('tab1-button').addEventListener('click', function () {
	openTab('tab1-content', this);
});

document.getElementById('tab2-button').addEventListener('click', function () {
	openTab('tab2-content', this);
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: 'getArticles'}, function (response) {
			let tab2Content = '';
			let articles = Object.values(response.articles);
			let sortedArticles = [...articles].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

			for (let i = 0; i < sortedArticles.length; i++) {
				const article = sortedArticles[i];
				tab2Content += `<div class="article">`;
				tab2Content += `<p><a href="${article.link}" target="_blank">${article.name}</a></p>`; // Append the article name to Tab 2 content
				tab2Content += `<p>Price: ${article.price} C$</p>`; // Append the article price to Tab 2 content // TODO: instead of C$, should get the actual currency
				// tab2Content += `<p><a href="${article.link}" target="_blank">Link</a></p>`; // Append the article link to Tab 2 content
				tab2Content += `</div>`;
			}

			document.getElementById('articles').innerHTML = tab2Content; // Set the content of Tab 2

		});
	});
});

document.getElementById('tab1-button').click();
