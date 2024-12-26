import React, { useContext, useEffect, useState } from 'react';
import Layout from './page/Layout';
import { MerchantContext, MerchantProvider } from './context/MerchantContext';
import Loading from './page/Loading';
import Error from './page/Error';

const App = () => {

  return (
    <MerchantContext>
      <ShowContent />
    </MerchantContext>
  )
}

const ShowContent = () => {
  const { serverError } = useContext(MerchantProvider)

  useEffect(()=>{
  }, [serverError])

  if(serverError===null){
    return(
      <Loading/>
    )
  }else if(serverError===true){
    return(
      <Error/>
    )
  }else{
    return(
      <Layout/>
    )
  }
}

export default App