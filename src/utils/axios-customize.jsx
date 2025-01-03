'use strict'

import axios from "axios";
import md5 from "md5";

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 30 * 1000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Alter defaults after instance has been created
instance.defaults.withCredentials = true
instance.defaults.headers.common['Content-Type'] = 'application/json'
instance.defaults.headers['x-api-key'] = import.meta.env.VITE_API_KEY
// instance.defaults.headers.Authorization = "Basic " + md5(import.meta.env.VITE_API_AUTH).toString()

// Add a request interceptor
instance.interceptors.request.use(async (config) => {
    // Do something before request is sent
    // gắn giá trị cấu hình, key ........ trước khi nó tạo request 
    // hoặc xử lý gì đó trước khi request 
    // Do something before request is sent

    if (config.url.indexOf('/timestamp') >= 0) {
        const version = "v1"
        const timeStamp = Date.now()
        config.headers['x-stime'] = timeStamp.toString()
        config.headers['x-sign'] = md5(import.meta.env.VITE_API_KEY + timeStamp + version).toString()
        
        return config
    } 

    try {
        const data = await getTimeServer()

        if (data.status === "success") {
            const timeLocal = Date.now() / 1000
            const timeServer = data.metadata.timeServer / 1000
            const timeCompare = Math.abs(timeLocal - timeServer)
            const timeStamp = data.metadata.timestamp
            if (timeCompare > 60) {
                // neu thoi gian lech nhau 60s ko gửi request
                
                return Promise.reject({
                    code: 423,
                    status: "locked",
                    message: "Thời gian lỗi. Vui lòng kiểm tra lại thời gian trên thiết bị!!!"
                })
            }
            const version = "v1"
            config.headers['x-sign'] = "admin"??md5(import.meta.env.VITE_API_KEY + timeStamp + version).toString()
            config.headers['x-stime'] = timeStamp.toString()
            config.headers['x-client-id'] = localStorage.getItem('relisoft_users')
            
        }
        return config;
    } catch (err) {
        return Promise.reject(err)
    }
    return config
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(async (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    
    return response && response.data ? response.data : response;
},(error) =>{
    // làm cái gì đó sau khi nhận data từ api , xử lý nó trước khi trả ra người dùng 
    // ví dụ khi server báo về token hết hạn, 
    // console.log('>>>>>> Check error axios error.response :', error, error.response.body);
    
    if (error.response) {
        // The client was given an error response (5xx, 4xx)
        // console.log(error.response.data);
        // console.log(error.response.status);
        console.log(error);
        // console.log(error.response.headers);
        if (error.response.data) {
            if (import.meta.env.MODE !== 'production') {
                console.log(">>> Check error responsive DATA::::", { ...error.response.data, statusId: error.response.status, statusText: error.response.statusText })
            }
            return { ...error.response.data, statusId: error.response.status, statusText: error.response.statusText };
        }

        if (import.meta.env.MODE !== 'production') {
            console.log(">>> Check error responsive ALL::::", error.response)
        }
        return error.response;
    } else if (error.request) {
        
        // The client never received a response, and the request was never left
        if (import.meta.env.MODE !== 'production') {
            console.log(">>> Check error request ::::", { ...error.request, statusId: error.code, stautsName: error.name, statusText: error.message })
        }
        return { ...error.request, statusId: error.code, stautsName: error.name, statusText: error.message };
    } else {
        // Anything else
        // console.log('Error', error.message);
        if (import.meta.env.MODE !== 'production') {
            console.log(">>> Check Anything else error ::::", error)
        }
        return Promise.reject(error);
    }
    
});


const getTimeServer = async () => {
    return await instance.get('/v1/api/auth/timestamp')
}

const handleRefreshToken = async () => {
    return await instance.post('/v1/api/auth/handleRefreshToken')
}

export default instance
