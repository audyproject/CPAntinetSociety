import { CToast, CToastBody, CToastClose, CToaster } from '@coreui/react'

export const Toast = ((color, message) => (
    <CToast autohide={true} visible={true} color={color} delay={5000} className="text-white align-items-center">
      <div className="d-flex">
        <CToastBody>{message}</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  ))

export const Toaster = ((toaster, toast) => (
  <CToaster ref={toaster} push={toast} placement="top-end" />
))