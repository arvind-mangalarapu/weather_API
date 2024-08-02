// src/stores/weatherStore.js
import { writable } from 'svelte/store';

export const weatherData = writable(null);
export const fetchError = writable(null);
