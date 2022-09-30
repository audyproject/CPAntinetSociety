import {
    Dashboard,
    ChangePassword,
    AddUser,
    SetUser,
    AddProject,
    SetProject,
    Membership,
    Subscription,
    Email,
} from "./content/index"
import { Toast, Toaster } from "../components"
import { useRef, useState } from "react"
import { CContainer } from "@coreui/react"

export function Content({ menu, setMenu, sessionData }) {

    const [toast, setToast] = useState()
    const toaster = useRef()

    return (
        <>
            <CContainer>
                {
                    menu == "dashboard" ? <Dashboard /> :
                        menu == "change-password" ? <ChangePassword Toast={Toast} setToast={setToast} Toaster={Toaster} toaster={toaster} /> :
                            menu == "add-user" ? <AddUser setMenu={setMenu} Toast={Toast} setToast={setToast} Toaster={Toaster} toaster={toaster} /> :
                                menu == "set-user" ? <SetUser sessionData={sessionData} Toast={Toast} setToast={setToast} Toaster={Toaster} toaster={toaster} /> :
                                    menu == "add-project" ? <AddProject setMenu={setMenu} Toast={Toast} setToast={setToast} Toaster={Toaster} toaster={toaster} /> :
                                        menu == "set-project" ? <SetProject Toast={Toast} setToast={setToast} Toaster={Toaster} toaster={toaster} /> :
                                            menu == "subscription" ? <Subscription /> :
                                                menu == "membership" ? <Membership Toast={Toast} setToast={setToast} Toaster={Toaster} toaster={toaster} /> :
                                                    menu == "email" ? <Email Toast={Toast} setToast={setToast} Toaster={Toaster} toaster={toaster} /> :
                                                        "Error 404"
                }
            </CContainer>
            {toast}
        </>
    )
}