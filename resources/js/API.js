export async function requestAPI(method = "get", url, data = null){
    try {
        const response = await axios[method](url, data)
        const resp = await response.data
        return resp
    } catch (error) {
        console.log(error)
    }
}

export function tes(){
    return "tes"
}