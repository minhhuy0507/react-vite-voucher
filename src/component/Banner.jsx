import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Banner = () => {
  const promotionData = useSelector((state) => state.merchant.promotionData);
  const [imgUrl, setImgUrl] = useState([]);

  useEffect(() => {
    if (promotionData && promotionData.WebLink) {
      if (promotionData.CrnImangeUrl) {
        setImgUrl((prev) => [
          ...prev,
          promotionData.WebLink + promotionData.CrnImangeUrl,
        ]);
      }
      if (promotionData.CrnImangeUrl1) {
        setImgUrl((prev) => [
          ...prev,
          promotionData.WebLink + promotionData.CrnImangeUrl1,
        ]);
      }
    }
  }, []);

  if (imgUrl.length >= 0 && imgUrl.length <= 2) {
    // console.log(imgUrl);
    
    return <img src={imgUrl} className="d-block w-100" alt="" />;
  } else {
    // console.log(imgUrl);
    
    return (
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={imgUrl[0]} className="d-block w-100 my-1" style={{borderRadius:"10px"}} alt="ảnh voucher 1" />
          </div>
          <div className="carousel-item">
            <img src={imgUrl[1]} className="d-block w-100 my-1" style={{borderRadius:"10px"}} alt="ảnh voucher 2" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    );
  }
};

export default Banner;
