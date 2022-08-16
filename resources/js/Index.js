import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { requestAPI } from "./API";
import { Login } from "./Pages/Login";
import { Main } from "./Pages/Main"
import "./import.js"

const js = [
    "/js/jquery-3.5.1.js",
    "/vendors/@coreui/coreui/js/coreui.bundle.min.js",
    "/vendors/@coreui/chartjs/js/coreui-chartjs.js",
    "/vendors/@coreui/utils/js/coreui-utils.js",
    "/vendors/chart.js/js/chart.min.js",
    "/vendors/simplebar/js/simplebar.min.js",
    "/js/dataTables.bootstrap4.min.js",
    "/js/jquery.dataTables.min.js",
    "/js/main.js",
    "/js/toasts.js",
]

const js2 = [
    
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

    const [login, setLogin] = useState()

    const handleCheckLogin = async () => {
        const response = await requestAPI("get", "api/checksession")
        setLogin(response.status)
    }

    useEffect(()=>{
        handleCheckLogin()
    },[])

    return (
        <>
        {login == 0 ? <Main setLogin={setLogin} logout={logout}/> : <Login setLogin={setLogin} login={login}/>}
        </>
    )

    // // TEST ALEX
    // const [isRenderLogin, setIsRenderLogin] = useState('main') // main || login

    // // END TEST ALEX



    // return (
    //     <>
    //     <button onClick={()=>setIsRenderLogin(!isRenderLogin)}>TOGGLE</button>
    //     {isRenderLogin ? <Login setLogin={setLogin} login={login}/> : <Main setLogin={setLogin} logout={logout}/>}
    //     {/* {login == 0 ? <Main setLogin={setLogin} logout={logout}/> : <Login setLogin={setLogin} login={login}/>} */}
    //     </>
    // )
}

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render(<>
    {js.map((datas, i) => {
        script = document.createElement('script');
        script.src = datas;
        script.async = false;
        document.body.appendChild(script);
    })}
    <Index />
    </>, document.getElementById('app'));
}