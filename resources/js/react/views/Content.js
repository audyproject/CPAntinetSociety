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

export function Content({ menu, setMenu, sessionData }) {
    return (
        <>
            {
                menu == "dashboard" ? <Dashboard /> :
                    menu == "change-password" ? <ChangePassword /> :
                        menu == "add-user" ? <AddUser /> :
                            menu == "set-user" ? <SetUser sessionData={sessionData} /> :
                                menu == "add-project" ? <AddProject setMenu={setMenu} /> :
                                    menu == "set-project" ? <SetProject /> :
                                        menu == "subscription" ? <Subscription /> :
                                            menu == "membership" ? <Membership /> :
                                                menu == "email" ? <Email /> :
                                                    "Error 404"
            }
        </>
    )
}