import { Xicon } from "@/components/useimg"
import { useEffect } from "react"

// type Props = {
//     doEvent:any
// }
const PostInteraction = () => {

  return (
    <div className="md:w-[91%] w-full h-[92vh] flex flex-col justify-center items-center bg-[rgba(0,0,0,0.3)] fixed z-99 -mt-5">
        <div className="relative h-1/2 bg-white  md:w-1/2 w-[80%] p-10 rounded-md flex flex-col items-center justify-center">
            <button className="font-bold absolute top-2 right-2">X</button>
            <img className="w-10" src={Xicon} alt={Xicon} />
            <h1 className="font-bold my-5">Hey, 👋 register or login to interact.</h1>
            <button className="font-bold text-white p-3 bg-gray-400 rounded-xl"><a href="/login">Click here to Register</a></button>
            <p className="mt-3 text-center text-xs">This blog is powered by <a className="font-bold" href="https://cloudflare.com" target="_blanck">Cloudflare</a>. to interact with the contents on this blog, please login by clicking the button above.</p>
        </div>
    </div>
  )
}

export default PostInteraction