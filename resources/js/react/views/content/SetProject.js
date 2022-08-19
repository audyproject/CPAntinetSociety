import $ from "jquery"
import "/css/dataTables.bootstrap5.min.css";
import "/js/jquery.dataTables.min.js";
import "/js/dataTables.bootstrap4.min.js";

import { CButton } from "@coreui/react";
import { useEffect, useState } from "react";
import { requestAPI } from "../../API";
import { Toast, Toaster } from "../../components";

export function SetProject() {

    const [projectData, setProjectData] = useState(false)
    const [ready, setReady] = useState(false)
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState()

    // const [projectData, setProjectData] = useState()

    const request = async() => {
        const resp = await requestAPI('get', '/api/getproject')
        if(resp.status == 0){
            setProjectData(resp.data)
        }
        setReady(true)
    }

    $("#projectTable").DataTable();
    useEffect(() => {
        if(!ready && !projectData){
            request()
        }
    },[])

    const doSpotlight = async (id, name) => {
        let data = {
            "id": id
        }
        const resp = await requestAPI('post', '/api/spotlight', data)
        if(resp.status == 0){
            setToast(Toaster(toaster, Toast('success', `Spotlight ${name} success!`)))
        } else {
            setToast(Toaster(toaster, Toast('danger', resp.message)))
        }
    }

    return(
        <>
        {/* {"SetProject"} */}
        {!projectData ? "wait" : 
        <>
        <div className="col-12">
            <div className="card mb-4">
                <div className="card-header"><strong>Set Project</strong></div>
                <div className="card-body">
                    <table id="projectTable" className="table table-striped" style={{'width':'100%'}}>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Spotlight</th>
                                <th>Link</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectData.map((data, i) => {
                                return (<tr>
                                    <td>{i+1}</td>
                                    <td>{data.name}</td>
                                    <td>{data.spotlight ? "yes" : "no"}</td>
                                    {/* <td>{data.link}</td> */}
                                    <td><a href={data.link} target="_blank">{data.link}</a></td>
                                    <td>
                                        {/* <button className="btn btn-primary m-1" data-coreui-toggle="modal" data-coreui-target="#modalEdit" */}
                                        <button className="btn btn-primary m-1"
                                        onClick={() => {
                                            // setId(data.id)
                                            // setEmail(data.email)
                                            // setUsername(data.username)
                                            // setRoles(data.roles_id)
                                            // setModal(true)
                                        }}>Edit</button>
                                        {!data.spotlight && <CButton color="success" className="text-white" onClick={() => doSpotlight(data.id, data.name)}/>}
                                        {/* {data.active == 1 ? 
                                        <CButton color="danger" className="text-white" onClick={() => active(data.id, 0)}>Deactivate</CButton> :
                                        <CButton color="success" className="text-white"  onClick={() => active(data.id, 1)}>Activate</CButton>
                                        // <button className="btn btn-success text-white" data-coreui-toggle="modal" data-coreui-target="#modalActive">Deactivate</button> : 
                                        // <button className="btn btn-danger text-white" data-coreui-toggle="modal" data-coreui-target="#modalActive">Activate</button>
                                        } */}
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Spotlight</th>
                                <th>Link</th>
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