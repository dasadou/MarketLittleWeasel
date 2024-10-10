<script>
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
	  chrome.tabs.sendMessage(activeTab.id || 0, { message: 'showAll' });
	}
  </script>
  
  <body class=" dark:bg-gray-900  duration-300">
	  <h1 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Hello les peoples</h1>
	  <div class="mb-2">
		<label for="keyword" class="text-md font-medium text-gray-700 dark:text-gray-300">Keyword:</label>
		<input bind:value={keyword} type="text" id="keyword" placeholder="Enter your keyword" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
	  </div>
	  <div class="flex space-x-2">
		<button on:click={startObserving} class="flex-grow px-3 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Start Observing</button>
		<button on:click={stopObserving} class="flex-grow px-3 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Stop Observing</button>
		<button on:click={revert} class="flex-grow px-3 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">Revert</button>
	  </div>
  </body>
  
  <!-- Add help section then add special characters like && || () or even use NLP to search in a better way
 Example (DDR 4) && ((2x16 GB) || (2 x 16))  etc etc.
  -->