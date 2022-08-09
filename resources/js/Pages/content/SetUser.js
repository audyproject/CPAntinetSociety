import { useEffect, useState } from "react"
import $ from "jquery";
import "/css/dataTables.bootstrap5.min.css";
import "/js/jquery.dataTables.min.js";
import "/js/dataTables.bootstrap4.min.js";
import { requestAPI } from "../../API";

export function SetUser() {

    const [userData, setUserData] = useState(false)
    const [ready, setReady] = useState(false)

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

    useEffect(async () => {
        if(!ready && !userData){
            request()
        }
        $('#userTable').DataTable();
    })

    return (
        <>
        {!userData ? "wait" : 
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
                                        <button className="btn btn-primary m-1">Edit</button>
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
        }
        </>
    )
}