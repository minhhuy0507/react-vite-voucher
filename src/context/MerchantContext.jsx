import { createContext, useEffect, useState } from "react";
import { GetMerchant } from "../server/GetMerchant";
import { useParams } from "react-router";

const MerchantProvider = createContext();

function MerchantContext({ children }) {
  const [merchantData, setMerchantData] = useState();
  const [urlApi, setUrlApi] = useState();
  const [serverError, setServerError] = useState(null);
  const { key, crnid } = useParams();
  

  useEffect(() => {
    try {
      const getMerchantData = async () => {
        const result = await GetMerchant(key, crnid);
        if (result !="undefined" && result.Status === 1) {
          let data = result.Data
          const link = document.querySelector("link[rel='icon']");
          
          setMerchantData(data.MerchantInfor);
          setUrlApi(data.MerchantInfor.MrtUrlApi)
          setServerError(false)
        } else {
          setServerError(true)
        }
      };
      getMerchantData()
    } catch (error) {
      setServerError(true)
      console.log("404 Not Found");
    }
  }, []);

  return (
    <MerchantProvider.Provider value={{ merchantData, serverError, urlApi }}>
      {children}
    </MerchantProvider.Provider>
  );
}

export { MerchantProvider, MerchantContext };
