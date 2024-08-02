/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#1E3A8A', // Customize primary color
				secondary: '#60A5FA' // Customize secondary color
			}
		}
	},
	plugins: []
};
