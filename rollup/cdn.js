import node from 'rollup-plugin-node-resolve';

export default {
    input: './dist/src/index.js',
    output: [{
        file: './dist/bundle/smart-table-json-pointer.js',
        format: 'iife',
        name: 'smartTableSearch',
        sourcemap: true
    }, {
        file: './dist/bundle/smart-table-json-pointer.es.js',
        format: 'es',
        sourcemap: true
    }],
    plugins: [node()]
};