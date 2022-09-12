import { type } from 'jquery'
import React, { useState } from 'react'
import { AppSidebar, AppHeader } from '../components/index'
import { Content } from "./Content"

export const Main = ({ setLogin, logout, loginData, sessionData }) => {

    const [menu, setMenu] = useState("dashboard")

    return (
        <>
            <AppSidebar menu={menu} setMenu={setMenu} logout={logout} loginData={loginData} sessionData={sessionData} />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader setMenu={setMenu} logout={logout} />
                <div className="body flex-grow-1 px-3">
                    <Content menu={menu} setMenu={setMenu} sessionData={sessionData} />
                </div>
                {/* <AppFooter /> */}
            </div>
        </>
    )
}