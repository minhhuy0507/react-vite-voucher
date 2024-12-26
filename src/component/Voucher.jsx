import React, { useContext, useEffect, useState } from "react";
import Form from "./Form";
import FlipCountdown from "@rumess/react-flip-countdown";
import { PromotionProvider } from "../context/PromotionContext";
import Cookies from "js-cookie";

const Voucher = ({ onOtpVerified, evtStatus, isDate }) => {
  const { promotionData } = useContext(PromotionProvider);
  const [disable, setDisable] = useState();

  const setCookie = () => {
    const now = new Date();
    //Đã tồn tại
    if (Cookies.get("regTime") !== undefined) {

      //Reset cookie sang ngày mới
      if (isDate != now.getDate()) {
        Cookies.remove("regTime")
        Cookies.set("regTime", now, { expires: 365 });
      }
    }
    //Chưa tồn tại
    if (Cookies.get("regTime") === undefined) {
      //Bắt đầu event thì mới kích hoạt Cookies
      if (evtStatus === 1) {
        Cookies.set("regTime", now, { expires: 365 });
        window.location.reload()
      }
    }
  };

  //Thời gian còn lại trong 15 phút
  const timeLeft = () => {
    const currentTime = new Date(Cookies.get("regTime"));
    // 1000(millisecond)*60(60 second)*15 = 15 minute
    const endTime = new Date(currentTime).getTime() + 1000 * 60 * promotionData.CrnRegisterTime;
    return endTime;
  };

  //Tăt các nút khi hết 15 phút
  const offInput = () => {
    setDisable(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCookie();
    }, 1000);
    return () => clearInterval(interval);
    
  }, [evtStatus, disable, isDate]);

  return (
    <>
      <div className="d-flex flex-column">
        <>
          <h3 className="text-danger text-center">
            {promotionData.CrnDescription}
          </h3>
          <h4 className="text-danger text-center">
            Đăng ký nhanh tay, nhận ngay mã Voucher
          </h4>

          {evtStatus === 0? (
            <div className="d-flex flex-column my-3">
              <h5 className="text-danger text-center">
                Chuẩn bị săn Deal Hot!
              </h5>
              <h5 className="text-danger text-center">
                Bắt đầu mở Deal lúc{" "}
                {new Date(promotionData.CrnActionDate)
                  .getHours()
                  .toString()
                  .padStart(2, 0)}
                :
                {new Date(promotionData.CrnActionDate)
                  .getMinutes()
                  .toString()
                  .padStart(2, 0)}{" "}
                Ngày {new Date(promotionData.CrnActionDate).getDate()}/
                {new Date(promotionData.CrnActionDate).getMonth()}/
                {new Date(promotionData.CrnActionDate).getFullYear()}
              </h5>
            </div>
          ) : (
            <div className="d-flex flex-column justify-content-center text-center my-3">
              {timeLeft() && (
                <FlipCountdown
                  hideYear
                  hideMonth
                  hideDay
                  theme="dark"
                  size="small"
                  endAtZero={true}
                  titlePosition="bottom"
                  onTimeUp={offInput}
                  endAt={new Date(timeLeft()).toISOString()}
                  hourTitle={"Giờ"}
                  minuteTitle={"Phút"}
                  secondTitle={"Giây"}
                />
              )}
              {disable && (
                <h6 className="text-danger">
                  Hết thời gian đăng ký trong hôm nay
                </h6>
              )}
            </div>
          )}
          <Form onOtpVerified={onOtpVerified} disable={disable} />
          <p className="mt-3 text-center">
            Đã có{" "}
            <span className="fw-bold text-center">
              {promotionData.CountRegister}
            </span>{" "}
            người đăng ký
          </p>
        </>
      </div>
    </>
  );
};

export default Voucher;
