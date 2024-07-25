const keyword = "yourKeyword"; // Replace "yourKeyword" with your actual keyword
const table = document.querySelector(".x8gbvx8.x78zum5.x1q0g3np.x1a02dak.x1nhvcw1.x1rdy4ex.xcud41i.x4vbgl9.x139jcc6");

function hideArticles(startIndex) {
	const children = table.children;
	for (let i = startIndex; i < children.length; i++) {
		const childNode = children[i];
		const grandChildNode = childNode.querySelector(".x1lliihq.x6ikm8r.x10wlt62.x1n2onr6"); // Where the name is located
		if (grandChildNode) { // Check if grandChildNode is not null
			const articleName = grandChildNode.textContent; // The name of the article
			if (!new RegExp(keyword, "i").test(articleName)) { // If the article name does not contain the keyword
				childNode.style.display = "none"; // Hide the child node
			}
		}
	}
}

// Initial hiding of articles
hideArticles(0);

// Options for the observer (which mutations to observe)
const config = {childList: true};

let timeoutId = null;
// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
	for (let mutation of mutationsList) {
		if (mutation.type === 'childList') {
			// Debounce hideArticles function
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => hideArticles(mutation.addedNodes.length), 100); // Hide new articles
		}
	}
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(table, config);
