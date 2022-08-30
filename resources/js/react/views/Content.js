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

export function Content({menu}){
    return(
        <>
        {
        menu == "dashboard" ? <Dashboard/> :
        menu == "change-password" ? <ChangePassword/> :
        menu == "add-user" ? <AddUser/> :
        menu == "set-user" ? <SetUser/> :
        menu == "add-project" ? <AddProject/> :
        menu == "set-project" ? <SetProject/> :
        menu == "subscription" ? <Subscription/> :
        menu == "membership" ? <Membership/> :
        menu == "email" ? <Email/> :
        "Error 404"
        }
        </>
    )
}