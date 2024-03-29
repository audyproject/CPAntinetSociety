import {
    CNavGroup,
    CNavItem,
    CNavTitle,
    CSidebar,
    CSidebarBrand,
    CSidebarNav,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
    cilSpeedometer,
    cilContact,
    cilAccountLogout,
    cilSettings,
    cilPeople,
    cilEnvelopeOpen,
    cilBullhorn,
    cilPlus,
    cilFolderOpen,
    cilUserPlus,
    cilUser,
    cilImage

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
        icon: cilFolderOpen,
        categories: [
            {
                name: "Add Project",
                url: "add-project",
                icon: cilPlus,
            },
            {
                name: "Set Project",
                url: "set-project",
                icon: cilImage,
            },
        ],
    },
    {
        name: "Subscription",
        url: "subscription",
        icon: cilBullhorn,
    },
    {
        name: "Membership",
        url: "membership",
        icon: cilContact,
    },
    {
        name: "Email",
        url: "email",
        icon: cilEnvelopeOpen,
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
                icon: cilUserPlus,
            },
            {
                name: "Set User",
                url: "set-user",
                icon: cilUser,
            },
        ],
    },
    {
        title: "Settings",
        name: "Change Password",
        url: "change-password",
        icon: cilSettings,
    },
    {
        name: "Logout",
        url: "logout",
        icon: cilAccountLogout,
    },
];

export function AppSidebar({ menu, setMenu, logout, loginData, sessionData }) {
    const dispatch = useDispatch();
    const unfoldable = useSelector((state) => state.sidebarUnfoldable);
    const sidebarShow = useSelector((state) => state.sidebarShow);

    let menuArray = [];
    // iterate every sidebar menu item
    for (let i = 0; i < sidebarMenu.length; i++) {
        {
            if (sidebarMenu[i].title) {
                console.log(sessionData)
                if (sidebarMenu[i].title == "Admin" && sessionData.role != "admin") {
                    continue
                } else {
                    menuArray.push(
                        <CNavTitle key={i}>{sidebarMenu[i].title}</CNavTitle>
                    )
                }
            }

        }
        {
            !sidebarMenu[i].categories && sidebarMenu[i].name != "Logout" &&
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
            sidebarMenu[i].name == "Logout" &&
                menuArray.push(
                    <CNavItem
                        href="#"
                        onClick={logout}
                    >
                        <CIcon
                            customClassName="nav-icon"
                            icon={sidebarMenu[i].icon}
                        />
                        {sidebarMenu[i].name}
                    </CNavItem>
                )
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
            </CSidebar>
        </>
    );
}
