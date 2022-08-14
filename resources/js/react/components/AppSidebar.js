import { 
    CBadge, 
    CNav, 
    CNavGroup, 
    CNavItem, 
    CNavLink, 
    CNavTitle, 
    CSidebar, 
    CSidebarBrand, 
    CSidebarNav, 
    CSidebarToggler 
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import {
    cilSpeedometer,
    cilPuzzle,
    cilContact,
    cilAccountLogout,
    cilRunning,
    cilPeople,
} from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'

export function AppSidebar({menu, setMenu, logout}) {
    const dispatch = useDispatch()
    const unfoldable = useSelector((state) => state.sidebarUnfoldable)
    const sidebarShow = useSelector((state) => state.sidebarShow)

    return (
        <>
        <CSidebar position="fixed" unfoldable={unfoldable} visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch({ type: 'set', sidebarShow: visible })
            }}>
            <CSidebarBrand>Antinet Society</CSidebarBrand>
            <CSidebarNav>
                <CNavItem href="#" onClick={() => setMenu("dashboard")}>
                    <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
                    Dashboard
                </CNavItem>
                <CNavGroup toggler={<><CIcon customClassName="nav-icon" icon={cilRunning} /> {"Project"}</>}>
                    <CNavItem href="#" onClick={() => setMenu("add-project")}>
                        <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Add Project
                    </CNavItem>
                    <CNavItem href="#" onClick={() => setMenu("set-project")}>
                        <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Set Project
                    </CNavItem>
                </CNavGroup>
                <CNavItem href="#" onClick={() => setMenu("subscription")}>
                    <CIcon customClassName="nav-icon" icon={cilContact} />
                    Subscription
                </CNavItem>
                <CNavTitle>Admin</CNavTitle>
                <CNavGroup toggler={<><CIcon customClassName="nav-icon" icon={cilPeople} /> {"User Management"}</>}>
                    <CNavItem href="#" onClick={() => setMenu("add-user")}>
                        <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Add User
                    </CNavItem>
                    <CNavItem href="#" onClick={() => setMenu("set-user")}>
                        <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Set User
                    </CNavItem>
                </CNavGroup>
                <CNavTitle>Settings</CNavTitle>
                <CNavItem href="#" onClick={() => setMenu("change-password")}>
                    <CIcon customClassName="nav-icon" icon={cilContact} />
                    Change Password
                </CNavItem>
                <CNavItem href="#" onClick={logout}>
                    <CIcon customClassName="nav-icon" icon={cilAccountLogout} />
                    Logout
                </CNavItem>
                {/* <CNavTitle>Nav Title</CNavTitle>
                <CNavItem href="#">
                    <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
                    Nav item
                </CNavItem>
                <CNavItem href="#">
                    <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
                    With badge
                    <CBadge color="primary ms-auto">NEW</CBadge>
                </CNavItem>
                <CNavGroup toggler="Nav dropdown">
                <CNavItem href="#">
                    <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown item
                </CNavItem>
                <CNavItem href="#">
                    <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown item
                </CNavItem>
                </CNavGroup> */}
            </CSidebarNav>
            {/* <CSidebarToggler /> */}
        </CSidebar>
        </>
    )
}