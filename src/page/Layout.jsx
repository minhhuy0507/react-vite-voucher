import React, { useEffect } from "react";
import Banner from "../component/Banner";
import Main from "./Main";
import { useSelector } from "react-redux";

const Layout = () => {

  const promotionData = useSelector(
    (state) => state.merchant.promotionData
  );

  useEffect(() => {
    if(promotionData.CrnName){
      let name = document.getElementsByTagName("title")[0];
      name.text = promotionData.CrnName;
    }
  },[]);

  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "rgba(78, 55, 226, 0.03)" }}
    >
      <Banner />
      <div className="container-fluid">
        <Main />
      </div>
    </div>
  );
};
export default Layout;
