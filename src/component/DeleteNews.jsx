import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "../utils/axios-customize";

function DeleteNews() {
  const { key, crnid } = useParams();
  let navigate = useNavigate()

  useEffect(() => {
    const fetchDeleteNews = async () => {
      const res = await axios.get(`/api/ThirdParty/DeleteNewsPromotion?Key=${key}&CrnId=${crnid}`);
      if (res && res.status === "success") {
        navigate(`/${key}/${crnid}`, {state: {message: "Xóa thành công", error: false}})
      } else {
        navigate(`/error`, {state: {message: "Xóa thất bại", error: true}})
      }
    };
    fetchDeleteNews();
  }, []);
}



export default DeleteNews;
