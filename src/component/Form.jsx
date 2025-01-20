import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "../utils/axios-customize";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router";

const Form = ({ onOtpVerified, disable }) => {
  const { key, crnid } = useParams();
  const [otpVerify, setOtpVerify] = useState();
  const [user, setUser] = useState({
    CustomerName: "",
    PhoneNumber: "",
    Email: "",
    OtpCode: "",
    CrnId: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: { name: "", email: "", phone: "" },
    resolver: undefined,
    criteriaMode: "all",
  });
  const notif = (message) => {
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

  const onSubmit = async () => {
    const formData = {
      CustomerName: user.CustomerName,
      PhoneNumber: user.PhoneNumber,
      Email: user.Email,
      CrnId: crnid,
      Key: key,
    };

    const data = await axios.post(
      `/api/ThirdParty/CheckNewsPromotion`,
      formData
    );

    if (data) {
      if (data.metadata) {
        let status = data.metadata.Status;
        let message = data.metadata.Exception_Message;
        let otp = data.metadata.Data;
        if (status === 1) {
          setUser({ ...user, OtpCode: otp, CrnId: crnid, Key: key });
          setOtpVerify(true);
          document.body.classList.add("overflow-hidden");

          return;
        }
        notif(message);
      }
    }
  };

  const handleModalClose = () => {
    setOtpVerify(false);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <>
      <form className="px-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatName"
            disabled={disable}
            placeholder="Nhập họ tên"
            {...register("name", {
              required: "Bắt buộc",
              onChange: (e) => {
                e.preventDefault();
                setUser({ ...user, CustomerName: e.target.value });
              },
            })}
          />
          <label htmlFor="floatName">
            Họ tên <span style={{ color: "red" }}>*</span>
          </label>
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ messages }) =>
              messages && (
                <p className="text-danger">*{Object.values(messages)[0]}</p>
              )
            }
          />
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatMail"
            disabled={disable}
            placeholder="Nhập email"
            {...register("email", {
              required: "Bắt buộc",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email không hợp lệ",
              },
              onChange: (e) => {
                e.preventDefault();
                setUser({ ...user, Email: e.target.value });
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ messages }) =>
              messages && (
                <p className="text-danger">*{Object.values(messages)[0]}</p>
              )
            }
          />
          <label htmlFor="floatMail">
            Địa chỉ email <span style={{ color: "red" }}>*</span>
          </label>
        </div>
        <div className="form-floating">
          <input
            type="number"
            className="form-control"
            id="floatPhone"
            disabled={disable}
            placeholder="Nhập số điện thoại"
            {...register("phone", {
              required: "Bắt buộc",
              minLength: { value: 10, message: "Số điện thoại không hợp lệ" },
              maxLength: { value: 10, message: "Số điện thoại không hợp lệ" },
              onChange: (e) => {
                e.preventDefault();
                setUser({ ...user, PhoneNumber: e.target.value });
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="phone"
            render={({ messages }) =>
              messages && (
                <p className="text-danger">*{Object.values(messages)[0]}</p>
              )
            }
          />
          <label htmlFor="floatPhone">
            Số điện thoại <span style={{ color: "red" }}>*</span>
          </label>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            disabled={disable}
            className="form-control rounded-pill btn btn-danger text-light"
          >
            Đăng ký lấy mã ngay
          </button>
        </div>
      </form>
      {otpVerify && (
        <OTP
          onOtpVerified={onOtpVerified}
          onClose={handleModalClose}
          user={user}
        />
      )}
      <ToastContainer />
    </>
  );
};

const OTP = ({ onClose, user, onOtpVerified }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [limit, setLimit] = useState(0);
  const inputRefs = useRef([]);

  let fail = (message) => {
    return toast.error(message ?? "OTP không hợp lệ", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      style: {
        fontSize: "30px",
        padding: "40px",
        backgroundColor: "black",
        color: "white",
        borderRadius: "10px",
        textAlign: "center",
      },
    });
  };

  useEffect(() => {
    // console.log(user);

    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    e.preventDefault();
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleClick = () => {};
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === "ArrowRight" && !otp[index] && index > 0) {
      inputRefs.current[index + 1].focus();
    }
    if (e.key === "ArrowLeft" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();

    const otpArray = pasteData.split("");
    if (otpArray.length > Array()) setOtp(otpArray);

    inputRefs.current[otpArray.length - 1]?.focus();
  };

  const handleSubmit = () => {
    const combineOtp = otp.join("");
    if (combineOtp.length === 6) {
      const userOTP = user.OtpCode;
      const inputOTP = combineOtp;
      
      if (userOTP === inputOTP) {
        axios
          .post(`/api/ThirdParty/RegisterNewsPromotion`, {
            CustomerName: user.CustomerName,
            PhoneNumber: user.PhoneNumber,
            Email: user.Email,
            CrnId: user.CrnId,
            OtpCode: user.OtpCode,
            Key: user.Key,
          })
          .then((data) => {
            if(data && data.status && data.status ==="success"){
              if(data.metadata){
                let statusData = data.metadata.Status;
                let message = data.metadata.Exception_Message;
                if (statusData && statusData ===1 ) {
                  setOtp(new Array(6).fill(""));
                  onOtpVerified(data.metadata.Data);
                  onClose();
                } else {
                  fail(message);
                  setOtp(new Array(6).fill(""));
                  onClose();
                }
              }
            }else{
              throw new Error("Bad request");
            }
          })
          .catch(error => console.error(error))
      } else {
        setLimit(limit + 1);
        if (limit < 2) {
          fail("Mã OTP không đúng. Vui lòng nhập lại");
        }
        if (limit == 2) {
          fail("Mã OTP sai tối đa 3 lần. Vui lòng đăng ký lại");
          onClose();
        }
        setOtp(new Array(6).fill(""));
        inputRefs.current[0].focus();
      }
    }
    if (combineOtp.length < 6) {
      setOtp(new Array(6).fill(""));
      inputRefs.current[0].focus();
      fail("Mã OTP không đủ 6 số");
    }
  };

  return (
    <>
      <div
        className="modal show"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        style={{ display: "block", top: "150px" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="w-100 text-center">
                <h5 className="modal-title">Xác minh OTP</h5>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={onClose}
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="text-center">
                {otp.map((value, index) => {
                  return (
                    <input
                      key={index}
                      type="number"
                      id="OTP"
                      ref={(input) => (inputRefs.current[index] = input)}
                      value={value}
                      onChange={(e) => handleChange(index, e)}
                      onClick={handleClick(index)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={(e) => handlePaste(e)}
                    ></input>
                  );
                })}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={handleSubmit}
              >
                Xác minh
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
