import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Error from "./page/Error.jsx";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import StoreData from "./component/StoreData.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/:key/:crnid" element={<App />} />
          <Route path="/:key/:crnid/save" element={<StoreData />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
