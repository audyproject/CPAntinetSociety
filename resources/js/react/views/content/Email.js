import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { CButton, CCard, CCardBody, CCardHeader, CForm, CFormCheck, CFormInput, CFormSelect, CSpinner } from "@coreui/react";
import { requestAPI } from "../../API";

import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';

export function Email(){
    // editorState = EditorState.createEmpty()
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [selected, setSelected] = useState([])
    const [subject, setSubject] = useState(false)

    const [loading, setLoading] = useState(false)

    const [targetEmail, setTargetEmail] = useState(false)

    const requestTargetEmail = async () => {
        const resp = await requestAPI('get', 'api/getallemail')
        if(resp.status == 0){
            const target = []
            resp.data.map((datas, i) => {
                target.push({
                    label: datas.email,
                    value: datas.email
                })
            })
            setTargetEmail(target)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        let to = []
        selected.map((datas, i) => {
            to.push(datas.value)
        })
        const data = {
            to: to,
            title: subject,
            body: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        }
        const resp = await requestAPI('post', 'api/blast', data)
        console.log(resp)
        setLoading(false)
    }

    // const selecting = (e) => {
    //     console.log(e)
    //     let a = []
    //     e.map((datas, i) => {
    //         if(datas !== 'undefined') a.push(datas.value)
    //         console.log(datas.value)
    //     })
    //     setSelected(a)
    //     console.log(a)
    // }

    useEffect(() => {
        if(!targetEmail) requestTargetEmail()
    },[])

    return(
        <>
        <CForm onSubmit={handleSubmit}>
        <CCard>
            <CCardHeader>
                Send Email
            </CCardHeader>
            <CCardBody>
                <span className="d-flex">To </span>
                <MultiSelect
                    className="mb-3"
                    options={targetEmail}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                    // shouldToggleOnHover="true"
                    valueRenderer={(selected, _options) => {
                        return selected.length
                        ? selected.map((label) => <><span class="bg-light" style={{margin: "0 5px", padding: "0 5px"}}>{label.label}</span></>)
                        : "No Email Selected"
                    }}
                />
                <CFormInput
                    className="mb-2"
                    onChange={(e) => setSubject(e.target.value)}
                    label="Subject"
                />
                {/* <CFormInput> */}
                {/* </CFormInput> */}
            </CCardBody>
        </CCard>
        <CCard className="mt-3">
            <CCardBody>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                // wrapperStyle={<wrapperStyleObject>}
                // editorStyle={<editorStyleObject>}
                // toolbarStyle={<toolbarStyleObject>}
                onEditorStateChange={(e) => setEditorState(e)}
            />
            
            </CCardBody>
            
        </CCard>
        <div className="mt-2">
            {loading ? <CSpinner color="primary"/> : <CButton type="submit" color="primary">Send</CButton>}
        </div>
        </CForm>
        </>
    )
}