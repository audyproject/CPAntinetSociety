import {
    Dashboard,
    ChangePassword,
    AddUser,
    SetUser,
    AddProject,
    SetProject,
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
        "Error 404"
        }
        </>
    )
}