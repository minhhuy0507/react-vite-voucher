import React, { useContext, useEffect, useState } from 'react'
import Banner from '../component/Banner';
import Main from './Main';
import Error from './Error';
import { PromotionContext, PromotionProvider } from '../context/PromotionContext';
import Loading from './Loading';

const Layout = () => {
  
  return (
    <PromotionContext>
      <ShowContent />
    </PromotionContext>

  )
}

const ShowContent = () => {
  const { serverError } = useContext(PromotionProvider)

  useEffect(() => {
  }, [serverError])

  if (serverError===null) {
    return (
      <Loading />
    )
  } else {
    if (serverError === true) {
      return (
        <Error />
      )
    } else {
      return (
        <div className='container-fluid' style={{ backgroundColor: "rgba(78, 55, 226, 0.03)" }}>
          <Banner />
          <div className='container-fluid'>
            <Main />
          </div>
        </div>
      )

    }

  }
}
export default Layout