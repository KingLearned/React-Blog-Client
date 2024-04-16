import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/solid"
import { useEffect } from "react"

type Props = {
  totalNum:number
}

const Comments = ({totalNum}:Props) => {

  // useEffect(() => {

  // })

  return (
    <div className='flex'>{totalNum}<ChatBubbleBottomCenterIcon className='cursor-pointer ml-1 w-[20px]'/></div>
  )
}

export default Comments