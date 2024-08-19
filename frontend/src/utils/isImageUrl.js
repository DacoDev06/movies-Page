const isImageURL=(url)=>{
    if(url.includes("data:image")){
        return true
    }
    return false
}

export {isImageURL}