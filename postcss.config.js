module.exports = {
    plugins: {
        'postcss-preset-env': {
            browsers: 'last 2 versions',
        },
        'postcss-pxtorem': {
            rootValue: 75,
            selectorBlackList: [], //过滤
            propList: ['*']
        }
    },
}