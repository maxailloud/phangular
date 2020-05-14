import * as path from 'path';
import * as webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { InjectManifest } from 'workbox-webpack-plugin';
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const config: webpack.Configuration = {
    entry: ['./src/app/game.ts', './webpack/credits.ts'],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        plugins: [new TsconfigPathsPlugin({configFile: path.resolve(__dirname, '../tsconfig.json')})]
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            include: path.join(__dirname, '../src'),
            loader: 'ts-loader'
        }]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({gameName: 'Nothing To Sea', template: 'src/index.html'}),
        new CopyWebpackPlugin([
            {from: 'src/assets', to: 'assets'},
            {from: 'pwa', to: ''},
            {from: 'src/favicon.ico', to: ''}
        ]),
        new InjectManifest({
            swSrc: path.resolve(__dirname, '../pwa/sw.js')
        })
    ]
};

export default config;
