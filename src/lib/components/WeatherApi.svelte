<!-- src/components/WeatherDisplay.svelte -->
<script>
	import { latitude, longitude } from '../../stores/locationStore.js';
	import { writable } from 'svelte/store';

	let displayData = '';
	let fetchError = writable(null);

	async function handleFetchWeather() {
		const currentLatitude = $latitude;
		const currentLongitude = $longitude;

		if (currentLatitude && currentLongitude) {
			try {
				const response = await fetch(
					`http://api.weatherapi.com/v1/forecast.json?key=9b828baf6cb941b097a101236243107&q=${currentLatitude},${currentLongitude}&days=1&aqi=yes&alerts=yes
`
				);

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				const data = await response.json();
				displayData = `Location: ${data.location.name}, Temperature: ${data.current.temp_c}°C, Condition: ${data.current.condition.text}`;
				fetchError.set(null);
			} catch (error) {
				displayData = '';
				fetchError.set(error.message);
			}
		} else {
			displayData = 'Latitude and Longitude are not set.';
		}
	}

	// Reactive statement to fetch weather when latitude or longitude changes
	$: {
		if ($latitude && $longitude) {
			handleFetchWeather();
		}
	}
</script>

{#if displayData}
	<p>{displayData}</p>
{/if}

{#if $fetchError}
	<p class="text-red-500">Error: {$fetchError}</p>
{/if}
