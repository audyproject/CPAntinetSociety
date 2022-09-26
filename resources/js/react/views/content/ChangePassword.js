import {
    CForm,
    CFormInput,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CButton,
    CSpinner,
} from '@coreui/react'
import { useRef, useState } from 'react'
import { Toast, Toaster } from '../../components/index'
import { requestAPI } from '../../API'

export function ChangePassword({Toast, Toaster, toaster, setToast}){
    const [loading, setLoading] = useState(false)
    // const [toast, setToast] = useState()
    // const toaster = useRef()

    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confPass, setConfPass] = useState("")

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        if(oldPass == false || newPass == false) setToast(Toaster(toaster, Toast('danger', "Data cannot be empty")))
        else if(newPass != confPass) setToast(Toaster(toaster, Toast('danger', "Please Check Your Data!")))
        else {
            const data = {
                'oldPassword': oldPass,
                'newPassword': newPass
            }
            const response = await requestAPI('post', "api/user/changepassword", data)
            if(response.status == 0){
                setToast(Toaster(toaster, Toast('success', "Change Password Success")))
                document.getElementById('old-password').value = ''
                setOldPass(false)
                document.getElementById('new-password').value = ''
                setNewPass(false)
                document.getElementById('confirm-password').value = ''
                setConfPass(false)
            } else {
                setToast(Toaster(toaster, Toast('danger', response.message)))
            }        
        }
        setLoading(false)
    }

    return(
        <>
        <CCard>
            <CCardHeader><strong>Change Password</strong></CCardHeader>
            <CCardBody>
                <CForm onSubmit={handleSubmit}>
                    <CFormInput
                        className='mb-3'
                        type="password"
                        id="old-password"
                        label="Old Password"
                        placeholder="Input here..."
                        // text="Must be 8-20 characters long."
                        aria-describedby="exampleFormControlInputHelpInline"
                        onChange={e => setOldPass(e.target.value)}
                    />
                    <CFormInput
                        className='mb-3'
                        type="password"
                        id="new-password"
                        label="New Password"
                        placeholder="Input here..."
                        // text="Must be 8-20 characters long."
                        aria-describedby="exampleFormControlInputHelpInline"
                        onChange={e => setNewPass(e.target.value)}
                    />
                    <CFormInput
                        className=''
                        type="password"
                        id="confirm-password"
                        label="Confirm Password"
                        placeholder="Input here..."
                        // text="Must be 8-20 characters long."
                        aria-describedby="exampleFormControlInputHelpInline"
                        onChange={e => setConfPass(e.target.value)}
                        invalid={newPass != confPass}
                        feedback={newPass != confPass && "Not Equal to New Password"}
                        // {...newPass != confPass && }
                    />
                    {loading ?
                    <CSpinner color='primary'/> : 
                    <CButton className='mt-3' color="primary" type="submit">Submit</CButton>}
                </CForm>
            </CCardBody>
        </CCard>
        </>
    )
}