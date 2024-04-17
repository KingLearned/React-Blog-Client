import { useContext, useEffect, useState } from "react"
import { Avatar } from "./useimg"
import { AuthContext } from "@/contexts/authContext"
import axios from "axios"
import Proxy from "@/shared/Proxy"
import { XMarkIcon } from "@heroicons/react/24/solid"

interface Props{
    postComments:[]
    postId:number,
    istheme:boolean
}

interface commentInterface {
    name:string,
    comment:string
}

const CommentBox = ({ postComments, postId, istheme }:Props) => {

    const { currentUser } = useContext(AuthContext)
    const [comments, setComments] = useState<commentInterface[]>([])
    const [commentText, setcommentText] = useState('')

    useEffect(() => {
        setComments(postComments)
    }, [postComments])

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        
        try{
            const res = await axios.post(`${Proxy}/posts/comments/${postId}`, {comments:[...comments, {name:currentUser?.username, comment:commentText} ]})
            
            if(res.data){
                alert('Your comment was posted successfully!')
                setComments([...comments, {name:currentUser ? currentUser.username : "", comment:commentText} ])
                setcommentText('')
            }

        } catch(err){
            console.log(err)
        }

    }

    

    const deleteComment = async (remove:object) => {
        const modified = comments.filter(comment => comment !== remove)
        setComments(comments.filter(comment => comment !== remove))
        
        try{
            const res = await axios.post(`${Proxy}/posts/comments/${postId}`, {comments:modified})
            
        } catch(err){
            console.log(err)
        }
        
    }

    return(
        <div className={`border-y-[1px] ${istheme ? 'border-white': 'border-gray-500'} py-4`}>
            <h1 className={`font-extrabold ${istheme && 'text-white'}`}>COMMENTS ({comments.length})</h1>
            <div className="my-3 bg-primary-100 rounded-md p-5">
                <p className="font-bold text-[1.5rem]">Disclaimer!</p>
                <p>Comments expressed here do not reflect the opinions of learnedsblog or any Author thereof.</p>
            </div>

            <div>
                {
                    comments.length > 0 ?
                        comments.map((comment:commentInterface, index:number) => (
                            <div className="flex bg-gray-50 p-3 rounded-md mb-3 min-h-[100px] relative" key={index}>
                                {
                                    currentUser?.username == comment.name &&
                                    <XMarkIcon className="w-[28px] cursor-pointer absolute top-2 right-2" onClick={() => {deleteComment(comment)}} />
                                }
                                <img className="h-[50px] w-[50px] mr-2" src={Avatar} alt={Avatar} />
                                <div>
                                    <h1 className="font-bold capitalize">{comment.name}</h1>
                                    <p>{comment.comment}</p>
                                </div>
                            </div>
                        ))
                    :
                    <div className="flex bg-gray-50 py-5 rounded-md justify-center">
                        <p className="font-bold">No comments yet!</p>
                    </div>

                }
            </div>
            
            {
                currentUser &&
                <form className="mt-4 flex flex-col bg-primary-100 rounded-sm p-4" onSubmit={handleSubmit}>
                    <h1 className={`font-bold text-[1.5rem] ${istheme && 'text-black'}`}>Write your comment here</h1>
                    <textarea className="h-[200px] outline-none resize-none border p-2 rounded-md" placeholder="Write something..." required 
                    onChange={(e) => { setcommentText(e.target.value)}} value={commentText}
                    ></textarea>
                    <button className="font-bold w-max text-white mt-4 py-2 px-4 bg-gray-500 hover:bg-gray-400 rounded-md self-end">Submit</button>
                </form>
            }
        </div>
    )
}

export default CommentBox