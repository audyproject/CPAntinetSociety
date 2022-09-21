import { EditorState } from "draft-js";
import { useRef, useState } from "react";
import { createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    //Main.js
    const [menu, setMenu] = useState("dashboard")
    //End

    //ForgotPassword.js & Login.js
    const [toast, setToast] = useState()
    const toaster = useRef()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    //End

    //AddProject.js
    const [title, setTitle] = useState();
    const [description, setDescription] = useState("");
    const [hashtag, setHashtag] = useState([]);
    const [paragraf1, setParagraf1] = useState();
    const [paragraf2, setParagraf2] = useState();
    const [titleParagraf1, setTitleParagraf1] = useState();
    const [titleParagraf2, setTitleParagraf2] = useState();
    const [link, setLink] = useState();
    const [mainImage, setMainImage] = useState();
    const [image1, setImage1] = useState();
    const [image2, setImage2] = useState();
    const [anotherImage, setAnotherImage] = useState([]);
    //End

    //AddUser.js
    const [dataRoles, setDataRoles] = useState(false)
    const [roles, setRoles] = useState(0)
    const [username, setUsername] = useState("")
    //End

    //ChangePassword.js
    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confPass, setConfPass] = useState("")
    //End

    //Dashboard.js
    const [data, setData] = useState(false)
    const [ready, setReady] = useState(false)
    const [dailyPercent, setDailyPercent] = useState(0)
    const [monthlyPercent, setMonthlyPercent] = useState(0)
    const [yearlyPercent, setYearlyPercent] = useState(0)

    const [minDaily, setMinDaily] = useState(0)
    const [maxDaily, setMaxDaily] = useState(0)
    //End

    //Email.js
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [selected, setSelected] = useState([])
    const [subject, setSubject] = useState(false)

    const [targetEmail, setTargetEmail] = useState(false)
    //End

    //Membership.js
    const [memberData, setMemberData] = useState(false)
    const [graphMembership, setGraphMembership] = useState(false)
    const [modal, setModal] = useState(false)
    const [id, setId] = useState(0)
    const tableRef = useRef()
    //End

    //SetProject.js
    const [projectData, setProjectData] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [viewAnotherImage, setViewAnotherImage] = useState()
    const [currentId, setCurrentId] = useState(false)
    //End

    //SetUser.js
    const [userData, setUserData] = useState(false)
    const [currentRoles, setCurrentRoles] = useState("")
    //End

    //Subscriptions.js
    const [subscriptionData, setSubscriptionData] = useState(false)
    const [graphSubscription, setGraphSubscription] = useState(false)
    //End

    return (
        <GlobalContext.Provider value={{
            menu, setMenu, toastMessage, setToastMessage, email, setEmail, password, setPassword, loading,
            setLoading, toast, setToast, toaster, oldPass, setOldPass, newPass, setNewPass, confPass, setConfPass,
            dataRoles, setDataRoles, roles, setRoles, username, setUsername, title, setTitle, description,
            setDescription, hashtag, setHashtag, paragraf1, setParagraf1, paragraf2, setParagraf2, titleParagraf1,
            setTitleParagraf1, titleParagraf2, setTitleParagraf2, link, setLink, mainImage, setMainImage, image1,
            setImage1, image2, setImage2, anotherImage, setAnotherImage, data, setData, ready, setReady, dailyPercent,
            setDailyPercent, monthlyPercent, setMonthlyPercent, yearlyPercent, setYearlyPercent, minDaily, setMinDaily,
            maxDaily, setMaxDaily, editorState, setEditorState, selected, setSelected, subject, setSubject, targetEmail,
            setTargetEmail, memberData, setMemberData, graphMembership, setGraphMembership, modal, setModal, id, setId,
            projectData, setProjectData, modal2, setModal2, viewAnotherImage, setViewAnotherImage, currentId, setCurrentId,
            userData, setUserData, currentRoles, setCurrentRoles, subscriptionData, setSubscriptionData, graphSubscription,
            setGraphSubscription, tableRef
        }}>
            {children}
        </GlobalContext.Provider>
    )
}