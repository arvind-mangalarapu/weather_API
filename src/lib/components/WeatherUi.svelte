<!-- src/components/WeatherInfo.svelte -->
<script>
	import { weatherData, fetchError } from '../../stores/weatherStore.js';

	// Default values if no weather data is available
	const defaultWeather = {
		location: { name: 'Unknown Location' },
		current: {
			temp_c: 'N/A',
			condition: { text: 'N/A' },
			air_quality: { pm2_5: 'N/A' }
		},
		forecast: { forecastday: [{ date: 'N/A', day: { maxtemp_c: 'N/A', mintemp_c: 'N/A' } }] }
	};
</script>

{#if $fetchError}
	<p class="text-red-500">Error: {$fetchError}</p>
{:else if $weatherData}
	<main
		class="w-full bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400 text-white text-center p-6 flex flex-col items-center rounded-lg shadow-lg"
	>
		<div class="mb-8">
			<h5 class="text-2xl font-extrabold">Current Location: {$weatherData.location.name}</h5>
			<h1 class="text-6xl font-extralight">{Math.round($weatherData.current.temp_c)}°C</h1>
			<p class="text-lg">
				{$weatherData.current.condition.text},
				{Math.round($weatherData.current.temp_c)}°C / {Math.round(
					$weatherData.forecast.forecastday[0].day.maxtemp_c
				)}°C
			</p>
			<button class="bg-white px-2 py-1 rounded-xl bg-opacity-20 mt-2">
				AQI: {$weatherData.current.air_quality.pm2_5}
			</button>
		</div>
		<div class="w-full md:w-2/3 lg:w-1/2 bg-black bg-opacity-20 p-4 rounded-lg">
			<h1 class="text-xl mb-4 font-semibold">5-day Forecast</h1>
			{#each $weatherData.forecast.forecastday as day}
				<div class="flex justify-between py-2">
					<span>{day.date}</span>
					<span>{Math.round(day.day.maxtemp_c)}°C / {Math.round(day.day.mintemp_c)}°C</span>
				</div>
				<hr class="opacity-20" />
			{/each}
			<button class="mt-4 w-full bg-white px-2 py-1 rounded-xl bg-opacity-20">
				More Details
			</button>
		</div>
	</main>
{:else}
	<main
		class="w-full bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 text-white text-center p-6 flex flex-col items-center rounded-lg shadow-lg"
	>
		<div class="mb-8">
			<h5 class="text-2xl font-extrabold">Current Location: {defaultWeather.location.name}</h5>
			<h1 class="text-6xl font-extralight">{defaultWeather.current.temp_c}°C</h1>
			<p class="text-lg">
				{defaultWeather.current.condition.text},
				{defaultWeather.current.temp_c}°C / {defaultWeather.forecast.forecastday[0].day.maxtemp_c}°C
			</p>
			<button class="bg-white px-2 py-1 rounded-xl bg-opacity-20 mt-2">
				AQI: {defaultWeather.current.air_quality.pm2_5}
			</button>
		</div>
		<div class="w-full md:w-2/3 lg:w-1/2 bg-black bg-opacity-20 p-4 rounded-lg">
			<h1 class="text-xl mb-4 font-semibold">5-day Forecast</h1>
			{#each defaultWeather.forecast.forecastday as day}
				<div class="flex justify-between py-2">
					<span>{day.date}</span>
					<span>{day.day.maxtemp_c}°C / {day.day.mintemp_c}°C</span>
				</div>
				<hr class="opacity-20" />
			{/each}
			<button class="mt-4 w-full bg-white px-2 py-1 rounded-xl bg-opacity-20">
				More Details
			</button>
		</div>
	</main>
{/if}
