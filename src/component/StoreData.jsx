import axios from "axios";
import React, { useEffect, useState } from "react";

function StoreData() {
  const [data, setData] = useState(null);

  const fetchNewsData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/NewsPromotion/GetNewsPromotion"
      );
      const result = await res.data;
      setData(result);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "NewsData.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {data && (
        <div className="d-flex flex-column">
          <pre
            style={{
              background: "black",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
          <button className="btn btn-primary w-100 mb-3" onClick={handleDownload}>Download JSON</button>
        </div>
      )}
    </>
  );
}

export default StoreData;
