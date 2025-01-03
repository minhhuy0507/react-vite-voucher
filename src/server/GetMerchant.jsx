import axios from '../utils/axios-customize';


const GetMerchant = async (key, crnid) =>{
    try {
        const data = await axios(`/api/ThirdParty/GetNewsPromotion?Key=${key}&CrnId=${crnid}`, {timeout: 5000})
        // console.log('data getmetchant::',data)
        return data
    } catch (error) {
        console.log()
    }
}

export { GetMerchant }