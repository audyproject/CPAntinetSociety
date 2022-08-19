import $ from "jquery"
import "/css/dataTables.bootstrap5.min.css";
import "/js/jquery.dataTables.min.js";
import "/js/dataTables.bootstrap4.min.js";

import { CButton } from "@coreui/react";
import { useEffect, useState } from "react";
import { requestAPI } from "../../API";

export function SetProject() {

    const [userData, setUserData] = useState(false)
    const [ready, setReady] = useState(false)
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState()

    const [projectData, setProjectData] = useState()

    const request = async() => {
        const resp = await requestAPI('get', '/api/getproject')
        if(resp.status == 0){
            setProjectData(resp.data)
        }
        setReady(true)
    }

    useEffect(() => {
        if(!ready && !userData){
            request()
        }
    },[])

    return(
        <>
        {/* {"SetProject"} */}
        {!userData ? "wait" : 
        <>
        <div className="col-12">
            <div className="card mb-4">
                <div className="card-header"><strong>Set Project</strong></div>
                <div className="card-body">
                    <table id="userTable" className="table table-striped" style={{'width':'100%'}}>
                        <thead>
                            <tr>
                                <th>No</th>
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
                                        {/* <button className="btn btn-primary m-1" data-coreui-toggle="modal" data-coreui-target="#modalEdit" */}
                                        <button className="btn btn-primary m-1"
                                        onClick={() => {
                                            setId(data.id)
                                            setEmail(data.email)
                                            setUsername(data.username)
                                            setRoles(data.roles_id)
                                            setModal(true)
                                        }}>Edit</button>
                                        {data.active == 1 ? 
                                        <CButton color="danger" className="text-white" onClick={() => active(data.id, 0)}>Deactivate</CButton> :
                                        <CButton color="success" className="text-white"  onClick={() => active(data.id, 1)}>Activate</CButton>
                                        // <button className="btn btn-success text-white" data-coreui-toggle="modal" data-coreui-target="#modalActive">Deactivate</button> : 
                                        // <button className="btn btn-danger text-white" data-coreui-toggle="modal" data-coreui-target="#modalActive">Activate</button>
                                        }
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
        {toast}
        </>
        }
        </>
    )
}