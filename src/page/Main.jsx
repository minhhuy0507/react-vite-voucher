import Voucher from "../component/Voucher";
import Content from "../component/Content";
import { useEffect, useState } from "react";
import GetCode from "../component/GetCode";
import Loading from "./Loading";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const Main = () => {
  const promotionData = useSelector(state=>state.merchant.promotionData)
  const [otpVerified, setOtpVerified] = useState(false);
  const [voucherCode, setVoucherCode] = useState();
  const [evtStatus, setEvtStatus] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [disable, setDisable] = useState();

  const handleOtpVerification = (voucherCode) => {
    setVoucherCode(voucherCode);
    setOtpVerified(true);
  };

  const handleEvent = () => {
    const now = new Date().getTime();
    let startEvtDay
    if(promotionData && promotionData.CrnActionDate){
      startEvtDay = new Date(promotionData.CrnActionDate).getTime();
    }
    const endEvtDay = new Date("2025-12-31T00:00:00").getTime();

    if (now < startEvtDay) {
      Cookies.remove("regTime")
      setEvtStatus(0);
      handleStartEvent(now, startEvtDay);
    } else {
      if (now >= startEvtDay && now <= endEvtDay) {    
        setEvtStatus(1);
        handleEndEvent(now, endEvtDay);
      } else {
        setEvtStatus(-1);
      }      
    }
    setIsLoading(false);
  };

  const handleStartEvent = (now, startEvtDay) => {
    const timeLeft = startEvtDay - now;
    //Sắp diễn ra
    setTimeout(() => {
      setEvtStatus(1);
    }, timeLeft);
  };

  const handleEndEvent = (now, endEvtDay) => {
    const timeLeft = endEvtDay - now;

    if (timeLeft >= 0) {
      //Kết thúc hoặc hết event
      setTimeout(() => {
        Cookies.remove("regTime")
        setEvtStatus(-1);
      }, timeLeft);
    }
  };

  const setCookie = () => {
    //Không tồn tại
    if (Cookies.get("regTime") === undefined) {
      const now = new Date(Date.now() + 1000 * 60 * 15);
      Cookies.set("regTime",now, {expires:365})
      setDisable(false);
      // window.location.reload()
    }else{
      const now = new Date(Date.now()).getDate();
      const prev = new Date(Cookies.get("regTime")).getDate();
      
      if(now > prev){
        Cookies.remove("regTime")
      }
    }
    const now = new Date();
    const nextDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const timneLeft = nextDay - now;
    
    setTimeout(() => {
      Cookies.remove("regTime");
      const currentDay = new Date(Date.now() + 1000 * 60 * 15);
      Cookies.set("regTime", currentDay, { expires: 365 });
      setDisable(false);
    }, timneLeft);
  };

  const offInput = () => {
    setDisable(true);
  };

  useEffect(() => {
    handleEvent();

    if (evtStatus === 1) {
      setCookie();
    } else if(evtStatus === -1 || evtStatus === 1){
      setDisable(true);
    }
  }, [evtStatus, isLoading]);

  if (isLoading) {
    return <Loading />;
  } else {
    if (evtStatus === -1) {
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
                  offInput={offInput}
                  flag={disable}
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
