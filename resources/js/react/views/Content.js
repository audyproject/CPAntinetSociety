import {
    Dashboard,
    ChangePassword,
    AddUser,
    SetUser,
    AddProject,
    SetProject,
    Membership,
    Subscription,
} from "./content/index"

export function Content({ menu, setMenu }) {
    return (
        <>
            {
                menu == "dashboard" ? <Dashboard /> :
                    menu == "change-password" ? <ChangePassword /> :
                        menu == "add-user" ? <AddUser /> :
                            menu == "set-user" ? <SetUser /> :
                                menu == "add-project" ? <AddProject setMenu={setMenu} /> :
                                    menu == "set-project" ? <SetProject /> :
                                        menu == "subscription" ? <Subscription /> :
                                            menu == "membership" ? <Membership /> :
                                                "Error 404"
            }
        </>
    )
}