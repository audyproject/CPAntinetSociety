import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { requestAPI } from "./API";
import { Login } from "./Pages/Login";
import { Main } from "./Pages/Main"
import "./import.js"

function Index() {

    const logout = async() => {
        const response = await requestAPI("get", "api/logout")
        if(response.status == 0){
            setLogin(2)
        } else {
            console.log(response.message)
        }
    }

    const [login, setLogin] = useState(async () => {
        const response = await requestAPI("get", "api/checksession")
        setLogin(response.status)
        console.log(response.status)
    })

    return (
        <>
        {login == 0 ? <Main setLogin={setLogin} logout={logout}/> : <Login setLogin={setLogin} login={login}/>}
        </>
    )
}

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}