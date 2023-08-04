const wordCount = (words:string) => {
    const arr = words.split(' ')
    let fewWords = ''
    for (let i = 0; i < arr.length; i++) {
        if(i < 30){
            fewWords += `${arr[i]} `
        }
    }
    return fewWords
}

export default wordCount