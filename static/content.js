const TABLE_ELEMENT = ".x8gbvx8.x78zum5.x1q0g3np.x1a02dak.x1nhvcw1.x1rdy4ex.xcud41i.x4vbgl9.x139jcc6";
const PRICE_ELEMENT = ".x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x676frb.x1lkfr7t.x1lbecb7.x1s688f.xzsf02u";

let table = document.querySelector(TABLE_ELEMENT);
let keyword; // Declare keyword variable
let articles = new Map(); // Use a Map to store articles
let timeoutId = null; // Initialize debounce variable

// Function to parse price and handle non-numerical values
function parsePrice(priceText) {
  let price = parseFloat(priceText.replace(/[^0-9\.]/g, "").replace(/(\.[0-9]*?)0+$/, "$1").replace(/\.$/, ""));
  return isNaN(price) ? 0 : price;
}

// Function to extract article details and store them
function extractArticleDetails(childNode) {
  const grandChildNode = childNode.querySelector(".x1lliihq.x6ikm8r.x10wlt62.x1n2onr6"); // Where the name is located
  if (grandChildNode) {
    const articleName = grandChildNode.textContent; // The name of the article
    const priceElement = childNode.querySelector(PRICE_ELEMENT);
    const linkElement = childNode.querySelector("[role='link']");

    if (priceElement && linkElement) {
      const priceText = priceElement.textContent.trim();
      const price = parsePrice(priceText);
      const link = linkElement.href;
      articles.set(link, { name: articleName, price: price, link: link }); // Save the article
    }
  }
}

// Function to hide articles that do not match the keyword
function hideArticles(startIndex) {
  const children = table.children;
  const keywordRegex = new RegExp(keyword, "i"); // Compile regular expression outside of loop

  for (let i = startIndex; i < children.length; i++) {
    const childNode = children[i];
    extractArticleDetails(childNode); // Extract article details

    if (!keywordRegex.test(childNode.textContent)) { // If the article name does not contain the keyword
      childNode.style.display = "none"; // Hide the child node
    }
  }
}

// Function to show all articles
function showAllArticles() {
  const children = table.children;
  for (let i = 0; i < children.length; i++) {
    children[i].style.display = ""; // Unhide the child node
  }
  articles.clear();
}

// Function to handle message responses
function handleMessage(request, sender, sendResponse) {
  switch (request.message) {
    case 'start':
      keyword = request.keyword;
      hideArticles(0); // Initial hiding of articles
      observer.observe(table, { childList: true }); // Start observing
      break;
    case 'stop':
      observer.disconnect(); // Stop observing
      sendResponse({ articles: Array.from(articles.values()) }); // Send articles as response
      break;
    case 'revert':
      showAllArticles(); // Show all hidden items
      break;
    case 'getArticles':
      sendResponse({ articles: Array.from(articles.values()) });
      break;
  }
}

// Callback function to execute when mutations are observed
const observerCallback = function (mutationsList) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // Debounce hideArticles function
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => hideArticles(mutation.addedNodes.length), 10); // Hide new articles
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(observerCallback);

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(handleMessage);
