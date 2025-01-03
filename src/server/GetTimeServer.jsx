import axios from "../utils/axios-customize"

const GetTimeServer = async () =>{
    try {
        const data = await axios.get("https://quanlyweb.relipos.com/v1/api/auth/timestamp")
        if(data.statusId==="")
        return data
    } catch (error) {
        console.log(error)
    }
}

export default GetTimeServer