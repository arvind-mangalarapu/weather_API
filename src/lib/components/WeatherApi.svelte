<!-- src/components/WeatherApi.svelte -->
<script>
	import { fetchWeather } from '../../utils/weatherUtils.js';
	import { latitude, longitude } from '../../stores/locationStore.js';

	$: {
		if ($latitude && $longitude) {
			fetchWeather($latitude, $longitude);
		}
	}
</script>
