<!-- src/components/WeatherInfo.svelte -->
<script>
	import { weatherData, fetchError } from '../../stores/weatherStore.js';
	import { getLocation } from '../../utils/locationUtils.js';

	let data;
	let error;

	$: data = $weatherData;
	$: error = $fetchError;
</script>

<button on:click={getLocation} class="text-[12px]">Get the current location</button>

{#if error}
	<p class="text-red-500">Error: {error}</p>
{:else if data}
	<main class="w-[100vw] bg-black items-center font-medium">
		<div
			class="bg-gradient-to-b from-blue-200 via-current-blue-300 to-blue-400 text-white text-center pt-20 flex flex-col gap-[20%] items-center"
		>
			<div>
				<h5 class="text-[25] font-extrabold">Current Location: {data.location.name}</h5>
				<h1 class="text-[75px] font-extralight">{data.current.temp_c}°</h1>
				<p>
					{data.current.condition.text}, {data.current.temp_c}°/{data.forecast.forecastday[0].day
						.maxtemp_c}°
				</p>
				<button class="bg-white px-2 rounded-xl bg-opacity-20"
					>AQI: {data.current.air_quality.pm2_5}</button
				>
			</div>
			<div
				class="h-[180px] w-[400px] p-2 text-center font-medium text-[14px] bg-black rounded-lg bg-opacity-10"
			>
				<div class="flex justify-between py-2">
					<h1>5-days forecast</h1>
					<p>more details---Graph</p>
				</div>
				<hr class="opacity-20" />
				{#each data.forecast.forecastday as day}
					<div class="flex justify-between py-2">
						<h1>{day.date}</h1>
						<i></i>
						<p>{day.day.maxtemp_c}°/{day.day.mintemp_c}°</p>
					</div>
					<hr class="opacity-20" />
				{/each}
				<button class="bg-white w-[350px] h-[20px] px-2 rounded-xl bg-opacity-20"
					>5-days forecast</button
				>
			</div>
		</div>
	</main>
{/if}
