import wepy from 'wepy'
// const baseURL = 'https://www.zhengzhicheng.cn/api/public/v1'
const baseURL = 'https://www.zhengzhicheng.cn/api/public/v1'

/**
 * get请求
 */
wepy.get = (url, data = {}) => {
    return wepy.request({
        type: 'get',
        url: baseURL + url,
        data
    })
}

/**
 * post请求
 */
wepy.post = (url, data = {}) => {
    return wepy.request({
        type: 'post',
        url: baseURL + url,
        data
    })
}

//请求后的提示
wepy.baseToast = (str = '获取提示失败') => {
    wepy.showToast({
        title: str,
        icon: 'none',
        duration: 1500
    })
}
