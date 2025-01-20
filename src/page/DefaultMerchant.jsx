import { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import { useNavigate } from "react-router";

const DefaultMerchant = () => {
    const [defaultMerchant, setDefaultMerchant] = useState({data:[], isLoading: true})
    const navigate  = useNavigate()

    useEffect(()=>{
        axios.get("/example.json")
        .then(res=>res.data)
        .then(data=>setDefaultMerchant({data: data, isLoading: false}))
        .catch(err=>console.error('Bad request'))
    },[defaultMerchant.isLoading])

    if(defaultMerchant.isLoading){
        return (
            <Loading/>
        )
    }else{
        navigate(`/${defaultMerchant.data.defaultKey}/${defaultMerchant.data.defaultId}`)
    }
};

export default DefaultMerchant;