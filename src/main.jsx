import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Error from "./page/Error.jsx";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import StoreData from "./component/StoreData.jsx";
import DeleteNews from "./component/DeleteNews.jsx";
import DefaultMerchant from "./page/DefaultMerchant.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/:key/:crnid" element={<App />} />
          <Route path="/:key/:crnid/save" element={<StoreData />} />
          <Route path="/:key/:crnid/delete" element={<DeleteNews />} />
          <Route path="/default" element={<DefaultMerchant/>}/>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
