import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Error from './page/Error.jsx'
// import SaveData from './component/SaveData.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Error/>} />
        <Route path='/:key/:crnid' element={<App/>}/> 
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
