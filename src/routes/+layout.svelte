<script>
	import '../app.css';
	import { theme, toggleTheme } from '../stores/theme';
	import { onMount } from 'svelte';
  
	/**
	 * @type {string}
	 */
	let currentTheme;
  
	onMount(() => {
		currentTheme = localStorage.getItem('theme') || 'light';
		console.log("retrieved theme: " + currentTheme);
		
	  theme.subscribe(value => {
		console.log("its "+value);
		currentTheme = value;
		console.log("Setting to " + currentTheme);
		document.documentElement.classList.toggle('dark', currentTheme === 'dark');
		console.log("Set to " + currentTheme);
		localStorage.setItem('theme', currentTheme);
	  });
	});
  </script>
  
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
	<nav class="bg-white dark:bg-gray-800 shadow-md">
	  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
		<div class="flex space-x-4">
		  <a href="/" class="text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-medium">Filter</a>
		  <a href="/sortedArticles" class="text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-medium">Sorted Articles</a>
		</div>
		<button on:click={toggleTheme} aria-label="Toggle Theme" class="flex items-center text-gray-900 dark:text-white">
		  {#if currentTheme === 'light'}
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 mr-2">
			  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
			</svg>
			Light Mode
		  {:else}
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 mr-2">
			  <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
			</svg>
			Dark Mode
		  {/if}
		</button>
	  </div>
	</nav>
	<main class="max-w-7xl mx-2.5 sm:px-6 lg:px-8 ma">
	  <slot></slot>
	</main>
  </div>