import typescript from 'rollup-plugin-typescript'

export default {
	input: 'src/NEAT.ts',
	output: [
		{
			file: "./build/NEATbundle_cjs.js",
			format: 'cjs',
		},
		{
			file: "./build/NEATbundle_es.js",
			format: 'iife',
			name: "NEAT"
		},
	],

	plugins: [
		typescript({
			typescript: require('typescript'),
		}),
	],
}