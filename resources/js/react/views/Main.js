import { useEffect, useRef, useState } from 'react'
import { AppSidebar, AppHeader, Toast, Toaster } from '../components/index'
import { Content } from "./Content"

export const Main = ({ logout, sessionData }) => {

    const [menu, setMenu] = useState("dashboard")
    const [toast, setToast] = useState();
    // const [t, setT] = useState(false);
    const toaster = useRef();

    // const Tes = () => {
    //     console.log("testing aja")
    // }

    // useEffect(() => {
    //     if(t) setToast(toaster, Toast(t[0], t[1]))
    // },[t])

    return (
        <>
            <AppSidebar menu={menu} setMenu={setMenu} logout={logout} sessionData={sessionData} />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader setMenu={setMenu} logout={logout} username={sessionData.username} />
                <div className="body flex-grow-1 px-3">
                    <Content 
                        menu={menu} 
                        setMenu={setMenu} 
                        sessionData={sessionData}
                        setToast={setToast}
                        Toaster={Toaster} 
                        Toast={Toast}
                        toaster={toaster}
                        />
                </div>
            </div>
                        {toast}
        </>
    )
}