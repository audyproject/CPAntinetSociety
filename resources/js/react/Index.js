import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import { requestAPI } from "./API";
import { Login } from "./views/Login";
import { Main } from "./views/Main"
import "./import.js"
import "/react/scss/style.scss"
import store from "./store"
import ForgotPassword from "./views/ForgotPassword";

import { Toast, Toaster } from "./components/"

function Index() {

    const logout = async () => {
        const response = await requestAPI("get", "api/logout")
        if (response.status == 0) {
            setLogin(9)
        } else {
            console.log(response.message)
        }
    }

    const [toast, setToast] = useState()
    const toaster = useRef()

    const [login, setLogin] = useState()
    const [sessionData, setSessionData] = useState(false)

    const handleCheckLogin = async () => {
        const response = await requestAPI("get", "api/checksession")
        setLogin(response.status)
        setSessionData(response.data)
    }

    useEffect(() => {
        handleCheckLogin()
    }, [])

    return (
        <>
            {login === 0 ? <Main setLogin={setLogin} logout={logout} sessionData={sessionData} /> :
                login === 1 ? <Login setLogin={setLogin} login={login} setSessionData={setSessionData} Toast={Toast} setToast={setToast} Toaster={Toaster} toaster={toaster} /> :
                    login === 2 ? <ForgotPassword setLogin={setLogin} login={login} Toast={Toast} setToast={setToast} Toaster={Toaster} toaster={toaster} /> :
                        login === 9 ? <Login setLogin={setLogin} login={login} setSessionData={setSessionData} sendToast={"logout"} /> :
                            "Loading..."
            }
            {toast}
        </>
    )
}

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render(
        <Provider store={store}>
            <Index />
        </Provider>,
        document.getElementById('app'));
}