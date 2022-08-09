import { useEffect, useState } from "react"
import { requestAPI } from "../../API"

export function AddUser({toast}){

    const [dataRoles, setDataRoles] = useState(false)
    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [roles, setRoles] = useState(0)
    const [username, setUsername] = useState("")

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        const data = {
            'email': email,
            'password': pass,
            'role': roles,
            'username': username
        }
        const response = await requestAPI('post', 'api/createuser', data)
        if(response.status == 0){
            toast("Add User Success", "bg-success")
        } else {
            toast(response.message, "bg-danger")
        }
        console.log(email + " " + pass + " " + roles + " " + username)
        setLoading(false)
    }

    useEffect(async () => {
        if(!dataRoles){
            const response = await requestAPI('get','api/getrole')
            if(response.status == 0){
                setDataRoles(response.data)
            }
        }
    })

    return (
        <>
        <div className="col-12">
            <div className="card mb-4">
                <div className="card-header"><strong>Create User</strong></div>
                <form onSubmit={handleSubmit}>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="formGroupExampleInput">Email</label>
                        <input onChange={e => setEmail(e.target.value)} className="form-control" id="formGroupExampleInput" type="text" placeholder="Example input placeholder"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="formGroupExampleInput2">Password</label>
                        <input onChange={e => setPass(e.target.value)} className="form-control" id="formGroupExampleInput2" type="password" placeholder="Another input placeholder"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="formGroupExampleInput2">Roles</label>
                        <select onChange={e => setRoles(e.target.value)} className="form-select" aria-label="Default select example">
                            <option>Choose Roles</option>
                            {!dataRoles ? <></> : 
                            dataRoles.map((datas, i) => {
                                return <option value={datas.id}>{datas.role}</option>
                            })
                            }
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="formGroupExampleInput">Username</label>
                        <input onChange={e => setUsername(e.target.value)} className="form-control" id="formGroupExampleInput" type="text" placeholder="Username"/>
                    </div>
                    <div className="col-6">
                        {loading ? <div className="spinner-border text-info" role="status"><span className="visually-hidden">Loading...</span></div> : <button className="btn btn-primary px-4" type="submit">Submit</button>}
                    </div>
                </div>
                </form>
            </div>
        </div>
        </>
    )
}