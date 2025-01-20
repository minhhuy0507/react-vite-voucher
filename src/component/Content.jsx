import React from 'react'
import { useSelector } from 'react-redux'

const Content = () => {
  const promotionData = useSelector(state=>state.merchant.promotionData)

  return (
    <div dangerouslySetInnerHTML={{__html: promotionData.CrnContent}}>
    </div>
  )
}

export default Content