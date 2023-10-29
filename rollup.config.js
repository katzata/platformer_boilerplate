import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import livereload from 'rollup-plugin-livereload';
import resolve from '@rollup/plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.ts',
	output: {
		file: 'public/bundle.js',
		format: 'iife',
		sourcemap: true
	},
	envType: !production ? "development" : "production",
	plugins: [
		resolve({ preferBuiltins: false }),
		commonjs({
			ignoreGlobal: false,
		}),
		typescript({ compilerOptions: { lib: ["es5", "es6", "dom"], target: "es6" } }),
		production && terser(),
		copy({
			targets: [
				{ src: 'src/index.html', dest: 'public/' },
				{ src: 'src/styles.css', dest: 'public/' },
			]
		}),
		livereload({
			watch: './',
			verbose: true, // Disable console output

			// other livereload options
			port: 5000,
			delay: 200,
		}),
		globals(),
	]
};
