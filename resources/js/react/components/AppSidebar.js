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
    CSidebarToggler,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
    cilSpeedometer,
    cilPuzzle,
    cilContact,
    cilAccountLogout,
    cilRunning,
    cilPeople,
} from "@coreui/icons";
import { useDispatch, useSelector } from "react-redux";

// menu sidebar, listed by object
const sidebarMenu = [
    {
        name: "Dashboard",
        url: "dashboard",
        icon: cilSpeedometer,
    },
    {
        name: "Project",
        url: "project",
        icon: cilRunning,
        categories: [
            {
                name: "Add Project",
                url: "add-project",
                icon: cilPuzzle,
            },
            {
                name: "Set Project",
                url: "set-project",
                icon: cilPuzzle,
            },
        ],
    },
    {
        name: "Subscription",
        url: "subscription",
        icon: cilContact,
    },
    {
        name: "Membership",
        url: "membership",
        icon: cilContact,
    },
    {
        title: "Admin",
        name: "User Management",
        url: "user-management",
        icon: cilPeople,
        categories: [
            {
                name: "Add User",
                url: "add-user",
                icon: cilPuzzle,
            },
            {
                name: "Set User",
                url: "set-user",
                icon: cilPuzzle,
            },
        ],
    },
    {
        title: "Settings",
        name: "Change Password",
        url: "change-password",
        icon: cilContact,
    },
    {
        name: "Logout",
        url: "logout",
        icon: cilAccountLogout,
    },
];

export function AppSidebar({ menu, setMenu, logout }) {
    const dispatch = useDispatch();
    const unfoldable = useSelector((state) => state.sidebarUnfoldable);
    const sidebarShow = useSelector((state) => state.sidebarShow);

    let menuArray = [];
    // iterate every sidebar menu item
    for (let i = 0; i < sidebarMenu.length; i++) {
        {
            sidebarMenu[i].title &&
                menuArray.push(
                    <CNavTitle key={i}>{sidebarMenu[i].title}</CNavTitle>
                );
        }
        {
            !sidebarMenu[i].categories &&
                menuArray.push(
                    <CNavItem
                        href="#"
                        onClick={() => setMenu(sidebarMenu[i].url)}
                    >
                        <CIcon
                            customClassName="nav-icon"
                            icon={sidebarMenu[i].icon}
                        />
                        {sidebarMenu[i].name}
                    </CNavItem>
                );
        }
        {
            sidebarMenu[i].categories &&
                menuArray.push(
                    <CNavGroup
                        toggler={
                            <>
                                <CIcon
                                    customClassName="nav-icon"
                                    icon={sidebarMenu[i].icon}
                                />
                                {sidebarMenu[i].name}
                            </>
                        }
                    >
                        <CNavItem
                            href="#"
                            onClick={() =>
                                setMenu(sidebarMenu[i].categories[0].url)
                            }
                        >
                            <CIcon
                                customClassName="nav-icon"
                                icon={sidebarMenu[i].categories[0].icon}
                            />
                            {sidebarMenu[i].categories[0].name}
                        </CNavItem>
                        <CNavItem
                            href="#"
                            onClick={() =>
                                setMenu(sidebarMenu[i].categories[1].url)
                            }
                        >
                            <CIcon
                                customClassName="nav-icon"
                                icon={sidebarMenu[i].categories[1].icon}
                            />{" "}
                            {sidebarMenu[i].categories[1].name}
                        </CNavItem>
                        {console.log("test")}
                    </CNavGroup>
                );
        }
    }

    return (
        <>
            <CSidebar
                position="fixed"
                unfoldable={unfoldable}
                visible={sidebarShow}
                onVisibleChange={(visible) => {
                    dispatch({ type: "set", sidebarShow: visible });
                }}
            >
                <CSidebarBrand><img src="\antinet\logo\horizontal 1 - white.png" alt="Logo Antinet Society" width={250} height={140} /></CSidebarBrand>
                <CSidebarNav>{menuArray}</CSidebarNav>
                {/* <CSidebarToggler /> */}
            </CSidebar>
        </>
    );
}
