import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

async function doRequest(data){
    try {
        const response = await axios.post(process.env.MIX_APP_URL + "/testing", data)
        return await response.data
    } catch (error) {
        console.log(error)
    }
}

function Example() {
    let data = {
        username: "audy",
        password: "halo"
    }
    const [datas, setDatas] = useState(await doRequest(data))

    // useEffect(async () => {
    //     const temp = await doRequest(data)
    //     setDatas(temp.message)
    //     // if(temp.status == 1){
    //     //     setDatas(temp.message)
    //     // } else {
    //     //     setDatas("Error Bro!")
    //     // }
    // })

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>

                        <div className="card-body">{datas}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;

if (document.getElementById('app')) {
    ReactDOM.render(<Example />, document.getElementById('app'));
}
