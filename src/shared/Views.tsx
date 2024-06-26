import { EyeIcon } from '@heroicons/react/24/solid'
import React, { useEffect } from 'react'

interface Props {
  postViews: number
}

const Views = ({postViews}:Props) => {
  
  return (
    <div className='flex'>{postViews > 999 ? `${(postViews/1000).toFixed(1)}k` : postViews}<EyeIcon className='ml-1 w-[20px]'/></div>
  )
}

export default Views