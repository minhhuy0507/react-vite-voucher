import Voucher from "../component/Voucher";
import Content from "../component/Content";
import { useEffect, useState } from "react";
import GetCode from "../component/GetCode";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const Main = () => {
  const promotionData = useSelector((state) => state.merchant.promotionData);
  const [otpVerified, setOtpVerified] = useState(false);
  const [voucherCode, setVoucherCode] = useState();
  const [evtStatus, setEvtStatus] = useState(-1);
  const [disable, setDisable] = useState();

  const handleOtpVerification = (voucherCode) => {
    setVoucherCode(voucherCode);
    setOtpVerified(true);
  };

  const handleEvent = async () => {
    const now = new Date().getTime();
    let startEvtDay;
    let endEvtDay;

    if (
      promotionData &&
      promotionData.CrnActionDate &&
      promotionData.CrnEndDate
    ) {
      startEvtDay = new Date(promotionData.CrnActionDate).getTime();
      endEvtDay = new Date(promotionData.CrnEndDate).getTime();

      if (now < startEvtDay) {
        Cookies.remove("regTime");
        setEvtStatus(0);
        handleStartEvent(now, startEvtDay);
      }
      if (now >= startEvtDay && now <= endEvtDay) {
        setEvtStatus(1);
        handleEndEvent(now, endEvtDay);
      }

      if (now > endEvtDay) {
        setEvtStatus(-1);
      }
    }
  };

  const handleStartEvent = (now, startEvtDay) => {
    let timeLeft = (startEvtDay-now)/1000
    let dateLeft = timeLeft/86400

    if (dateLeft <= 2) {
      //Sắp diễn ra event
      setTimeout(() => {
        setEvtStatus(1);
      }, timeLeft*1000);
    }
  };

  const handleEndEvent = (now, endEvtDay) => {
    let timeLeft = (endEvtDay-now)/1000
    let dateLeft = timeLeft/86400

    if (dateLeft <= 1) {
      //Kết thúc hoặc hết event
      
      setTimeout(() => {
        Cookies.remove("regTime");
        setEvtStatus(-1);
      }, timeLeft*1000);
    }
  };

  const setCookie = () => {
    //Không tồn tại
    if (Cookies.get("regTime") === undefined) {
      const now = new Date(Date.now() + 1000 * 60 * 15);
      Cookies.set("regTime", now, { expires: 365 });
      setDisable(false);
    } else {
      const now = new Date(Date.now()).getDate();
      const prev = new Date(Cookies.get("regTime")).getDate();

      if (now > prev) {
        Cookies.remove("regTime");
      }
    }
    const now = new Date();
    const nextDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const timeLeft = nextDay - now;

    setTimeout(() => {
      Cookies.remove("regTime");
      const currentDay = new Date(Date.now() + 1000 * 60 * 15);
      Cookies.set("regTime", currentDay, { expires: 365 });
      setDisable(false);
    }, timeLeft);
  };

  const offInput = () => {
    setDisable(true);
  };

  useEffect(() => {
    handleEvent();

    if (evtStatus === 1) {
      setCookie();
    }
    if (evtStatus === 0) {
      setDisable(true);
    }
  }, [evtStatus]);

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
};

export default Main;
