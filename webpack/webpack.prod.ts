import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as path from 'path';
import merge from 'webpack-merge';
import common from './webpack.common';
import JavaScriptObfuscator from 'webpack-obfuscator';

const prod = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].bundle.js',
        chunkFilename: '[name].[contenthash].chunk.js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    filename: '[name].[contenthash].bundle.js'
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist/*.js')]}),
        new JavaScriptObfuscator(
            {
                rotateStringArray: true,
                stringArray: true,
                // stringArrayEncoding: 'base64', // disabled by default
                stringArrayThreshold: 0.75
            },
            ['vendors.*.js']
        )
    ]
};

export default merge(common, prod);
