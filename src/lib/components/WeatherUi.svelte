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
	<main class="w-[100vw] relative items-center font-medium">
		<img
			class="object-cover bg-no-repeat absolute"
			src="https://plus.unsplash.com/premium_photo-1667030961443-69875429d7a2?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
			alt=""
		/>
		<div
			class=" text-white text-center pt-20 flex flex-col justify-around h-[100vh] gap-[20%] items-center absolute inset-0"
		>
			<form action="/search" method="get">
				<input class="roundes" type="text" name="query" placeholder="Search..." />
				<button type="submit">Search</button>
			</form>
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
