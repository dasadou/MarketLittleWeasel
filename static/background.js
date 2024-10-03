console.log("in the console BBB")
// const {TABLE_ELEMENT} = require('../src/constants')

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("I GOOOTT ITT BBB");
    if (request.action === "addText") {
      const text = document.createElement('div');
      text.textContent = 'Hello, World!';
      text.style.position = 'fixed';
      text.style.top = '10px';
      text.style.left = '10px';
      text.style.backgroundColor = 'red';
      text.style.padding = '5px';
      document.body.appendChild(text);
      sendResponse({ status: "Text added BBB" });
    }
  });

//   chrome.action.onClicked.addListener((tab) => {
// 	console.log("I Clickewd ITT CCCC");

	// chrome.scripting.executeScript({
	//   target: { tabId: tab.id },
	//   files: ['content.js']
	// }, () => {
	//   chrome.tabs.sendMessage(tab.id, { action: "addText" }, (response) => {
	// 	console.log(response);
	//   });
	// });
//   });
  