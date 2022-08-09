import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { requestAPI } from "./API";
import { Login } from "./Pages/Login";
import { Main } from "./Pages/Main"
// import "/css/examples.css"
// import "/css/style.css"
// import "/css/vendors/simplebar.css"
// import "/vendors/simplebar/css/simplebar.css"
// import "/vendors/@coreui/chartjs/css/coreui-chartjs.css"
// import "/vendors/@coreui/coreui/js/coreui.bundle.min.js"
// import "/vendors/simplebar/js/simplebar.min.js"
// import "/vendors/chart.js/js/chart.min.js"
// import "/vendors/@coreui/chartjs/js/coreui-chartjs.js"
// import "/vendors/@coreui/utils/js/coreui-utils.js"
// import "/js/main.js"
// import "/js/toasts.js"

function Index() {

    const logout = async() => {
        const response = await requestAPI("get", "api/logout")
        if(response.status == 0){
            setLogin(2)
        } else {
            console.log(response.message)
        }
    }

    const [login, setLogin] = useState(async () => {
        const response = await requestAPI("get", "api/checksession")
        setLogin(response.status)
        console.log(response.status)
    })

    return (
        <>
        {login == 0 ? <Main setLogin={setLogin} logout={logout}/> : <Login setLogin={setLogin} login={login}/>}
        </>
    )
}

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}