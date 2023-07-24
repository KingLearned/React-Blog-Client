import { useState } from "react"

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

export const SelectedPage = [
    "art",
    "science",
    "technology",
    "cinema",
    "food",
]

let makeActive = ''
export const setKey = () => {
    // const [makeActive, setMakeActive] = useState<string>()
    // window.location.reload 
    window.location.reload()
    return makeActive = !makeActive ? 'True' : ''
}
// export const darkTheme = (Activate:boolean) => {
//     // const [darkTheme, setDarkTheme] = useState<boolean>() 
//     // return setDarkTheme(true)
//     // if(Activate){}
//     if(Activate){
//         setMakeActive(true)
//     }
//     // setDarkTheme(true)
//     // return console.log(darkTheme)
//     // if(darkTheme){
//     //    return console.log('yes')
//     // }
// }
// export default makeActive

// export let makeActive:boolean = false 