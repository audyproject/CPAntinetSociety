import axios from "axios";
import { useState } from "react";

async function requestLogin(data){
    try {
        const response = await axios.post("api/login", data)
        // console.warn(await response)
        const resp = await response.data
        return resp
    } catch (error) {
        console.log(error)
    }
}

function Login(props){

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    // const [res, setRes] = useState("")

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(e)
        let data = {
            "email": email,
            "password": pass
        }
        // setRes(await requestLogin(data))
        const resp = await requestLogin(data)
        if(resp.status == 0){
            props.setToken(resp.token)
        } else {
            console.warn(resp)
        }
    }

    // console.log(res)

    return(
        <>
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card-group d-block d-md-flex row">
                    <div className="card col-md-7 p-4 mb-0">
                        <div className="card-body">
                        <h1>Login</h1>
                        <p className="text-medium-emphasis">Sign In to your account</p>
                        <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3"><span className="input-group-text">
                            <svg className="icon">
                                <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-user"></use>
                            </svg></span>
                            <input className="form-control" onChange={e => setEmail(e.target.value)} type="email" placeholder="Email"/>
                        </div>
                        <div className="input-group mb-4"><span className="input-group-text">
                            <svg className="icon">
                                <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-lock-locked"></use>
                            </svg></span>
                            <input className="form-control" onChange={e => setPass(e.target.value)} type="password" placeholder="Password"/>
                        </div>
                        <div className="row">
                            <div className="col-6">
                            <button className="btn btn-link px-0" type="button">Forgot password?</button>
                            </div>
                            <div className="col-6 text-end">
                            <button className="btn btn-primary px-4" type="submit">Login</button>
                            </div>
                        </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Login;