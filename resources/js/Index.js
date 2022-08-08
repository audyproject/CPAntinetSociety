import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { Login } from "./Pages/Login";
import { Main } from "./Pages/Main"

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
    const [login, setLogin] = useState(false)

    // useEffect(async () => {
    //     setToken(getToken())
    // })

    return (
        <>
        {login ? <Main/> : <Login setLogin={setLogin}/>}
        </>
    )
}

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}