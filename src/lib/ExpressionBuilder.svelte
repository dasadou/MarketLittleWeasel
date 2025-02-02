<!-- src/components/ExpressionBuilder.svelte -->
<script lang="ts">
	import { expressionParts } from '../stores/keyStore.svelte';

	// Function to add an operator, input, or parenthesis
	export function addPart(type: 'input' | 'AND' | 'OR' | 'NOT' | 'parenthesis', value?: string) {
		if (type === 'input') {
			expressionParts.push({ type: 'input', value: '' });
		} else if (type === 'parenthesis') {
			expressionParts.push({ type: 'parenthesis', value: value || '(' });
		} else {
			expressionParts.push({ type: 'operator', value: type });
		}
	}

	// Function to remove a part
	export function removePart(index: number) {
		expressionParts.splice(index, 1); // Remove the part at the specified index
	}

	// Function to generate the final expression
	export function generateExpression(): string {
		return expressionParts
			.map((part) => {
				if (part.type === 'input') return `"${part.value}"`;
				if (part.type === 'parenthesis') return part.value;
				return part.value;
			})
			.join(' ');
	}
</script>

<!-- Dynamic Expression Builder -->
<div class="mb-2">
	<div class="mt-1 space-y-2">
		{#each expressionParts as part, index}
			<div class="flex items-center space-x-2">
				{#if part.type === 'input'}
					<input
						bind:value={part.value}
						type="text"
						placeholder="Enter keyword"
						class="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				{:else if part.type === 'parenthesis'}
					<span class="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md">{part.value}</span>
				{:else}
					<span class="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md">{part.value}</span>
				{/if}
				<button
					on:click={() => removePart(index)}
					class="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
				>
					Remove
				</button>
			</div>
		{/each}
	</div>
	<div class="mt-2 flex space-x-2">
		<button
			on:click={() => addPart('input')}
			class="px-3 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
			Add Keyword
		</button>
		<button
			on:click={() => addPart('AND')}
			class="px-3 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
		>
			AND
		</button>
		<button
			on:click={() => addPart('OR')}
			class="px-3 py-2 bg-yellow-500 text-white rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
		>
			OR
		</button>
		<button
			on:click={() => addPart('NOT')}
			class="px-3 py-2 bg-purple-500 text-white rounded-md shadow-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
		>
			NOT
		</button>
		<button
			on:click={() => addPart('parenthesis', '(')}
			class="px-3 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
		>
			(
		</button>
		<button
			on:click={() => addPart('parenthesis', ')')}
			class="px-3 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
		>
			)
		</button>
	</div>
</div>

<!-- Search Preview -->
<div class="mb-4">
	<p class="text-md font-medium text-gray-700 dark:text-gray-300">Search Preview:</p>
	<div class="mt-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
		<pre class="text-sm text-gray-900 dark:text-gray-200">{generateExpression()}</pre>
	</div>
</div>
