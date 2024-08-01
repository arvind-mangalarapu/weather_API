<!-- src/components/WeatherDisplay.svelte -->
<script>
	import { latitude, longitude } from '../../stores/locationStore.js';
	import { weatherData, fetchError } from '../../stores/weatherStore.js';

	async function handleFetchWeather() {
		const currentLatitude = $latitude;
		const currentLongitude = $longitude;

		if (currentLatitude && currentLongitude) {
			try {
				const response = await fetch(
					`http://api.weatherapi.com/v1/forecast.json?key=9b828baf6cb941b097a101236243107&q=${currentLatitude},${currentLongitude}&days=1&aqi=yes&alerts=yes`
				);

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				const data = await response.json();

				weatherData.set(data);
				fetchError.set(null);
			} catch (error) {
				weatherData.set(null);
				fetchError.set(error.message);
			}
		} else {
			weatherData.set(null);
			fetchError.set('Latitude and Longitude are not set.');
		}
	}

	// Reactive statement to fetch weather when latitude or longitude changes
	$: {
		if ($latitude && $longitude) {
			handleFetchWeather();
		}
	}
</script>

{#if $fetchError}
	<p class="text-red-500">Error: {$fetchError}</p>
{:else if $weatherData}
	<pre>{JSON.stringify($weatherData, null, 2)}</pre>
	<h5 class="text-5xl">{$weatherData.location.name}</h5>
{/if}
