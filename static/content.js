const TABLE_ELEMENT =
	'.x8gbvx8.x78zum5.x1q0g3np.x1a02dak.x1nhvcw1.x1rdy4ex.xcud41i.x4vbgl9.x139jcc6';
const PRICE_ELEMENT =
	'.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x676frb.x1lkfr7t.x1lbecb7.x1s688f.xzsf02u';
const NAME_ELEMENT = '.x1lliihq.x6ikm8r.x10wlt62.x1n2onr6';

let table = document.querySelector(TABLE_ELEMENT);
let keyword; // Declare keyword variable
let articles = new Map(); // Use a Map to store articles
let timeoutId = null; // Initialize debounce variable

// Cache frequently used DOM elements
const cachedElements = {
	table: document.querySelector(TABLE_ELEMENT)
};

// Function to parse price and handle non-numerical values
function parsePrice(priceText) {
	const price = parseFloat(
		priceText
			.replace(/[^0-9.]/g, '')
			.replace(/(\.[0-9]*?)0+$/, '$1')
			.replace(/\.$/, '')
	);
	return isNaN(price) ? 0 : price;
}

// Function to extract article details and store them
function extractArticleDetails(childNode) {
	const grandChildNode = childNode.querySelector(NAME_ELEMENT); // Where the name is located
	if (!grandChildNode) return;

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

// Function to tokenize the input
function tokenize(expression) {
	const regex = /(\bAND\b|\bOR\b|\bNOT\b|\(|\)|"[^"]+"|\S+)/gi;
	return [...expression.matchAll(regex)].map((match) => match[0].trim());
}

// Function to parse tokens into an AST
function parse(tokens) {
	let index = 0;

	function parseExpression() {
		let left = parseTerm();

		while (index < tokens.length && (tokens[index] === 'AND' || tokens[index] === 'OR')) {
			const operator = tokens[index++];
			const right = parseTerm();
			left = { type: operator, left, right };
		}

		return left;
	}

	function parseTerm() {
		if (tokens[index] === '(') {
			index++;
			const expression = parseExpression();
			if (tokens[index++] !== ')') throw new Error('Expected closing parenthesis');
			return expression;
		} else if (tokens[index] === 'NOT') {
			index++;
			return { type: 'NOT', value: parseTerm() };
		} else {
			return { type: 'KEYWORD', value: tokens[index++].replace(/"/g, '') };
		}
	}

	return parseExpression();
}

// Function to evaluate the AST against text
function evaluateAST(ast, text) {
	text = text.toLowerCase();

	switch (ast.type) {
		case 'AND':
			return evaluateAST(ast.left, text) && evaluateAST(ast.right, text);
		case 'OR':
			return evaluateAST(ast.left, text) || evaluateAST(ast.right, text);
		case 'NOT':
			return !evaluateAST(ast.value, text);
		case 'KEYWORD':
			// Use word boundaries to ensure exact matching
			return new RegExp(`\\b${ast.value.toLowerCase()}\\b`).test(text);
		default:
			throw new Error(`Unknown AST node type: ${ast.type}`);
	}
}

// Function to evaluate a boolean expression
function evaluateBooleanExpression(text, expression) {
	try {
		const tokens = tokenize(expression);
		const ast = parse(tokens);
		return evaluateAST(ast, text);
	} catch (error) {
		console.error('Error evaluating boolean expression:', error);
		return false;
	}
}

// Function to hide articles that do not match the keyword
function hideArticles(startIndex) {
	const children = cachedElements.table?.children;
	if (!children) return;

	for (let i = startIndex; i < children.length; i++) {
		const childNode = children[i];
		extractArticleDetails(childNode); // Extract article details

		if (!evaluateBooleanExpression(childNode.textContent, keyword)) {
			childNode.style.display = 'none'; // Hide the child node
		} else {
			childNode.style.display = ''; // Ensure matching articles are visible
		}
	}
}

// Function to show all articles
function showAllArticles() {
	const children = cachedElements.table?.children;
	if (!children) return;

	for (let i = 0; i < children.length; i++) {
		children[i].style.display = ''; // Unhide the child node
	}
	articles.clear();
}

// Function to handle message responses
function handleMessage(request, sender, sendResponse) {
	console.log(`Received message: ${JSON.stringify(request)}`); // Debug log

	switch (request.message) {
		case 'start':
			keyword = request.keyword;
			console.log(`Starting observation with keyword: ${keyword}`); // Debug log
			hideArticles(0); // Initial hiding of articles
			observer.observe(cachedElements.table, { childList: true }); // Start observing
			break;
		case 'stop':
			console.log('Stopping observation'); // Debug log
			observer.disconnect(); // Stop observing
			sendResponse({ articles: Array.from(articles.values()) }); // Send articles as response
			break;
		case 'revert':
			console.log('Reverting changes'); // Debug log
			showAllArticles(); // Show all hidden items
			break;
		case 'getArticles':
			console.log('Fetching articles'); // Debug log
			sendResponse({ articles: Array.from(articles.values()) });
			break;
	}
}

// Debounced function to handle mutations
const debouncedHideArticles = (() => {
	const DEBOUNCE_DELAY = 10; // Adjust debounce delay as needed
	return (startIndex) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => hideArticles(startIndex), DEBOUNCE_DELAY);
	};
})();

// Callback function to execute when mutations are observed
const observerCallback = (mutationsList) => {
	console.log(`Mutation observed: ${mutationsList.length} changes`); // Debug log
	for (const mutation of mutationsList) {
		if (mutation.type === 'childList') {
			debouncedHideArticles(mutation.addedNodes.length);
		}
	}
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(observerCallback);

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(handleMessage);
