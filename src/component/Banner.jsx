import React, { useContext, useEffect, useState } from 'react'
import { PromotionProvider } from '../context/PromotionContext'

const Banner = () => {

  const [imgUrl, setImgUrl] = useState('')
  const { promotionData } = useContext(PromotionProvider)

  useEffect(() => {
    setImgUrl(promotionData.WebLink + promotionData.CrnImangeUrl1)
  },[])

  return (
    <img src={imgUrl ? imgUrl : ''} alt="" className='w-100 my-1' style={{borderRadius:"10px"}}/>
  )
}

export default Banner