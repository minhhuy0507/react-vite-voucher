import React, { useContext, useEffect, useState } from "react";
import Form from "./Form";
import FlipCountdown from "@rumess/react-flip-countdown";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const Voucher = ({ onOtpVerified, evtStatus, offInput, flag }) => {
  const promotionData = useSelector(state=>state.merchant.promotionData)

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

          {evtStatus === 0 || evtStatus === -1 ? (
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
              {Cookies.get("regTime") != undefined && !flag ?(
                <FlipCountdown
                  hideYear
                  hideMonth
                  hideDay
                  theme="dark"
                  size="small"
                  endAtZero={true}
                  titlePosition="bottom"
                  onTimeUp={offInput}
                  endAt={new Date(Cookies.get("regTime")).toISOString()}
                  hourTitle={"Giờ"}
                  minuteTitle={"Phút"}
                  secondTitle={"Giây"}
                />
              ) : (
                <h6 className="text-danger">
                  Hết thời gian đăng ký trong hôm nay
                </h6>
              )}
            </div>
          )}
          <Form onOtpVerified={onOtpVerified} disable={flag} />
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
