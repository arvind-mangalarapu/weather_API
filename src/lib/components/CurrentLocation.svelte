<script>
	import { writable } from 'svelte/store';

	export const latitude = writable(null);
	export const longitude = writable(null);
	export const error = writable(null);

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition, showError);
		} else {
			error.set('Geolocation is not supported by this browser.');
		}
	}

	function showPosition(position) {
		latitude.set(position.coords.latitude.toFixed(2));
		longitude.set(position.coords.longitude.toFixed(2));
		error.set(null);
	}

	function showError(err) {
		switch (err.code) {
			case err.PERMISSION_DENIED:
				error.set('User denied the request for Geolocation.');
				break;
			case err.POSITION_UNAVAILABLE:
				error.set('Location information is unavailable.');
				break;
			case err.TIMEOUT:
				error.set('The request to get user location timed out.');
				break;
			case err.UNKNOWN_ERROR:
				error.set('An unknown error occurred.');
				break;
		}
	}
</script>

<button
	on:click={getLocation}
	class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
>
	Show Current Location
</button>

<div class="mt-4">
	{#if $error}
		<p class="text-red-500">Error: {$error}</p>
	{:else if $latitude && $longitude}
		<p>Latitude: {$latitude}</p>
		<p>Longitude: {$longitude}</p>
	{/if}
</div>
