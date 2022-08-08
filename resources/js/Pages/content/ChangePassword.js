import { useState } from "react"
import { requestAPI } from "../../API"

export function ChangePassword({toast}) {

    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confPass, setConfPass] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        if(newPass != confPass){
            toast("New Password and Confirm Password are not same!", "bg-danger")
        } else {
            const data = {
                'oldPassword': oldPass,
                'newPassword': newPass
            }
            const response = await requestAPI('post', "api/changepassword", data)
            if(response.status == 0){
                toast("Change Password Success", "bg-success")
                setOldPass("")
                setNewPass("")
                setConfPass("")
            } else {
                toast(response.message, "bg-danger")
            }
        }
        setLoading(false)
    }

    return(
        <>
        <div className="col-12">
            <div className="card mb-4">
                <div className="card-header"><strong>Change Password</strong></div>
                <form onSubmit={handleSubmit}>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Old Password</label>
                        <input onChange={e => setOldPass(e.target.value)} type="password" className="form-control" id="formGroupExampleInput" placeholder="Old Password"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label">New Password</label>
                        <input onChange={e => setNewPass(e.target.value)} type="password" className="form-control" id="formGroupExampleInput2" placeholder="New Password"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label">Confirm New Password</label>
                        <input onChange={e => setConfPass(e.target.value)} type="password" className="form-control" id="formGroupExampleInput3" placeholder="Confirm New Password"/>
                    </div>
                    <div className="col-6">
                        {loading ? <div className="spinner-border text-info" role="status"><span className="visually-hidden">Loading...</span></div> : <button className="btn btn-primary px-4" type="submit">Login</button>}
                    </div>
                </div>
                </form>
            </div>
        </div>
        {/* <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">Example label</label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input placeholder"/>
            </div>
            <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">Another label</label>
            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder"/>
        </div> */}
        </>
    )
}