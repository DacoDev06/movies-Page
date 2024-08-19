async function getData(URL){
    const response = await fetch(URL)
    const data = response.json()
    return data
  }

  export {getData}