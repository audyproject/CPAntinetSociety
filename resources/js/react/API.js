export async function requestAPI(method = "get", url, data = null){
    try {
        const response = await axios[method](url, data)
        const resp = await response.data
        if(resp.status == 9){
            window.location.reload()
        }
        return resp
    } catch (error) {
        console.log(error)
    }
}

export function tes(){
    return "tes"
}