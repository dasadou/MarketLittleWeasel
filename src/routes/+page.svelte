<script>
	let keyword = 'Just do it';
	async function startObserving() {
		console.log(keyword);
		// get the active tab
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


<body>
	<div id="tab1-content" class="tabcontent">
		<h1 class="text-3xl font-bold underline">Hello les peoples</h1>
		<label for="keyword">Keyword:</label>
		<input bind:value={keyword} type="text" id="keyword" placeholder="Enter your keyword" />
		<button on:click={startObserving}> Start observing </button>
		<button on:click={stopObserving}>Stop Observing</button>
		<button on:click={revert}>Show All</button>
	</div>
</body>

<style>
	body {
		width: 300px;
		height: 600px;
		margin: 0 auto;
		font-family: Arial, sans-serif;
		background-color: #f0f0f0;
		box-sizing: border-box;
		padding: 20px;
	}

	button {
		background-color: #f0f0f0;
		color: black;
		font-family: Georgia, 'Times New Roman', Times, serif;
	}
</style>
