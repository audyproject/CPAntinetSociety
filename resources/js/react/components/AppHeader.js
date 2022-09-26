import { useDispatch, useSelector } from 'react-redux'
import {
    CContainer,
    CHeader,
    CHeaderNav,
    CHeaderToggler,
    CAvatar,
    CDropdown,
    CDropdownHeader,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilMenu,
    cilSettings,
    cilUser,
} from '@coreui/icons'
import ANSHugeBlack from '/antinet/logo/ANS huge logo space - black.png'

export function AppHeader({ setMenu, logout, username }) {
    const dispatch = useDispatch()
    const sidebarShow = useSelector((state) => state.sidebarShow)

    return (
        <>
            <CHeader position="sticky" className="mb-4">
                <CContainer fluid>
                    <CHeaderToggler
                        className="ps-1"
                        onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
                    >
                        <CIcon icon={cilMenu} size="lg" />
                    </CHeaderToggler>
                    {/* <CHeaderNav className="d-none d-md-flex me-auto">
                    </CHeaderNav> */}
                    <CHeaderNav className="ms-3">
                        <CNavItem className='d-flex align-items-center'>Welcome, {username}</CNavItem>
                        <CDropdown variant="nav-item">
                            <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
                                <CAvatar src={ANSHugeBlack} size="md" />
                            </CDropdownToggle>
                            <CDropdownMenu className="pt-0" placement="bottom-end">
                                <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
                                <CDropdownItem href="#" onClick={() => setMenu('change-password')}>
                                    <CIcon icon={cilUser} className="me-2" />
                                    Change Password
                                </CDropdownItem>
                                <CDropdownItem href="#" onClick={logout}>
                                    <CIcon icon={cilSettings} className="me-2" />
                                    Logout
                                </CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    </CHeaderNav>
                </CContainer>
            </CHeader>
        </>
    )
}