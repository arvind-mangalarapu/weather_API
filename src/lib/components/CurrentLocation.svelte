<!-- src/components/LocationFetcher.svelte -->
<script>
	import { fetchError, getLocation } from '../../utils/locationUtils.js';
</script>

<button on:click={getLocation} class="bg-blue-500 text-white p-2 rounded">Get Location</button>

{#if $fetchError}
	<p class="text-red-500">Error: {$fetchError}</p>
{/if}
