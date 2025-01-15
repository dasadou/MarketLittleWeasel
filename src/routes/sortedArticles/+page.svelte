<script>
    import { onMount } from 'svelte';
    import '../../app.css';
    let articles = [];
    let sortedArticles = [];

    async function getArticles() {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        const activeTab = tabs[0];

        return new Promise((resolve) => {
            chrome.tabs.sendMessage(activeTab.id || 0, { message: 'getArticles' }, (response) => {
                resolve(response);
            });
        });
    }

    // Use onMount to fetch articles when the component is mounted
    onMount(async () => {
        try {
            const response = await getArticles();
            if (response) {
                articles = Object.values(response.articles);
                // Sort articles by price in ascending order
                sortedArticles = [...articles].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                console.log(sortedArticles);
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    });
</script>

<main class="max-w-7xl mx-auto sm:px-6 lg:px-8">
  <div id="articles" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 overflow-y-auto max-h-screen">
      {#each sortedArticles as article}
          <div class="article bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg">
              <p class="text-lg font-semibold text-gray-900 dark:text-white">
                  <a href={article.link} target="_blank" class="hover:underline">{article.name}</a>
              </p>
              <p class="mt-2 text-gray-600 dark:text-gray-300">Price: {article.price} C$</p>
          </div>
      {/each}
  </div>
</main>