// src/utils/locationUtils.js
import { latitude, longitude } from '../stores/locationStore.js';
import { writable } from 'svelte/store';

export const fetchError = writable(null);

export function getLocation() {
	console.log('Button clicked');

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const lat = position.coords.latitude.toFixed(2);
				const lon = position.coords.longitude.toFixed(2);
				console.log(`Latitude: ${lat}, Longitude: ${lon}`);
				latitude.set(lat);
				longitude.set(lon);
				fetchError.set(null);
			},
			(err) => {
				fetchError.set(err.message);
			}
		);
	} else {
		fetchError.set('Geolocation is not supported by this browser.');
	}
}
