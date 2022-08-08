import React, { useEffect, useState } from "react";
import Form from "../components/Form"
import Input from "../components/Input"
import { Sidebar } from "../layout/Sidebar"
import { Header } from "../layout/Header"
import { Content } from "./Content"

export function Main(){

    const [menu, setMenu] = useState("dashboard")

    return (
        <>
        <Sidebar menu={menu}/>
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <Header/>
            <div className="body flex-grow-1 px-3">
                <Content menu={menu}/>
            </div>
        </div>
        {/* Header, Sidebar, Content */}
        </>
    )
}