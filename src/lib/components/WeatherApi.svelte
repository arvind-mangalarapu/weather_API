<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	// import { latitude  } from '$lib/components/CurrentLocation.svelte';

	const result = writable('');

	onMount(async () => {
		const url =
			'https://api.open-meteo.com/v1/forecast?latitude=17.48&longitude=78.54&current=temperature_2m&hourly=temperature_2m,dew_point_2m,rain&timezone=auto&past_days=2';
		const options = {
			method: 'GET',
			headers: {
				// 'x-rapidapi-key': '8ebd33ea51msh2425e5a19f777aap1f17e8jsnff15d0aaaaa5',
				// 'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
			}
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			result.set(JSON.stringify(data, null, 2));
		} catch (error) {
			result.set(`Error: ${error.message}`);
		}
	});
</script>

<main class="w-[100vw] h-[100vh] bg-black flex justify-center items-center">
	<div class="bg-red-600 h-52 w-full overflow-auto p-2 text-white flex justify-center">
		<pre>{$result}</pre>
	</div>
</main>
