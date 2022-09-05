import React, { useState } from 'react'
import { AppSidebar, AppHeader } from '../components/index'
import { Content } from "./Content"

export const Main = ({ setLogin, logout }) => {

    const [menu, setMenu] = useState("dashboard")

    return (
        <>
            <AppSidebar menu={menu} setMenu={setMenu} logout={logout} />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader setMenu={setMenu} logout={logout} />
                <div className="body flex-grow-1 px-3">
                    <Content menu={menu} setMenu={setMenu} />
                </div>
                {/* <AppFooter /> */}
            </div>
        </>
    )
}