// api/login
export async function requestLogin(data){
    try {
        const response = await axios.post("api/login", data)
        // console.warn(await response)
        const resp = await response.data
        return resp
    } catch (error) {
        console.log(error)
    }
}

export function tes(){
    return "tes"
}

// export default {
//     requestLogin
// }