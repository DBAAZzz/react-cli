import axios from 'axios'
import {
    baseURL,
    timeout,
    contentType,
    successCode,
    debounceRequest
} from '@/config'
import qs from 'qs'


let pendingMap = new Map(); // 使用Map来缓存请求

/**
 * 生成每个请求唯一的键
 * @param {*} config 
 * @returns string 
 */
function getPendingKey(config) {
    let { url, method, params, data } = config
    if (typeof data === 'string') data = JSON.parse(data)
    return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}

/**
 * 存储每个请求唯一值，也就是cancel方法，用于取消请求
 * @param {*} config 
 */
function addPending(config) {
    const paddingKey = getPendingKey(config)
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
        if (!pendingMap.has(paddingKey)) {
            pendingMap.set(paddingKey, cancel)
        }
    })
}

/**
 * 删除重复的请求
 * @param {*} config 
 */
function removePending(config) {
    const pendingKey = getPendingKey(config)
    if (pendingMap.has(pendingKey)) {
        const cancelToken = pendingMap.get(pendingKey)
        cancelToken(pendingKey)
        pendingMap.delete(pendingKey);
    }
}

const instance = axios.create({
    baseURL,
    timeout,
    headers: {
        'Content-Type': contentType,
    },
})

// 请求拦截器
instance.interceptors.request.use((config) => {
    if (debounceRequest.some((request) => request == config.url)) {
        removePending(config);
        addPending(config);
    }
    if (config.data && config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8')
        config.data = qs.stringify(config.data)
    
    // 可以给请求添加响应头等等操作...
    return config
}, (error) => {
    return Promise.reject(error)
})

// 响应拦截器 返回的结果就是请求后拿到的数据
instance.interceptors.response.use((response) => {
    
    if (debounceRequest.some((request) => request == response.config.url)) {
        removePending(response.config);
    }
    const { data, config } = response
    const { code, message } = data
    // 响应正常就返回数据
    if (successCode.includes(code)) {
        return data.data
    } else {
        handleCode(code, message)
        return Promise.reject(
            '拦截到异常请求' + JSON.stringify({ url: config.url, code, message })
        )
    }
}, (err) => {
    if (err.config && debounceRequest.some((request) => request == err.config.url)) {
        removePending(err.config);
    }
})

// 处理错误响应，返回的code根据业务需求做不同的处理
const handleCode = (code, message) => {
    switch (code) {
        case 300:
            // 做处理
            console.log('token失效，请重新登录')
            break
        case 400:
            console.log('400错误')
            break
        default:
            break
    }
}

export default instance
