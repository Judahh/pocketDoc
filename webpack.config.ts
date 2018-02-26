import * as  path from 'path';
import * as webpack from 'webpack';
import * as UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import * as  CompressionPlugin from 'compression-webpack-plugin';
require('dotenv').config();

const config: webpack.Configuration = {
    entry: './app/code/imports/imports.ts',
    output: {
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist/'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.webpack.js', '.webpack.ts', '.web.js', '.web.ts', '.js', '.ts', '.tsx']
    },
    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.ts$/, loader: 'ts-loader' },
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader',
                include: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'app/view/common/fonts')
                ]
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ],
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: []
};

if (JSON.parse(process.env.WEBPACK_PRODUCTION)) {
    console.log('Production');
    config.plugins.push(
        new UglifyJSPlugin({
            parallel: true,
            uglifyOptions: {
                ecma: 8,
                mangle: false,
                compress: false
            }
        })
    );
    config.plugins.push(
        new CompressionPlugin(
            // {
            //     asset: '[path].gz[query]',
            //     algorithm: 'gzip',
            //     test: /\.js$|\.css$|\.html$/
            // }
        )
    );
} else {
    console.log('Development');
    config.devtool = 'inline-source-map'
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}

export default config;
