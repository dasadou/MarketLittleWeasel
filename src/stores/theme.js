import { writable } from 'svelte/store';

let initialTheme = 'light';
if (typeof localStorage !== 'undefined') {
  initialTheme = localStorage.getItem('theme') || 'light';
}

export const theme = writable(initialTheme);

export function toggleTheme() {
  theme.update(current => {
    const newTheme = current === 'light' ? 'dark' : 'light';
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
    return newTheme;
  });
}
