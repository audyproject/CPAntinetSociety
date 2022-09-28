import $ from "jquery"
import "/css/dataTables.bootstrap5.min.css";
import "/js/jquery.dataTables.min.js";
import "/js/dataTables.bootstrap4.min.js";

import { requestAPI } from "../../API";
import { useEffect, useRef, useState } from "react";
import { Toast, Toaster } from "../../components";
import { CButton, CForm, CFormInput, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CSpinner } from "@coreui/react";
import { set } from "lodash";

export function SetUser({ sessionData, Toast, Toaster, toaster, setToast }) {

    const [userData, setUserData] = useState(false)
    const [ready, setReady] = useState(false)
    const [loading, setLoading] = useState(false)
    // const [toast, setToast] = useState()
    // const toaster = useRef()
    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [active, setActive] = useState(false)
    const [name, setName] = useState(false)

    const [username, setUsername] = useState("")
    const [roles, setRoles] = useState("")
    const [email, setEmail] = useState("")
    const [id, setId] = useState(0)
    const [dataRoles, setDataRoles] = useState(false)

    const request = async () => {
        const response = await requestAPI('get', 'api/user/get')
        if (response.status == 0) {
            setUserData(response.data)
        } else {

        }
        setReady(true)
        $("#userTable").DataTable({
            retrieve: true,
            pagingType: "full_numbers",
        });
    }

    const activing = (id, active, name) => {
        setId(id)
        setActive(active)
        setName(name)
        setModal2(true)
    }

    const activate = async (id, active) => {
        setLoading(true)
        let data = {
            'id': id,
            'active': active
        }
        const response = await requestAPI('post', 'api/user/activate', data)
        if (response.status == 0) {
            if (active == 1) setToast(Toaster(toaster, Toast('success', "Activate Success")))
            else setToast(Toaster(toaster, Toast('success', "Deactivate Success")))
            setModal2(false)
            setReady(false)
            setUserData(false)
        } else {
            setToast(Toaster(toaster, Toast('danger', response.message)))
        }
        setLoading(false)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const data = {
            'id': id,
            'username': username,
            'role': roles
        }
        const response = await requestAPI('post', 'api/user/edit', data)
        if (response.status == 0) {
            setToast(Toaster(toaster, Toast('success', "Edit User Success")))
            setModal(false)
            setReady(false)
            setUserData(false)
        } else {
            setToast(Toaster(toaster, Toast('danger', response.message)))
        }
        setLoading(false)
    }

    useEffect(async () => {
        if (!ready || !userData) {
            request()
        }
        if (!dataRoles) {
            const response = await requestAPI('get', 'api/user/getrole')
            if (response.status == 0) {
                setDataRoles(response.data)
            }
        }
    },[ready])

    return (
        <>
            {!ready ? <CSpinner color="primary"/> :
                <>
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-header"><strong>Set User</strong></div>
                            <div className="card-body">
                                <table id="userTable" className="table table-striped" style={{ 'width': '100%' }}>
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
                                                    {/* <button className="btn btn-primary m-1" data-coreui-toggle="modal" data-coreui-target="#modalEdit" */}
                                                    <button className="btn btn-primary m-1"
                                                        onClick={() => {
                                                            setId(data.id)
                                                            setEmail(data.email)
                                                            setUsername(data.username)
                                                            setRoles(data.roles_id)
                                                            setModal(true)
                                                        }}>Edit</button>
                                                    {
                                                        data.role != sessionData.role && data.active == 1 &&
                                                        <CButton color="danger" className="text-white" onClick={() => activing(data.id, 0, data.username)}>Deactivate</CButton>
                                                    }
                                                    {
                                                        data.role != sessionData.role && data.active == 0 &&
                                                        <CButton color="success" className="text-white" onClick={() => activing(data.id, 1, data.username)}>Activate</CButton>
                                                    }


                                                </td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <CModal visible={modal} backdrop={true} onClose={() => setModal(false)}>
                        <CModalHeader>
                            <CModalTitle>Edit User</CModalTitle>
                        </CModalHeader>
                        <CForm onSubmit={handleSubmit}>
                            <CModalBody>
                                <CFormInput
                                    className='mb-3'
                                    type="email"
                                    id="email"
                                    label="Email"
                                    placeholder="Input here..."
                                    // text="Must be 8-20 characters long."
                                    aria-describedby="exampleFormControlInputHelpInline"
                                    value={email}
                                    disabled
                                />
                                <CFormSelect label="Roles" className="mb-3" onChange={e => setRoles(e.target.value)} defaultValue={roles}>
                                    {dataRoles && dataRoles.map((datas, i) => {
                                        return <option value={datas.id} key={datas.id}>{datas.role}</option>
                                    })}
                                </CFormSelect>
                                <CFormInput
                                    className='mb-3'
                                    type="text"
                                    id="username"
                                    label="Username"
                                    placeholder="Input here..."
                                    value={username}
                                    // text="Must be 8-20 characters long."
                                    aria-describedby="exampleFormControlInputHelpInline"
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                />
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setModal(false)}>
                                    Close
                                </CButton>
                                {loading ? <CSpinner color="primary" /> : <CButton color="primary" type="submit">Save changes</CButton>}
                            </CModalFooter>
                        </CForm>
                    </CModal>
                    <CModal alignment="center" backdrop={true} visible={modal2} onClose={() => setModal2(false)}>
                        <CModalHeader></CModalHeader>
                        <CForm onSubmit={() => activate(id, active)}>
                            <CModalBody>
                                <p>Are You Sure Want To {active == 1 ? "Deactivate" : "Activate"} User {name}? </p>
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setModal2(false)}>
                                    No
                                </CButton>
                                {loading ? <CSpinner color="primary" /> : <CButton color="primary" type="submit">Yes</CButton>}
                            </CModalFooter>
                        </CForm>
                    </CModal>
                </>
            }
        </>
    )
}