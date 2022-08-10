import React, { useEffect, useState } from "react";
import Form from "../components/Form"
import Input from "../components/Input"
import { Sidebar } from "../layout/Sidebar"
import { Header } from "../layout/Header"
import { Content } from "./Content"
import { Toast } from "../components/Toast";
import "../import.js"

function toast(){
    const toastLiveExample = document.getElementById('toast')
    const toast = new coreui.Toast(toastLiveExample);
    toast.show();
}

export function Main(props){

    const [toastData, setToastData] = useState([])

    const toastFunction = (message, background) => {
        // console.log(message + " " + background)
        setToastData([message, background])
        toast()
        return [
            message, background
        ]
    }

    const [menu, setMenu] = useState("dashboard")

    return (
        <>
        <Sidebar menu={menu} setMenu={setMenu} setLogin={props.setLogin} logout={props.logout}/>
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <Header/>
            <div className="body flex-grow-1 px-3 container-lg">
                <Content menu={menu} toast={toastFunction}/>
                <Toast message={toastData[0]} background={toastData[1]} id={"toast"}></Toast>
            </div>
        </div>
        {/* <Toast message={toastMessage} background={"bg-success"} id={"success"}></Toast> */}
        {/* Header, Sidebar, Content */}
        </>
    )
}