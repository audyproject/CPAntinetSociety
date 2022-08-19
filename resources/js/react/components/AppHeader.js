// import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
    CContainer, 
    CHeader, 
    CHeaderNav, 
    CHeaderToggler,
    CAvatar,
    CBadge,
    CDropdown,
    CDropdownDivider,
    CDropdownHeader,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilMenu,
    cilBell,
    cilCreditCard,
    cilCommentSquare,
    cilEnvelopeOpen,
    cilFile,
    cilLockLocked,
    cilSettings,
    cilTask,
    cilUser,
} from '@coreui/icons'
import avatar8 from '/images/5.jpg'

export function AppHeader({setMenu, logout}) {
    const dispatch = useDispatch()
    const sidebarShow = useSelector((state) => state.sidebarShow)

    return (
        <>
        {/* {"AppHeader"} */}
        
        <CHeader position="sticky" className="mb-4">
            <CContainer fluid>
                <CHeaderNav className="ms-3">
                    {/* <AppHeaderDropdown /> */}
                    <CHeaderToggler
                        className="ps-1"
                        onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
                    >
                        <CIcon icon={cilMenu} size="lg" />
                    </CHeaderToggler>
                </CHeaderNav>
                <CHeaderNav className="ms-3">
                <CDropdown variant="nav-item">
                    <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
                        <CAvatar src={avatar8} size="md" />
                    </CDropdownToggle>
                    <CDropdownMenu className="pt-0" placement="bottom-end">
                        {/* <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
                        <CDropdownItem href="#">
                        <CIcon icon={cilBell} className="me-2" />
                        Updates
                        <CBadge color="info" className="ms-2">
                            42
                        </CBadge>
                        </CDropdownItem>
                        <CDropdownItem href="#">
                        <CIcon icon={cilEnvelopeOpen} className="me-2" />
                        Messages
                        <CBadge color="success" className="ms-2">
                            42
                        </CBadge>
                        </CDropdownItem>
                        <CDropdownItem href="#">
                        <CIcon icon={cilTask} className="me-2" />
                        Tasks
                        <CBadge color="danger" className="ms-2">
                            42
                        </CBadge>
                        </CDropdownItem>
                        <CDropdownItem href="#">
                        <CIcon icon={cilCommentSquare} className="me-2" />
                        Comments
                        <CBadge color="warning" className="ms-2">
                            42
                        </CBadge>
                        </CDropdownItem> */}
                        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
                            <CDropdownItem href="#" onClick={() => setMenu('change-password')}>
                                <CIcon icon={cilUser} className="me-2" />
                                Change Password
                            </CDropdownItem>
                            <CDropdownItem href="#" onClick={logout}>
                                <CIcon icon={cilSettings} className="me-2" />
                                Logout
                            </CDropdownItem>
                        {/* <CDropdownItem href="#">
                        <CIcon icon={cilCreditCard} className="me-2" />
                        Payments
                        <CBadge color="secondary" className="ms-2">
                            42
                        </CBadge>
                        </CDropdownItem>
                        <CDropdownItem href="#">
                        <CIcon icon={cilFile} className="me-2" />
                        Projects
                        <CBadge color="primary" className="ms-2">
                            42
                        </CBadge>
                        </CDropdownItem>
                        <CDropdownDivider />
                        <CDropdownItem href="#">
                        <CIcon icon={cilLockLocked} className="me-2" />
                        Lock Account
                        </CDropdownItem> */}
                    </CDropdownMenu>
                    </CDropdown>
                </CHeaderNav>
            </CContainer>
        </CHeader>
        </>
    )
}