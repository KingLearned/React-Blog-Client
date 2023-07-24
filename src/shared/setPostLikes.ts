export const setPostLikes = (posts:any) => {

    posts.length > 0 && 
    !localStorage.getItem('postlikes') && localStorage.setItem('postlikes', JSON.stringify([{postId:posts[0].postId,likeStatus:''}]))
    const postLikes = JSON.parse(`${localStorage.getItem('postlikes')}`)
    type forObj = {
        postId:number
    }
    for (let i = 0; i < posts.length; i++) {

        const index = postLikes.findIndex((obj:forObj) => obj.postId === posts[i].postId)
        if(index === -1){
            postLikes.push({postId:posts[i].postId, likeStatus:''})
            localStorage.setItem('postlikes',JSON.stringify(postLikes))
        }

    }
}

type forObj = {
    postId:number
    likeStatus:string
}
export const handleLike = (postId:number) => {
    let Action = false
    const likeBox = JSON.parse(`${localStorage.getItem('postlikes')}`)
    likeBox.findIndex((obj:forObj) => {
        if(obj.postId === postId){
            const updateLiked = [] //Formulate new Array of object to Update likestatus

            for (let i = 0; i < likeBox.length; i++) {
                if(likeBox[i].postId == obj.postId){
                    likeBox[i].likeStatus = likeBox[i].likeStatus == 'liked' ? '' : 'liked'  
                    Action = likeBox[i].likeStatus ? true : false
                }
                updateLiked.push({postId: likeBox[i].postId, likeStatus: likeBox[i].likeStatus})   
            }
            localStorage.setItem('postlikes', JSON.stringify(updateLiked))

        }
    })
    return Action
  
}