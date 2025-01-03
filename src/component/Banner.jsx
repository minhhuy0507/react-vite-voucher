import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Banner = () => {
  const promotionData = useSelector(state=>state.merchant.promotionData)
  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    if(promotionData && promotionData.WebLink && promotionData.CrnImangeUrl1){
      setImgUrl(promotionData.WebLink+promotionData.CrnImangeUrl1)
    }   
  },[])
  

  return (
    <img src={imgUrl ? imgUrl : ''} alt="" className='w-100 my-1' style={{borderRadius:"10px"}}/>
  )
}

export default Banner