export type userInterface = {
    Id: number
    userimg: string
    username: string
}

export type postInterface = {
    postId: number;
    title: string;
    descrp: string;
    img: string;
    likes: number;
}

export type singlePostInterface = { 
    postId: number;
    likes: number;
    title: string;
    descrp: string;
    img: string;
    cat: string;
    username: string;
    date: string;
}

export const plainText = (content:any) => {
    const doc = new DOMParser().parseFromString(content, "text/html")
    return `${doc.body.textContent}`
}