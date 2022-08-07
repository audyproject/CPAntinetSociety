import { Dashboard } from "./content/Dashboard"
import { Error404 } from "./content/Error404"

export function Content({menu}) {
    return (
        <>
        {
        menu == "dashboard" ? <Dashboard/> : 
        menu == "change password" ? <ChangePassword/> :
        <Error404/>
        }
        </>
    )
}