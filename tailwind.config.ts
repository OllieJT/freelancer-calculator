import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin';

export default {
	darkMode: 'media',
	content: ['./src/*.html', './src/routes/**/*.svelte', './src/components/**/*.svelte'],
	theme: {
		extend: {
			colors: {
				white: '#fff',
				black: '#000',
				mono: colors.slate,
				primary: colors.indigo,
				secondary: colors.green,
			},
			screens: {
				xs: '440px',
			},
			transitionTimingFunction: {
				'out-circ': 'cubic-bezier(0, 0.3, 0, 1)',
			},
		},
	},

	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/forms'),

		plugin(function ({ addVariant }) {
			addVariant('hocus', ['&:hover', '&:focus', '&:focus-visible']);
			addVariant('error', ['&:invalid', '&.invalid']);
			addVariant('current', ['&.current']);
			addVariant('resting', ['&:not(.current)']);
			// addVariant('focus', ['&:focus', '&:focus-visible', '&:focus-within']);
		}),
	],
} satisfies Config;
