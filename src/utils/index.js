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