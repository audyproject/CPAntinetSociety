import React, { useEffect, useRef, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
  CToaster,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { requestAPI } from '../API'
import { Toast, Toaster } from '../components/index'

export const ForgotPassword = ({ setLogin, login, sendToast, setMenu, Toast, Toaster, setToast, toaster, toast }) => {

  const [loading, setLoading] = useState(false)
  // const [toast, setToast] = useState()
  // const toaster = useRef()

  const [email, setEmail] = useState()

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
    let data = {
      "email": email
    }
    try {
      const resp = await requestAPI("post", "api/forgotpassword", data)
      if (resp.status == 0) {
        setToast(
          Toaster(toaster, Toast('success', "Forgot Password Success!"))
        )
        setLogin(1)
      } else {
        setToast(Toaster(toaster, Toast('danger', resp.message)))
      }

      console.log(resp.message)
      setLoading(false)
    } catch (error) {
      window.location.reload
    }
  }

  //   useEffect(() => {
  //     if(sendToast == "logout"){
  //       setToast(Toaster(toaster, Toast('success', "Logout Success!")))
  //     }
  //   },[])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Forgot Password</h1>
                    <p className="text-medium-emphasis">We will send to your email</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" autoComplete="email" required />
                    </CInputGroup>
                    {/* <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" autoComplete="current-password" required/>
                    </CInputGroup> */}
                    <CRow>
                      <CCol xs={8}>
                        <CButton color="link" onClick={() => setLogin(1)} className="px-0">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={4}>
                        {loading ?
                          <CSpinner color='primary' className='float-end' /> :
                          <CButton type='submit' color="primary" className="float-end px-4">
                            Submit
                          </CButton>
                        }
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      {/* {toast} */}
      {/* <CToaster ref={toaster} push={toast} placement="top-end" /> */}
    </div>
  )
}

export default ForgotPassword