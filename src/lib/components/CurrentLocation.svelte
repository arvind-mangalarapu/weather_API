<!-- src/components/LocationFetcher.svelte -->
<script>
	import { getLocation } from '../../utils/locationUtils.js';
	import { fetchError } from '../../stores/weatherStore.js';
</script>

<div class="flex flex-col items-center space-y-4">
	<button
		on:click={getLocation}
		class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
	>
		Get Current Location
	</button>

	{#if $fetchError}
		<p class="text-red-500 mt-2">Error: {$fetchError}</p>
	{/if}
</div>
