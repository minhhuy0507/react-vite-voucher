import axios from 'axios';

const GetMerchant = async (key, crnid) => {
    const fetchApiUrl = async () => {
        let res = await axios.get('/config.json')
        let dataUrl = await res.data.url
        return dataUrl
    }

    try {

        const instance = axios.create({
            baseURL: await fetchApiUrl(),
            timeout: 5000
        })
        
        instance.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response.data;
        }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error

            // if(error?.response?.data) return error?.response?.data
            return Promise.reject(error);
        });
        
        const data = await instance.get(`/api/ThirdParty/GetNewsPromotion?Key=${key}&CrnId=${crnid}`, { timeout: 5000 })
        return data
    } catch (error) {
        console.log('404 Not Found')
    }
}


export { GetMerchant }