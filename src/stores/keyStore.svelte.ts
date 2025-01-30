// src/stores/keyStore.svelte.ts
type ExpressionPart = { type: 'input' | 'operator' | 'parenthesis'; value: string };

export const expressionParts = $state<ExpressionPart[]>([
	{ type: 'parenthesis', value: '(' }, // Open parenthesis
	{ type: 'input', value: 'DDR4' }, // Default keyword
	{ type: 'operator', value: 'AND' }, // Default operator
	{ type: 'input', value: '32' }, // Default keyword
	{ type: 'parenthesis', value: ')' } // Close parenthesis
]);
