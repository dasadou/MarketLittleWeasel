<script>
	import { theme } from '../stores/theme';
	let keyword = 'Just do it';
  
	async function startObserving() {
	  console.log(keyword);
	  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
	  const activeTab = tabs[0];
	  chrome.tabs.sendMessage(activeTab.id || 0, { message: 'start', keyword: keyword });
	}
  
	async function stopObserving() {
	  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
	  const activeTab = tabs[0];
	  chrome.tabs.sendMessage(activeTab.id || 0, { message: 'stop' });
	}
  
	async function revert() {
	  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
	  const activeTab = tabs[0];
	  chrome.tabs.sendMessage(activeTab.id || 0, { message: 'revert' });
	}
  </script>
  
  <body class="bg-gray-100 dark:bg-gray-900 p-4">
	<div id="tab1-content" class="tabcontent">
	  <h1 class="text-3xl font-bold underline text-gray-800 dark:text-gray-200">Hello les peoples</h1>
	  <div class="flex items-center space-x-2 mt-4">
		<label for="keyword" class="text-lg font-medium text-gray-700 dark:text-gray-300">Keyword:</label>
		<input bind:value={keyword} type="text" id="keyword" placeholder="Enter your keyword" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
	  </div>
	  <div class="mt-4 flex space-x-2">
		<button on:click={startObserving} class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Start observing</button>
		<button on:click={stopObserving} class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Stop Observing</button>
		<button on:click={revert} class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Revert</button>
	  </div>
	</div>
  </body>
  