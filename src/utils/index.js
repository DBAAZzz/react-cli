/* 图片转base64位 */
export function loadImgAsBase64(url) {
    return new Promise((resolve, reject) => {
        let canvas = document.createElement('canvas');
        let img = document.createElement('img');
        img.setAttribute('crossorigin', 'anonymous');
        img.crossOrigin = 'anonymous';
        img.src = url;
        img.onload = () => {
            canvas.height = img.height;
            canvas.width = img.width;
            let context = canvas.getContext('2d');
            context.drawImage(img, 0, 0, img.width, img.height);
            let dataURL = canvas.toDataURL('image/png');
            resolve(dataURL)
        }
        img.error = (e) => {
            reject(e)
        }
    })
}

/* 添加监听事件 */
export function addEvent(el = 'window', type, callback) {
    if (el.addEventListener) {
        el.addEventListener(type, callback)
    } else {
        el.attachEvent('on' + type, callback)
    }
}

/* 移除监听事件 */
export function removeEvent(el = 'window', type, callback) {
    if (el.removeEventListener) {
        el.removeEventListener(type, callback)
    } else {
        el.detachEvent('on' + type, callback)
    }
}