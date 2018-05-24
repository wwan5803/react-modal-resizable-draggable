const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');
var devOption = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        libraryTarget: 'commonjs2' // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components|build)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [ 'css-loader' ]
            }
        ]
    },
    externals: {
        'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                comparisons: false
            },
            output: {
                comments: false,
                ascii_only: true
            },
            sourceMap: true
        })
    ]

}

var productOption = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        chunkFilename: '[name].[chunkhash:8].js',
        filename: '[name].[chunkhash:8].js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components|build)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [ 'css-loader' ]
            }
        ]
    },
    externals: {
        'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
    },
    plugins: [
        new CleanWebpackPlugin([path.resolve(__dirname, 'build')]),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                comparisons: false,
                drop_console: true
            },
            output: {
                comments: false,
                ascii_only: true
            }
        })
    ]

}


module.exports = (env) => {
    console.log('env', env)
    if(env==='production'){
        return productOption
    }else{
        return devOption
    }
};