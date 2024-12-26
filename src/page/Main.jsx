import Voucher from "../component/Voucher";
import Content from "../component/Content";
import { useContext, useEffect, useState } from "react";
import GetCode from "../component/GetCode";
import { PromotionProvider } from "../context/PromotionContext";
import Loading from "./Loading";

const Main = () => {
  const [otpVerified, setOtpVerified] = useState(false);
  const [voucherCode, setVoucherCode] = useState();
  const [evtStatus, setEvtStatus] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isDate, setIsDate] = useState(0);
  const { promotionData } = useContext(PromotionProvider);


  const handleOtpVerification = (voucherCode) => {
    setVoucherCode(voucherCode);
    setOtpVerified(true);
  };

  //Sự kiện khuyến mãi
  const handleEvent = () => {
    const now = new Date().getTime();
    const startEvt = new Date("2024-12-26T19:47:00").getTime(); //Ngày bắt đầu sự kiện
    //Ngày bắt đầu sự kiện
    const endEvt = new Date("2024-12-27T19:47:30").getTime(); //Ngày kết thúc sự kiện

    if (now < startEvt) {
      setEvtStatus(0); //Sắp diễn ra
    } else if (now >= startEvt && now <= endEvt) {
      setEvtStatus(1); //Đã diễn ra
    } else {
      setEvtStatus(-1); //Hết event
    }

  };


  useEffect(() => {
    const interval = setInterval(() => {
      handleEvent();
      if(evtStatus!="undefined"){
        setIsLoading(false)
      }
      setIsDate(new Date().getDate())
    }, 1500);
    return () => clearInterval(interval);
    
  }, [evtStatus, isLoading, isDate]);

  if(isLoading){
    return(
      <Loading/>
    )
  }else{
    if (evtStatus === -1 ) {
      return (
        <div
          className="row d-flex flex-column text-center p-5 mb-3"
          style={{
            borderRadius: "10px",
            backgroundColor: "rgb(237, 223, 199)",
          }}
        >
          <h3 className="text-danger">
            Hiện chưa có chương trình khuyến mãi nào
          </h3>
        </div>
      );
    } else {
      return (
        <>
          {otpVerified ? (
            <GetCode voucherCode={voucherCode} />
          ) : (
            <div className="row d-flex flex-column flex-lg-row flex-md-row">
              <div
                className="col col-lg-5 py-3 rounded-lg-3 shadow my-1"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "rgb(225, 221, 221)",
                }}
              >
                <Voucher
                  onOtpVerified={handleOtpVerification}
                  evtStatus={evtStatus}
                  isDate={isDate}
                />
              </div>
              <div
                className="col col-lg-7 p-3 shadow my-1"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "rgb(237, 223, 199)",
                }}
              >
                <Content />
              </div>
            </div>
          )}
        </>
      );
    }
  }
  
};

export default Main;
