import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loading from "../page/Loading";
import axios from "../utils/axios-customize";

function StoreData() {
  const [isLoading, setIsLoading] = useState(true);
  const { key, crnid } = useParams();
  const [keyMerchant, setKeyMerchant] = useState();
  const [crnidMerchant, setcrnidMerchant] = useState();
  const [error, setError] = useState(false);
  let navigate = useNavigate()

  useEffect(() => {
    const fetchSaveData = async () => {
      let data = {
        Key: key,
        CrnId: crnid
      }
      const res = await axios.post("/api/ThirdParty/SaveNewsPromotion",data);

      if (res && res.status === "success") {
        setKeyMerchant(res.metadata.Key);
        setcrnidMerchant(res.metadata.CrnId);
        navigate(`/${key}/${crnid}`, {state: {message: "Data has been saved successfully"}})
      } else {
        navigate(`/${key}/${crnid}`, {state: {message: "Error! Data not saved"}})

      }
    };
    fetchSaveData();
  }, []);
}

export default StoreData;
