<script>
	export let type;
	export let value;
	export let onUpdate;
	export let index;

	function handleInput(event) {
		onUpdate(index, event.target.value);
	}
</script>

{#if type === 'keyword'}
	<input
		bind:value
		type="text"
		placeholder="Enter your keyword"
		on:input={handleInput}
		class="inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
	/>
{:else}
	<span
		class="inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md text-sm font-medium leading-4 bg-blue-500 text-white"
	>
		{value}
	</span>
{/if}
