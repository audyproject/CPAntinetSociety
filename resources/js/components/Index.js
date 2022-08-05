import axios from "axios";
import React, { useEffect, useState, useSyncExternalStore } from "react";
import ReactDOM from 'react-dom';
import Login from "./Pages/Login";

async function getToken(){
    try {
        const response = await axios("api/users")
        return await response.data
    } catch (error) {
        console.log(error)
    }
}

function Index() {
    // const [token, setToken] = useState(async() => await getToken())
    const [token, setToken] = useState(false)

    // useEffect(async () => {
    //     setToken(getToken())
    // })

    return (
        <>
        {token ? "dashboard" : <Login setToken={setToken}/>}
        </>
    )
}

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}