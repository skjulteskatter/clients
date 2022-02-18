const path = require('path');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
            },
        ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            models: path.resolve(__dirname, 'src/models/'),
            cache: path.resolve(__dirname, 'src/cache/'),
            services: path.resolve(__dirname, 'src/services/'),
            client: path.resolve(__dirname, 'src/client/'),
        },
    },
};