console.log("in the console CCC");
const TABLE_ELEMENT = ".x8gbvx8.x78zum5.x1q0g3np.x1a02dak.x1nhvcw1.x1rdy4ex.xcud41i.x4vbgl9.x139jcc6";
const PRICE_ELEMENT = ".x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x676frb.x1lkfr7t.x1lbecb7.x1s688f.xzsf02u";
let table = document.querySelector(TABLE_ELEMENT);
let keyword; // Declare keyword variable
let articles = new Map(); // Use a Map to store articles
// Create an observer instance linked to the callback function
// Options for the observer (which mutations to observe)
const config = { childList: true };
// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // Debounce hideArticles function
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => hideArticles(mutation.addedNodes.length), 10); // Hide new articles
    }
  }
};
const observer = new MutationObserver(callback);

let timeoutId = null;
function hideArticles(startIndex) {
  const children = table.children;
  const keywordRegex = new RegExp(keyword, "i"); // Compile regular expression outside of loop

  for (let i = startIndex; i < children.length; i++) {
    const childNode = children[i];
    const grandChildNode = childNode.querySelector(".x1lliihq.x6ikm8r.x10wlt62.x1n2onr6"); // Where the name is located

    if (grandChildNode) { // Check if grandChildNode is not null
      const articleName = grandChildNode.textContent; // The name of the article

      if (!keywordRegex.test(articleName)) { // If the article name does not contain the keyword
        childNode.style.display = "none"; // Hide the child node
      } else {
        const priceElement = childNode.querySelector(PRICE_ELEMENT);
        const linkElement = childNode.querySelector("[role='link']");

        if (priceElement && linkElement) {
          const priceText = priceElement.textContent;
          const price = parseFloat(priceText.replace(/[^0-9\.]/g, "").replace(/(\.[0-9]*?)0+$/, "$1").replace(/\.$/, ""));
          const link = linkElement.href; // Changed this line
          articles.set(link, { name: articleName, price: price, link: link }); // Save the article
        }
      }
    }
  }
}

function showAll() {
  const children = table.children;
  for (let i = 0; i < children.length; i++) {
    const childNode = children[i];
    childNode.style.display = ""; // Unhide the child node
  }
  articles.clear();
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'start') {
    keyword = request.keyword;
    hideArticles(0); // Initial hiding of articles
    observer.observe(table, config); // Start observing
  } else if (request.message === 'stop') {
    observer.disconnect(); // Stop observing
    sendResponse({ articles: Array.from(articles.values()) }); // Send articles as response
  } else if (request.message === 'revert') {
    showAll(); // Show all hidden items
  } else if (request.message === 'getArticles') {
    sendResponse({ articles: Array.from(articles.values()) });
  }
});