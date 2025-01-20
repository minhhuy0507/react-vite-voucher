import React, { useEffect } from 'react';
import Layout from './page/Layout';
import Loading from './page/Loading';
import Error from './page/Error';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchMerchant } from './redux/slice/merchantSlice';

const App = () => {
  const dispatch = useDispatch()
  const {isLoading, error} = useSelector(state=>state.merchant)
  const {key, crnid} = useParams()
  
  
  useEffect(()=>{
    dispatch(fetchMerchant({key, crnid}))
  }, [])
  
  if(isLoading===true && error===false){
    return(
      <Loading/>
    )
  }else if(error===true){
    return(
      <Error/>
    )
  }else if(error===false && isLoading === false){
    return(
      <Layout/>
    )
  }
  
}

export default App