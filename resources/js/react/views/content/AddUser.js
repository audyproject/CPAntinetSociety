import { 
    CButton, 
    CCard, 
    CCardBody, 
    CCardHeader, 
    CForm, 
    CFormInput, 
    CFormSelect, 
    CSpinner 
} from "@coreui/react";
import { useEffect, useRef, useState } from "react";
import { Toast, Toaster } from "../../components";
import { requestAPI } from "../../API";

export function AddUser(){

    const [dataRoles, setDataRoles] = useState(false)
    const [loading, setLoading] = useState(false)
    const toaster = useRef()
    const [toast, setToast] = useState()

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [roles, setRoles] = useState(0)
    const [username, setUsername] = useState("")

    const select = () => {
        if(!dataRoles){
            return []
        } else {
            dataRoles.map((datas, i) => {
                return {label: datas.roles, value: datas.value}
            })
        }
    }

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
            setToast(Toaster(toaster, Toast('success', "Add User Success")))
        } else {
            setToast(Toaster(toaster, Toast('danger', response.message)))
        }
        console.log(email + " " + pass + " " + roles + " " + username)
        setLoading(false)
    }

    useEffect(async () => {
        if(!dataRoles){
            const response = await requestAPI('get','api/getrole')
            if(response.status == 0){
                console.log(response.data)
                setDataRoles(response.data)
            }
        }
    },[])

    return(
        <>
        <CCard>
            <CCardHeader><strong>Add User</strong></CCardHeader>
            <CCardBody>
                <CForm onSubmit={handleSubmit}>
                    <CFormInput
                        className='mb-3'
                        type="email"
                        id="email"
                        label="Email"
                        placeholder="Input here..."
                        // text="Must be 8-20 characters long."
                        aria-describedby="exampleFormControlInputHelpInline"
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <CFormInput
                        className='mb-3'
                        type="password"
                        id="password"
                        label="Password"
                        placeholder="Input here..."
                        // text="Must be 8-20 characters long."
                        aria-describedby="exampleFormControlInputHelpInline"
                        onChange={e => setPass(e.target.value)}
                        required
                    />
                    <CFormSelect label="Roles" className="mb-3" onChange={e => setRoles(e.target.value)} defaultValue={0}>
                        <option disabled value={0}>Open this select menu</option>
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
                        // text="Must be 8-20 characters long."
                        aria-describedby="exampleFormControlInputHelpInline"
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                    {loading ?
                    <CSpinner color='primary'/> : 
                    <CButton className='mt-3' type="submit" color="primary">Submit</CButton>}
                </CForm>
            </CCardBody>
        </CCard>
        {toast}
        </>
    )
}