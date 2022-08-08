import axios from "axios";
import { useState } from "react";
import { requestAPI } from "../API";
import Form from "../components/Form";
import Input from "../components/Input"

export function Login(props){

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        let data = {
            "email": email,
            "password": pass
        }
        const resp = await requestAPI("post", "api/login", data)
        setLoading(false)
        props.setLogin(resp.status)
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
                                {loading ? <div className="spinner-border text-info" role="status"><span className="visually-hidden">Loading...</span></div> : <button className="btn btn-primary px-4" type="submit">Login</button>}
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