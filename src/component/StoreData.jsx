import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "../utils/axios-customize";

function StoreData() {
  const { key, crnid } = useParams();
  let navigate = useNavigate()

  useEffect(() => {
    const fetchSaveData = async () => {
      let data = {
        Key: key,
        CrnId: crnid
      }
      const res = await axios.post("/api/ThirdParty/SaveNewsPromotion",data);

      if (res && res.status === "success") {
        navigate(`/${key}/${crnid}`)
      } else {
        navigate(`/error`, {state: {message: "Lưu thất bại", error: true}})
      }
    };
    fetchSaveData();
  }, []);
}

export default StoreData;
