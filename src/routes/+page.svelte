<script lang="ts">
	import { expressionParts } from '../stores/keyStore.svelte';
	import ExpressionBuilder from '$lib/ExpressionBuilder.svelte';

	let debugLogs: string[] = []; // Array to store debug logs
	let expressionBuilder: ExpressionBuilder;

	// Function to log debug messages
	function logDebug(message: string) {
		const timestamp = new Date().toISOString();
		const logEntry = `[DEBUG] ${timestamp}: ${message}`;
		debugLogs.push(logEntry);
		console.log(logEntry); // Also log to the console for easier debugging
	}

	// Helper function to send messages to the active tab
	async function sendMessageToActiveTab(message: { message: string; keyword?: string }) {
		const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
		const activeTab = tabs[0];

		if (!activeTab?.id) {
			logDebug('No active tab found.');
			return null;
		}

		return new Promise((resolve) => {
			chrome.tabs.sendMessage(activeTab.id, message, (response) => {
				if (chrome.runtime.lastError) {
					logDebug(`Error sending message: ${chrome.runtime.lastError.message}`);
					resolve(null);
				} else {
					logDebug(`Received response: ${JSON.stringify(response)}`);
					resolve(response);
				}
			});
		});
	}

	// Function to start observing
	async function startObserving() {
		const expression = expressionBuilder.generateExpression();
		logDebug(`Generated expression: ${expression}`);

		await sendMessageToActiveTab({ message: 'start', keyword: expression });
	}

	// Function to stop observing
	async function stopObserving() {
		await sendMessageToActiveTab({ message: 'stop' });
	}

	// Function to revert changes
	async function revert() {
		await sendMessageToActiveTab({ message: 'revert' });
	}
</script>

<h1 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Hello les peoples</h1>

<!-- Use the ExpressionBuilder component -->
<ExpressionBuilder bind:this={expressionBuilder} />

<!-- Start, Stop, Revert Buttons -->
<div class="flex space-x-2 mb-4">
	<button
		on:click={startObserving}
		class="flex-grow px-3 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
	>
		Start Observing
	</button>
	<button
		on:click={stopObserving}
		class="flex-grow px-3 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
	>
		Stop Observing
	</button>
	<button
		on:click={revert}
		class="flex-grow px-3 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
	>
		Revert
	</button>
</div>

<!-- Debug Logs -->
<div class="mt-4">
	<h2 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Debug Logs</h2>
	<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
		{#each debugLogs as log}
			<pre class="text-sm text-gray-900 dark:text-gray-200">{log}</pre>
		{/each}
	</div>
</div>
