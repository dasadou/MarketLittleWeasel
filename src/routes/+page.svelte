<script>
    import LogicBuilder from "$lib/LogicBuilder.svelte";
    import {conditions} from "../stores/keyStore.svelte.js";

    async function startObserving() {
        const tabs = await chrome.tabs.query({active: true, currentWindow: true});
        const activeTab = tabs[0];
        // console.log(conditions.map(cond => cond.value.word).join(' '));
        console.log(conditions);
        chrome.tabs.sendMessage(activeTab.id || 0, {
            message: 'start',
            conditions: conditions
        });
    }

    async function stopObserving() {
        const tabs = await chrome.tabs.query({active: true, currentWindow: true});
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id || 0, {message: 'stop'});
    }

    async function revert() {
        const tabs = await chrome.tabs.query({active: true, currentWindow: true});
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id || 0, {message: 'revert'});
    }
</script>

<LogicBuilder/>

<div class="flex space-x-2">
    <button on:click={startObserving}
            class="flex-grow px-3 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Start Observing
    </button>
    <button on:click={stopObserving}
            class="flex-grow px-3 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
        Stop Observing
    </button>
    <button on:click={revert}
            class="flex-grow px-3 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
        Revert
    </button>
</div>

<!-- Add help section then add special characters like && || () or even use NLP to search in a better way
Example (DDR 4) && ((2x16 GB) || (2 x 16))  etc etc.
-->
