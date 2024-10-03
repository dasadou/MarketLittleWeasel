import { writable } from 'svelte/store';

export const theme = writable('light');

export function toggleTheme() {
  theme.update(current => (current === 'light' ? 'dark' : 'light'));
}
