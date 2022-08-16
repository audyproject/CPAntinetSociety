import {
    Dashboard,
    ChangePassword,
    AddUser,
    SetUser,
    AddProject
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
        "Error 404"
        }
        </>
    )
}