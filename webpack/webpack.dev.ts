import merge from 'webpack-merge';
import common from './webpack.common';

const dev ={
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        open: true
    }
};

export default merge(common, dev);
