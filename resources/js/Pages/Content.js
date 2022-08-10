import { ChangePassword } from "./content/ChangePassword"
import { AddUser } from "./content/AddUser"
import { Dashboard } from "./content/Dashboard"
import { Error404 } from "./content/Error404" 
import { SetProject } from "./content/SetProject"
import { AddProject } from "./content/AddProject"
import { SetUser } from "./content/SetUser"
import "../import.js"

export function Content({menu, toast}) {
    return (
        <>
        {
        menu == "dashboard" ? <Dashboard toast={toast}/> : 
        menu == "setProject" ? <SetProject toast={toast}/> : 
        menu == "addProject" ? <AddProject toast={toast}/> : 
        menu == "addUser" ? <AddUser toast={toast}/> :
        menu == "setUser" ? <SetUser toast={toast}/> :
        menu == "changePassword" ? <ChangePassword toast={toast}/> :
        menu == "addUser" ? <CreateUser toast={toast}/> :
        <Error404/>
        }
        </>
    )
}