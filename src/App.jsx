import React, { useEffect } from 'react';
import Layout from './page/Layout';
import Loading from './page/Loading';
import Error from './page/Error';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { fetchMerchant } from './redux/slice/merchantSlice';
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch()
  const {isLoading, error} = useSelector(state=>state.merchant)
  const {key, crnid} = useParams()
  
  let notif = (message) => {
      return toast.warning(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition: Bounce,
        style: {
          fontSize: "20px",
          padding: "20px",
          backgroundColor: "black",
          color: "white",
          borderRadius: "10px",
          textAlign: "center",
        },
      });
    };
  
  useEffect(()=>{
    dispatch(fetchMerchant({key, crnid}))
  }, [])
  
  if(isLoading===true && error===false){
    return(
      <Loading/>
    )
  }else if(error===true){
    return(
      <Error/>
    )
  }else if(error===false && isLoading === false){
    return(<>
    <Layout/>
    </>
      
    )
  }
  
}

export default App