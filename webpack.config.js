let path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const ProgressBarPlugin = require("progress-bar-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin");

const isProduction = process.env.NODE_ENV == 'production'

module.exports = () => {
    const config = {
        mode: process.env.NODE_ENV,
        devtool: 'inline-source-map',
        entry: {
            app: './src/index.js',
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'js/[name].[contenthash:8].js',
        },
        performance: {
            hints: false
        },
        optimization: {
            moduleIds: 'deterministic', // 默认 根据模块名称生成简短的hash值
            chunkIds: 'deterministic',
            minimize: isProduction, //是否是生产环境
            minimizer: [
                new CssMinimizerPlugin({
                    parallel: true, // 开启多进程并发执行压缩
                }),
                new TerserPlugin({
                    parallel: true, // 开启多线程压缩
                })
            ],
            splitChunks: {
                chunks: 'all',
                minChunks: 1, // 要提取的的chunk最少被引用次数
                // minSize: 30000, // 要提取的chunk的最小大小
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                        name: 'vendor',
                        priority: -10,
                    },
                    common: {
                        minChunks: 2,
                        name: 'common',
                        priority: -20,
                    },
                    chart: {
                        test: /[\\/]node_modules[\\/](react-chartjs-2|_react-chartjs-2|chart.js)[\\/]/,
                        name: 'chart',
                        filename: 'chart',
                        priority: -5,
                    }
                }
            },
            runtimeChunk: {
                name: (entrypoint) => `runtime-${entrypoint.name}`,
            },
        },
        resolve: {
            extensions: ['.js', '.jsx', '.css'],
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        devServer: {
            historyApiFallback: true,
            contentBase: path.join(__dirname, './dist'),
            open: false,
            host: '0.0.0.0',
            useLocalIp: true, //使用本地ip
            hot: true,
            quiet: true,
            port: 8082,
            proxy: {
                '/user': {
                    target: 'http://139.196.100.226:3001',
                    changeOrigin: true,
                }
            }
        },
        module: {
            rules: [
                {
                    oneOf: [
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
                            use: [
                                isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                                {
                                    loader: 'css-loader',
                                    options: {
                                        modules: {
                                            auto: true,
                                        }
                                    }
                                }, 'postcss-loader'
                            ],
                        },
                        {
                            test: /\.scss$/,
                            use: [
                                isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                                {
                                    loader: 'css-loader',
                                    options: {
                                        modules: {
                                            auto: true,
                                            localIdentName: "[local]_[hash:base64:5]",
                                        }
                                    }
                                }, 'postcss-loader', 'sass-loader', {
                                    loader: 'sass-resources-loader',
                                    options: {
                                        resources: [
                                            path.resolve(__dirname, './src/style/base.scss')
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: '铁木真大屏展示',
                template: path.resolve(__dirname, './public/index.html'),
                filename: 'index.html',
                // favicon: './public/favicon.ico'
            }),
            new friendlyErrorsWebpackPlugin(),
        ],
    }
    // 生产环境的配置
    if (isProduction) {
        const chalk = require('chalk');
        config.plugins.push(
            new ProgressBarPlugin(
                {
                    format: `${chalk.green.bold('build[:bar]')} ${chalk.green.bold(':percent')} (:elapsed seconds)`,
                    clear: false,
                    width: 60,
                }
            ), // 打包进度条优化
            new CleanWebpackPlugin(), // 打包前清空build目录里面的文件
            new BundleAnalyzerPlugin({
                analyzerPort: 10000
            }), // 分析打包后的文件大小
            new CompressionPlugin({
                algorithm: 'gzip',
                minRatio: 0.8
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css', //输出的 CSS 文件的名称
                chunkFilename: 'css/[name].[contenthash:8].chunk.css',// 非入口的 css chunk 文件名称
                ignoreOrder: true,
            }) // CSS单独打包
        )
    }
    return config
}