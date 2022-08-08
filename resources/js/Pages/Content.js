import { ChangePassword } from "./content/ChangePassword"
import { Dashboard } from "./content/Dashboard"
import { Error404 } from "./content/Error404" 

export function Content({menu, toast}) {
    return (
        <>
        {
        menu == "dashboard" ? <Dashboard toast={toast}/> : 
        menu == "changePassword" ? <ChangePassword toast={toast}/> :
        <Error404/>
        }
        </>
    )
}