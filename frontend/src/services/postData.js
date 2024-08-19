async function postData(URL,data) {
    try{
        const response = await fetch(URL,{
            method:'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json' 
            },
            body:JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            if (result.message) {
                alert(result.message)
            } else {
                console.log("El campo 'message' no se encuentra en la respuesta.");
            }
    }catch(error){
        alert(error)
    }
}
export {postData}