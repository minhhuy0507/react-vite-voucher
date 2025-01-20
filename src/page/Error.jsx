import React, { useEffect } from 'react'
import "../assets/error.css"
import { useLocation, useNavigate } from 'react-router'
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Error = () => {
    const location = useLocation()
    const {state} = location
    let navigate = useNavigate()

    const notif = (message, err) => {
        if(err){
            return toast.error(message, {
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
        }else{
            return toast.success(message, {
                position: "top-center",
                autoClose: 10000,
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
        }
        
    };

    useEffect(()=>{
       if(state && state.message!=null && state.message!=""){
        notif(state.message, state.error)
        navigate(location.pathname, { replace: true });
       }
    },[])

    return (
        <>
            <div id='err' className='d-flex flex-column justify-content-center align-items-center text-center px-5' style={{width:"100%", height:"100%", position: "absolute"}}>
                <p className='text-danger'><b>Vui lòng liên hệ với chúng tôi để cài đặt và sử dụng</b></p>
                <p>
                    <span>Hỗ trợ 24/7 : </span><br />
                    <strong>0902 960 612</strong><br />
                    <strong>0909 661 206</strong><br />
                    <strong>0901 408 369</strong>
                </p>  
                <p><span>Email : </span><a href="mailto:hotro@relisoft.vn"><strong>hotro@relisoft.vn</strong></a></p>
                <div className='w-100'><a className='btn btn-danger' href="/default">Xem Demo</a></div>
            </div>
            <ToastContainer/>
        </>
    )
}

export default Error