// src/utils/weatherUtils.js
import { weatherData, fetchError } from '../stores/weatherStore.js';

export async function fetchWeather(lat, lon) {
	try {
		const response = await fetch(
			`http://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=${lat},${lon}&days=1&aqi=yes&alerts=yes`
		);
		const data = await response.json();
		weatherData.set(data);
		fetchError.set(null);
	} catch (error) {
		fetchError.set('Failed to fetch weather data');
		weatherData.set(null);
	}
}
