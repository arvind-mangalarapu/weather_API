// src/utils/weatherUtils.js
import { weatherData, fetchError } from '../stores/weatherStore.js';

export async function fetchWeather(lat, lon) {
	try {
		const response = await fetch(
			`http://api.weatherapi.com/v1/forecast.json?key=9b828baf6cb941b097a101236243107&q=${lat},${lon}&days=1&aqi=yes&alerts=yes`
		);
		if (!response.ok) throw new Error('Network response was not ok');

		const data = await response.json();
		weatherData.set(data);
		fetchError.set(null);
	} catch (error) {
		fetchError.set('Failed to fetch weather data');
		weatherData.set(null);
	}
}
