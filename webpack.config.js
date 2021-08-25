let path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, './dist'),
        open: false,
        hot: true,
        quiet: true,
        port: 8082,
    },
    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            {
                test: /\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                }, 'postcss-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                }, 'postcss-loader', 'sass-loader']
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '铁木真大屏展示',
            template: path.resolve(__dirname, './public/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new friendlyErrorsWebpackPlugin(),
    ],
}