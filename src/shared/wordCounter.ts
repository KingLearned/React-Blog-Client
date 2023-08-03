const wordCount = (words:string) => {
    const arr = words.split(' ')
    let fewWords = ''
    arr.map(eachWord => {
        if(arr.indexOf(eachWord as never) < 20){
            fewWords += `${eachWord} `
        }
    })
    return fewWords
}

export default wordCount