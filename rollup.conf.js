export default {
	input: './index.js',
	output: [{
		format: 'cjs',
		file: './dist/index.js'
	}, {
		format: 'es',
		file: './dist/index.mjs'
	}, {
		format: 'iife',
		file: './dist/smart-table-json-pointer.js',
		name: 'smartTableJsonPointer',
		sourcemap: true
	}, {
		format: 'es',
		file: './dist/smart-table-json-pointer.es.js',
		sourcemap: true
	}]
}