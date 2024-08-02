// src/utils/locationUtils.js
import { latitude, longitude } from '../stores/locationStore.js';
import { fetchError } from '../stores/weatherStore.js';

export function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const lat = position.coords.latitude.toFixed(2);
				const lon = position.coords.longitude.toFixed(2);
				latitude.set(lat);
				longitude.set(lon);
				fetchError.set(null);
			},
			(err) => fetchError.set(err.message),
			{ enableHighAccuracy: true }
		);
	} else {
		fetchError.set('Geolocation is not supported by this browser.');
	}
}
