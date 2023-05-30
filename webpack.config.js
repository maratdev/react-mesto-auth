const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, './src'),
        compress: true,
        port: 8080,
        open: true,
    },
};