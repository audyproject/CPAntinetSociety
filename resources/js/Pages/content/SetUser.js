import { useEffect, useState } from "react"
import $ from "jquery"
import "/css/dataTables.bootstrap5.min.css";
import "/js/jquery.dataTables.min.js";
import "/js/dataTables.bootstrap4.min.js";
import { requestAPI } from "../../API";

export function SetUser({toast}) {

    const [userData, setUserData] = useState(false)
    const [ready, setReady] = useState(false)
    const [loading, setLoading] = useState(false)

    const [username, setUsername] = useState("")
    const [roles, setRoles] = useState("")
    const [email, setEmail] = useState("")
    const [id, setId] = useState(0)
    const [dataRoles, setDataRoles] = useState(false)

    const request = async () => {
        const response = await requestAPI('get','api/getuser')
        if(response.status == 0){
            console.log(response.data)
            setUserData(response.data)
        } else {
            console.warn(response.message)
        }
        setReady(true)
    }

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        const data = {
            'id': id,
            'username': username,
            'role': roles
        }
        const response = await requestAPI('post','api/edituser', data)
        if(response.status == 0){
            toast("Edit Success", "bg-success")
            // $("#modalEdit").modal('hide');
            document.getElementById("closeModal").click();
        }
        setLoading(false)
        setUserData(false)
        setReady(false)
    }

    $("#userTable").DataTable();
    useEffect(async () => {
        if(!ready && !userData){
            request()
        }
        if(!dataRoles){
            const response = await requestAPI('get','api/getrole')
            if(response.status == 0){
                setDataRoles(response.data)
            }
        }
    })

    return (
        <>
        {!userData ? "wait" : 
        <>
        <div className="col-12">
            <div className="card mb-4">
                <div className="card-header"><strong>Set User</strong></div>
                <div className="card-body">
                    <table id="userTable" className="table table-striped" style={{'width':'100%'}}>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((data, i) => {
                                return (<tr>
                                    <td>{data.username}</td>
                                    <td>{data.email}</td>
                                    <td>{data.role}</td>
                                    <td>
                                        <button className="btn btn-primary m-1" data-coreui-toggle="modal" data-coreui-target="#modalEdit"
                                        onClick={() => {
                                            setId(data.id)
                                            setEmail(data.email)
                                            setUsername(data.username)
                                            setRoles(data.role)
                                        }}>Edit</button>
                                        <button className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                        <tfoot>
                        <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
        <div className="modal fade" id="modalEdit" tabIndex="-1" aria-labelledby="exampleModalLgLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title h4" id="exampleModalLgLabel">Large modal</h5>
                    <button className="btn-close" id="closeModal" type="button" data-coreui-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="formGroupExampleInput">Email</label>
                            <input disabled value={email} className="form-control" id="formGroupExampleInput" type="text"/>
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
                            <input onChange={e => setUsername(e.target.value)} value={username} className="form-control" id="formGroupExampleInput" type="text"/>
                        </div>
                        <div className="col-6">
                            {loading ? <div className="spinner-border text-info" role="status"><span className="visually-hidden">Loading...</span></div> : <button className="btn btn-primary px-4" type="submit">Submit</button>}
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
        </>
        }
        </>
    )
}