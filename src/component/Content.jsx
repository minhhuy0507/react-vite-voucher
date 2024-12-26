import React, { useContext } from 'react'
import { PromotionProvider } from '../context/PromotionContext'

const Content = () => {
  const { promotionData } = useContext(PromotionProvider)

  return (
    <div dangerouslySetInnerHTML={{__html: promotionData.CrnContent}}>
    </div>

  )
}

export default Content