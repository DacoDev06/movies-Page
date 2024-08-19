async function deleteData(url) {
    try{
        const response = await fetch(url,{
            method:'DELETE',
        });
        if(!response.ok){
            throw new Error(`HTTP error! status ${response.status}`)
        }
        const result = await response.json()
        if (result.message) {
            alert(result.message)
        } else {
            console.log("El campo 'message' no se encuentra en la respuesta.");
        }
        }catch(error){
            alert(error)
        }
    
}
export {deleteData}