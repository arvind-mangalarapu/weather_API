<!-- src/components/LocationFetcher.svelte -->
<script>
	import { writable } from 'svelte/store';
	import { latitude, longitude } from '../../stores/locationStore.js';

	let fetchError = writable(null);

	function getLocation() {
		console.log('Button clicked');

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const lat = position.coords.latitude.toFixed(2);
					const lon = position.coords.longitude.toFixed(2);
					console.log(`Latitude: ${lat}, Longitude: ${lon}`);
					latitude.set(lat);
					longitude.set(lon);
				},
				(err) => {
					fetchError.set(err.message);
				}
			);
		} else {
			fetchError.set('Geolocation is not supported by this browser.');
		}
	}
</script>

<button on:click={getLocation} class="bg-blue-500 text-white p-2 rounded">Get Location</button>

{#if $fetchError}
	<p class="text-red-500">Error: {$fetchError}</p>
{/if}
