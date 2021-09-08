const config = {
    baseURL: '',
    timeout: 5000, // 超时时间
    contentType: 'application/json; charset=UTF-8',
    successCode: [200], // 响应正确的响应码，格式为数组形式
    debounceRequest: ['/user/login'], // 防止重复提交的请求

    key: 'a31166e6d671a7f5e94cb5e096398ceb', // 高德地图key
}


module.exports = config
