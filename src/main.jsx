import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Error from './page/Error.jsx'
import StoreData from './component/StoreData.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Error/>} />
        <Route path='/:key/:crnid' element={<App/>}/> 
        <Route path='/:key/:crnid/update' element={<StoreData/>}/> 
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
