import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { requestAPI } from "./API";
import { Login } from "./Pages/Login";
import { Main } from "./Pages/Main"
import "./import.js"
import $ from "jquery"

const js = [
    "/js/jquery-3.5.1.js",
    "/vendors/@coreui/coreui/js/coreui.bundle.min.js",
    "/vendors/simplebar/js/simplebar.min.js",
    "/vendors/chart.js/js/chart.min.js",
    "/vendors/@coreui/chartjs/js/coreui-chartjs.js",
    "/vendors/@coreui/utils/js/coreui-utils.js",
    "/js/dataTables.bootstrap4.min.js",
    "/js/jquery.dataTables.min.js",
    "/js/main.js",
    "/js/toasts.js",
]

let script = false

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
    ReactDOM.render(<>
    <Index />
    {js.map((datas, i) => {
        script = document.createElement('script');
        script.src = datas;
        script.async = true;
        document.body.appendChild(script);
    })}
    </>, document.getElementById('app'));
}