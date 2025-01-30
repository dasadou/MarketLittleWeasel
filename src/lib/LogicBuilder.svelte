<script>
	import { conditions } from '../stores/keyStore.svelte.js';
	import ConditionElement from './ConditionElement.svelte';

	function addCondition(type) {
		const newCondition = { type, value: type === 'keyword' ? { word: '' } : { word: type } };
		conditions.push(newCondition);
	}

	function updateCondition(index, value) {
		conditions[index].value.word = value;
	}

	function deleteCondition(index) {
		conditions.splice(index, 1);
	}

	// Handle drag and drop logic
	let dragSrcIndex = null;

	function handleDragStart(index) {
		dragSrcIndex = index;
	}

	function handleDrop(event, index) {
		event.preventDefault();
		if (dragSrcIndex !== null) {
			const [reordered] = conditions.splice(dragSrcIndex, 1);
			conditions.splice(index, 0, reordered);
			dragSrcIndex = null;
		}
	}

	function handleDragOver(event) {
		event.preventDefault();
	}
</script>

<div class="mb-4">
	<div class="flex flex-wrap items-center space-x-2">
		{#each conditions as condition, index (condition)}
			<div
				class="condition-container"
				draggable="true"
				role="listitem"
				aria-roledescription="draggable"
				on:dragstart={() => handleDragStart(index)}
				on:dragover={handleDragOver}
				on:drop={(event) => handleDrop(event, index)}
			>
				<ConditionElement
					type={condition.type}
					value={condition.value.word}
					{index}
					onUpdate={updateCondition}
				/>
				<button class="delete-button" on:click={() => deleteCondition(index)}>&times;</button>
			</div>
		{/each}
	</div>
</div>

<div class="flex space-x-2 mb-2">
	<button
		on:click={() => addCondition('AND')}
		class="button"
		style="background-color: #3b82f6; color: #ffffff"
	>
		AND
	</button>
	<button
		on:click={() => addCondition('OR')}
		class="button"
		style="background-color: #10b981; color: #ffffff"
	>
		OR
	</button>
	<button
		on:click={() => addCondition('(')}
		class="button"
		style="background-color: #f59e0b; color: #ffffff"
	>
		(
	</button>
	<button
		on:click={() => addCondition(')')}
		class="button"
		style="background-color: #f59e0b; color: #ffffff"
	>
		)
	</button>
	<button
		on:click={() => addCondition('keyword')}
		class="button"
		style="background-color: #8b5cf6; color: #ffffff"
	>
		Add Input
	</button>
</div>

<style>
	.condition-container {
		position: relative;
		display: flex;
		align-items: center;
		margin-bottom: 0.5rem; /* mb-2 */
		padding: 0.25rem;
		cursor: move;
		border: none; /* Remove outline */
		border-radius: 0.375rem; /* rounded-md */
		background-color: transparent; /* No background color */
	}

	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem 1rem;
		border: 1px solid transparent;
		border-radius: 0.375rem; /* rounded-md */
		font-size: 0.875rem; /* text-sm */
		font-weight: 500; /* font-medium */
		line-height: 1.25rem; /* leading-4 */
		text-decoration: none;
		transition: background-color 0.2s ease;
	}

	.button:hover {
		background-color: #2563eb; /* blue-600 */
	}

	.delete-button {
		position: absolute;
		top: 0.25rem; /* Adjust as needed */
		right: 0.25rem; /* Adjust as needed */
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1rem; /* Ensure the button is square */
		height: 1rem; /* Ensure the button is square */
		border: none; /* Remove outline */
		background-color: #ef4444; /* red-500 */
		color: #ffffff;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	.delete-button:hover {
		background-color: #dc2626; /* red-600 */
	}
</style>
