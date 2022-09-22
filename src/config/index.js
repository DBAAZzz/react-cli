const config = {
    baseURL: '',
    timeout: 5000, // 超时时间
    contentType: 'application/json; charset=UTF-8',
    successCode: [200], // 响应正确的响应码，格式为数组形式
    debounceRequest: ['/user/login'], // 防止重复提交的请求

    key: '0d1eed3edb9b30362e6c3a8581186a4e', // 高德地图key
}


module.exports = config
