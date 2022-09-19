import $ from "jquery"
import "/css/dataTables.bootstrap5.min.css";
import "/js/jquery.dataTables.min.js";
import "/js/dataTables.bootstrap4.min.js";

import { requestAPI } from "../../API";
import { useEffect, useRef, useState } from "react";
import { Toast, Toaster } from "../../components";
import { CChartLine } from "@coreui/react-chartjs";
import CIcon from "@coreui/icons-react";
import { getStyle } from '@coreui/utils'
import {
    cilArrowBottom,
} from "@coreui/icons";
import {
    CButton,
    CForm,
    CFormInput,
    CFormSelect,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CSpinner,
    CCol,
    CWidgetStatsA,
    CRow,
} from "@coreui/react";

export function Membership() {

    const [memberData, setMemberData] = useState(false)
    const [graphMembership, setGraphMembership] = useState(false)
    const [ready, setReady] = useState(false)
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState()
    const toaster = useRef()
    const [modal, setModal] = useState(false)

    const [username, setUsername] = useState("")
    const [roles, setRoles] = useState("")
    const [email, setEmail] = useState("")
    const [id, setId] = useState(0)
    const [dataRoles, setDataRoles] = useState(false)

    const request = async () => {
        const response = await requestAPI('get', 'api/getmembership')
        if (response.status == 0) {
            // console.log(response.data)
            setMemberData(response.data.dataset)
            setGraphMembership(response.data.graph)
        } else {
            // console.warn(response.message)
        }
        setReady(true)
    }

    // const request2 = async () => {
    //     const resp = await requestAPI('get', 'api/graphmember')
    //     if(resp.status == 0){
    //         console.log(resp.data)
    //         setGraphMembership(resp.data)
    //     } else {

    //     }
    // }

    const active = async (id, active) => {
        let data = {
            'id': id,
            'isactive': active
        }
        const response = await requestAPI('post', 'api/membership/active', data)
        if (response.status == 0) {
            // console.log(response.data)
            setMemberData(false)
            if (id == 1) setToast(Toaster(toaster, Toast('success', "Activate Success")))
            else setToast(Toaster(toaster, Toast('success', "Deactivate Success")))
        } else {
            setToast(Toaster(toaster, Toast('danger', response.message)))
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const data = {
            'id': id,
            'username': username,
            'role': roles
        }
        const response = await requestAPI('post', 'api/edituser', data)
        if (response.status == 0) {
            // toast("Edit Success", "bg-success")
            setToast(Toaster(toaster, Toast('success', "Edit User Success")))
            // $("#modalEdit").modal('hide');
            setModal(false)
        }
        setLoading(false)
        setUserData(false)
        setReady(false)
    }

    $("#userTable").DataTable({
        retrieve: true,
        pagingType: "full_numbers",
    });

    useEffect(async () => {
        if (!ready || !memberData) {
            request()
            // request2()
            // setMemberData(true)
        }
        // if(!dataRoles){
        //     const response = await requestAPI('get','api/getrole')
        //     if(response.status == 0){
        //         setDataRoles(response.data)
        //     }
        // }
    })

    return (
        <>
            {!memberData || !graphMembership ? <CSpinner color="primary" /> :
                <>
                    <CRow>
                        <CCol sm={12} lg={4}>
                            <CWidgetStatsA
                                className="mb-4"
                                color="primary"
                                value={
                                    <>
                                        {/* 12.345{' '}                 */}
                                        {graphMembership[2] + " "}
                                        {/* <span className="fs-6 fw-normal">
                        (-12.4% <CIcon icon={cilArrowBottom} />)
                    </span> */}
                                    </>
                                }
                                title="Total Membership"
                                chart={
                                    <CChartLine
                                        className="mt-3 mx-3"
                                        style={{ height: '70px' }}
                                        data={{
                                            // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                            // labels: graphMembership[0].reverse().map((datas, i) => {
                                            //     return datas.date
                                            // }),
                                            datasets: [
                                                {
                                                    label: 'Join Membership',
                                                    backgroundColor: 'transparent',
                                                    borderColor: 'rgba(255,255,255,.55)',
                                                    pointBackgroundColor: getStyle('--cui-primary'),
                                                    // data: [65, 59, 84, 84, 51, 55, 40],
                                                    // data: graphMembership[0].reverse().map((datas, i) => {
                                                    //     return datas.views
                                                    // })
                                                },
                                            ],
                                        }}
                                        options={{
                                            plugins: {
                                                legend: {
                                                    display: false,
                                                },
                                            },
                                            maintainAspectRatio: false,
                                            scales: {
                                                x: {
                                                    grid: {
                                                        display: false,
                                                        drawBorder: false,
                                                    },
                                                    ticks: {
                                                        display: false,
                                                    },
                                                },
                                                y: {
                                                    min: 0,
                                                    max: 52,
                                                    display: false,
                                                    grid: {
                                                        display: false,
                                                    },
                                                    ticks: {
                                                        display: false,
                                                    },
                                                },
                                            },
                                            elements: {
                                                line: {
                                                    borderWidth: 1,
                                                    tension: 0.4,
                                                },
                                                point: {
                                                    radius: 4,
                                                    hitRadius: 10,
                                                    hoverRadius: 4,
                                                },
                                            },
                                        }}
                                    />
                                }
                            />
                        </CCol>
                        <CCol sm={12} lg={4}>
                            <CWidgetStatsA
                                className="mb-4"
                                color="info"
                                value={
                                    <>
                                        12.345{' '}
                                        {/* {graphMembership[2]+ " "} */}
                                        {/* <span className="fs-6 fw-normal">
                        (-12.4% <CIcon icon={cilArrowBottom} />)
                    </span> */}
                                    </>
                                }
                                title="Today"
                                chart={
                                    <CChartLine
                                        className="mt-3 mx-3"
                                        style={{ height: '70px' }}
                                        data={{
                                            // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                            labels: graphMembership[0].reverse().map((datas, i) => {
                                                return datas.date
                                            }),
                                            datasets: [
                                                {
                                                    label: 'My First dataset',
                                                    backgroundColor: 'transparent',
                                                    borderColor: 'rgba(255,255,255,.55)',
                                                    pointBackgroundColor: getStyle('--cui-primary'),
                                                    // data: [65, 59, 84, 84, 51, 55, 40],
                                                    data: graphMembership[0].reverse().map((datas, i) => {
                                                        return datas.views
                                                    })
                                                },
                                            ],
                                        }}
                                        options={{
                                            plugins: {
                                                legend: {
                                                    display: false,
                                                },
                                            },
                                            maintainAspectRatio: false,
                                            scales: {
                                                x: {
                                                    grid: {
                                                        display: false,
                                                        drawBorder: false,
                                                    },
                                                    ticks: {
                                                        display: false,
                                                    },
                                                },
                                                y: {
                                                    min: 0,
                                                    max: 52,
                                                    display: false,
                                                    grid: {
                                                        display: false,
                                                    },
                                                    ticks: {
                                                        display: false,
                                                    },
                                                },
                                            },
                                            elements: {
                                                line: {
                                                    borderWidth: 1,
                                                    tension: 0.4,
                                                },
                                                point: {
                                                    radius: 4,
                                                    hitRadius: 10,
                                                    hoverRadius: 4,
                                                },
                                            },
                                        }}
                                    />
                                }
                            />
                        </CCol>
                        <CCol sm={12} lg={4}>
                            <CWidgetStatsA
                                className="mb-4"
                                color="danger"
                                value={
                                    <>
                                        12.345{' '}
                                        {/* <span className="fs-6 fw-normal">
                        (-12.4% <CIcon icon={cilArrowBottom} />)
                    </span> */}
                                    </>
                                }
                                title="Monthly"
                                chart={
                                    <CChartLine
                                        className="mt-3 mx-3"
                                        style={{ height: '70px' }}
                                        data={{
                                            // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                            labels: graphMembership[1].reverse().map((datas, i) => {
                                                return datas.date
                                            }),
                                            datasets: [
                                                {
                                                    label: 'My First dataset',
                                                    backgroundColor: 'transparent',
                                                    borderColor: 'rgba(255,255,255,.55)',
                                                    pointBackgroundColor: getStyle('--cui-primary'),
                                                    // data: [65, 59, 84, 84, 51, 55, 40],
                                                    data: graphMembership[1].reverse().map((datas, i) => {
                                                        return datas.views
                                                    })
                                                },
                                            ],
                                        }}
                                        options={{
                                            plugins: {
                                                legend: {
                                                    display: false,
                                                },
                                            },
                                            maintainAspectRatio: false,
                                            scales: {
                                                x: {
                                                    grid: {
                                                        display: false,
                                                        drawBorder: false,
                                                    },
                                                    ticks: {
                                                        display: false,
                                                    },
                                                },
                                                y: {
                                                    min: 30,
                                                    max: 89,
                                                    display: false,
                                                    grid: {
                                                        display: false,
                                                    },
                                                    ticks: {
                                                        display: false,
                                                    },
                                                },
                                            },
                                            elements: {
                                                line: {
                                                    borderWidth: 1,
                                                    tension: 0.4,
                                                },
                                                point: {
                                                    radius: 4,
                                                    hitRadius: 10,
                                                    hoverRadius: 4,
                                                },
                                            },
                                        }}
                                    />
                                }
                            />
                        </CCol>
                    </CRow>
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-header"><strong>Data Membership</strong></div>
                            <div className="card-body">
                                <table id="userTable" className="table table-striped" style={{ 'width': '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Join Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {memberData.map((data, i) => {
                                            return (<tr>
                                                <td>{i + 1}</td>
                                                <td>{data.nama}</td>
                                                <td>{data.email}</td>
                                                <td>{data.telpon}</td>
                                                <td>{data.created_at.replace(/[A-Z]/g, ' ').split(".")[0]}</td>
                                                <td>{data.isactive ?
                                                    <CButton color="danger" onClick={() => active(data.id, 0)}>Deactivate</CButton> :
                                                    <CButton color="success" onClick={() => active(data.id, 1)}>Activate</CButton>}</td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <CModal visible={modal} backdrop={false} onClose={() => setModal(false)}>
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
                    {/* <div className="modal fade" id="modalEdit" tabIndex="-1" aria-labelledby="exampleModalLgLabel" aria-hidden="true">
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
                            <select onChange={e => setRoles(e.target.value)} value={roles} className="form-select" aria-label="Default select example">
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
        </div> */}
                    {toast}
                </>
            }
        </>
    )
}