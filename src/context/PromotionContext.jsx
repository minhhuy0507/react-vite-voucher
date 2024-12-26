import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetMerchant } from "../server/GetMerchant";
const PromotionProvider = createContext();

function PromotionContext({ children }) {
  const [promotionData, setPromotionData] = useState([]);
  const [serverError, setServerError] = useState(null);
  const { key, crnid } = useParams();

  useEffect(() => {
    let fetchPromotionData = async () => {
      try {
        const result = await GetMerchant(key, crnid);

        if (result != "undefined" && result.Status === 1) {
            let data = result.Data
            document.title = data.NewsInfor.CrnName
            setPromotionData(data.NewsInfor)
            setServerError(false)
        }else{
            setServerError(true)
        }
      } catch (error) {
        setServerError(true)
        console.log("404 Not Found");
      }
    };
    fetchPromotionData();
  }, []);

  return (
    <PromotionProvider.Provider
      value={{
        promotionData, serverError
      }}
    >
      {children}
    </PromotionProvider.Provider>
  );
}

export { PromotionContext, PromotionProvider };
