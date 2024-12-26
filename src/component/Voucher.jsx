import React, { useContext, useEffect, useState } from "react";
import Form from "./Form";
import FlipCountdown from "@rumess/react-flip-countdown";
import { PromotionProvider } from "../context/PromotionContext";
import Cookies from "js-cookie";

const Voucher = ({ onOtpVerified }) => {
  const { promotionData } = useContext(PromotionProvider);
  const [disable, setDisable] = useState();

  const setCookie = () => {
    const now = new Date();

    //Đã tồn tại
    if (Cookies.get("regTime") !== undefined) {
      const regTime = new Date(Cookies.get("regTime")).getDate();
      //Reset cookie sang ngày mới
      if (regTime != now.getDate()) {
        Cookies.set("regTime", now, { expires: 365 });
      }
    }
    //Chưa tồn tại
    if (Cookies.get("regTime") === undefined) {
      Cookies.set("regTime", now, { expires: 365 });
      window.location.reload()
    }
  };

  //Sự kiện khuyến mãi
  const onEvt = () => {
    const now = new Date().getTime();
    const startEvt = new Date(promotionData.CrnActionDate).getTime(); //Ngày bắt đầu sự kiện
    const endEvt = new Date(promotionData.CrnEndDate).getTime(); //Ngày kết thúc sự kiện

    //Ngày còn lại cho tới khi sự kiện diễn ra
    const dayLeft = startEvt - now;
    if (dayLeft <= 0 && endEvt >= now) {
      return true; //Đã diễn ra
    }
    return false; //Chưa diễn ra
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
    setCookie();
  }, [disable]);

  return (
    <>
      <div className="d-flex flex-column">
        {new Date(promotionData.CrnEndDate) < Date.now() ? (
          <h5 className="text-danger text-center my-auto">Hiện chưa có chương trình khuyến mãi nào</h5>
        ) : (
          <>
            <h3 className="text-danger text-center">{promotionData.CrnDescription}</h3>
            <h4 className="text-danger text-center">Đăng ký nhanh tay, nhận ngay mã Voucher</h4>

            {!onEvt() ? (
              <div className="d-flex flex-column my-3">
                <h5 className="text-danger text-center">
                  Chuẩn bị săn Deal Hot!
                </h5>
                <h5 className="text-danger text-center">
                  Bắt đầu mở Deal lúc{" "}
                  {new Date(promotionData.CrnActionDate).getHours().toString().padStart(2, 0)}:
                  {new Date(promotionData.CrnActionDate).getMinutes().toString().padStart(2, 0)}{" "}
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
                  <h5 className="text-danger">Hãy trở lại vào ngày mai</h5>
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
        )}
      </div>
    </>
  );
};

export default Voucher;
