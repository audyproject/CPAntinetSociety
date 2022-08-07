import { useEffect } from "react"

export function Header() {

    return (
        <>
        <header className="header header-sticky mb-4">
            <div className="container-fluid">
            <button className="header-toggler px-md-0 me-md-3" type="button" onClick={() => {coreui.Sidebar.getInstance(document.querySelector('#sidebar')).toggle()}}>
                <svg className="icon icon-lg">
                <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-menu"></use>
                </svg>
            </button><a className="header-brand d-md-none" href="#">
                <svg width="118" height="46" alt="CoreUI Logo">
                <use xlinkHref="assets/brand/coreui.svg#full"></use>
                </svg></a>
            <ul className="header-nav d-none d-md-flex">
                <li className="nav-item"><a className="nav-link" href="#">Dashboard</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Users</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Settings</a></li>
            </ul>
            <ul className="header-nav ms-auto">
                <li className="nav-item"><a className="nav-link" href="#">
                    <svg className="icon icon-lg">
                    <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-bell"></use>
                    </svg></a></li>
                <li className="nav-item"><a className="nav-link" href="#">
                    <svg className="icon icon-lg">
                    <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-list-rich"></use>
                    </svg></a></li>
                <li className="nav-item"><a className="nav-link" href="#">
                    <svg className="icon icon-lg">
                    <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-envelope-open"></use>
                    </svg></a></li>
            </ul>
            <ul className="header-nav ms-3">
                <li className="nav-item dropdown"><a className="nav-link py-0" data-coreui-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                    <div className="avatar avatar-md"><img className="avatar-img" src="assets/img/avatars/8.jpg" alt="user@email.com"/></div>
                </a>
                <div className="dropdown-menu dropdown-menu-end pt-0">
                    <div className="dropdown-header bg-light py-2">
                    <div className="fw-semibold">Account</div>
                    </div><a className="dropdown-item" href="#">
                    <svg className="icon me-2">
                        <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-bell"></use>
                    </svg> Updates<span className="badge badge-sm bg-info ms-2">42</span></a><a className="dropdown-item" href="#">
                    <svg className="icon me-2">
                        <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-envelope-open"></use>
                    </svg> Messages<span className="badge badge-sm bg-success ms-2">42</span></a><a className="dropdown-item" href="#">
                    <svg className="icon me-2">
                        <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-task"></use>
                    </svg> Tasks<span className="badge badge-sm bg-danger ms-2">42</span></a><a className="dropdown-item" href="#">
                    <svg className="icon me-2">
                        <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-comment-square"></use>
                    </svg> Comments<span className="badge badge-sm bg-warning ms-2">42</span></a>
                    <div className="dropdown-header bg-light py-2">
                    <div className="fw-semibold">Settings</div>
                    </div><a className="dropdown-item" href="#">
                    <svg className="icon me-2">
                        <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-user"></use>
                    </svg> Profile</a><a className="dropdown-item" href="#">
                    <svg className="icon me-2">
                        <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-settings"></use>
                    </svg> Settings</a><a className="dropdown-item" href="#">
                    <svg className="icon me-2">
                        <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-credit-card"></use>
                    </svg> Payments<span className="badge badge-sm bg-secondary ms-2">42</span></a><a className="dropdown-item" href="#">
                    <svg className="icon me-2">
                        <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-file"></use>
                    </svg> Projects<span className="badge badge-sm bg-primary ms-2">42</span></a>
                    <div className="dropdown-divider"></div><a className="dropdown-item" href="#">
                    <svg className="icon me-2">
                        <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-lock-locked"></use>
                    </svg> Lock Account</a><a className="dropdown-item" href="#">
                    <svg className="icon me-2">
                        <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-account-logout"></use>
                    </svg> Logout</a>
                </div>
                </li>
            </ul>
            </div>
            <div className="header-divider"></div>
            <div className="container-fluid">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb my-0 ms-2">
                <li className="breadcrumb-item">
                    {/* <!-- if breadcrumb is single--> */}<span>Home</span>
                </li>
                <li className="breadcrumb-item active"><span>Dashboard</span></li>
                </ol>
            </nav>
            </div>
        </header>
        </>
    )
}