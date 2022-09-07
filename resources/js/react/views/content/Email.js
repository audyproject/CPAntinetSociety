import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { CButton, CCard, CCardBody, CCardHeader, CForm, CFormCheck, CFormInput, CFormSelect } from "@coreui/react";
import { requestAPI } from "../../API";

import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';

export function Email(){
    // editorState = EditorState.createEmpty()
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [selected, setSelected] = useState([])
    const [subject, setSubject] = useState(false)

    const options = [
        { label: "Grapes 🍇", value: "grapes" },
        { label: "Mango 🥭", value: "mango" },
        { label: "Strawberry 🍓", value: "strawberry", disabled: true },
    ];

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
    }

    const selecting = (e) => {
        console.log(e)
        let a = []
        e.map((datas, i) => {
            if(datas !== 'undefined') a.push(datas.value)
            console.log(datas.value)
        })
        setSelected(a)
        console.log(a)
    }

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
                <span className="d-flex">To <CFormCheck style={{marginLeft: "25px"}} label="All"/></span>
                <MultiSelect
                    options={targetEmail}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                    // shouldToggleOnHover="true"
                    valueRenderer={(selected, _options) => {
                        return selected.length
                        ? selected.map((label) => <><span class="bg-light">{label.label}</span></>)
                        : "no item"
                    }}
                />
                <CFormInput
                    onChange={(e) => setSubject(e.target.value)}
                    label="Subject"
                />
                {/* <CFormInput> */}
                {/* </CFormInput> */}
            </CCardBody>
        </CCard>
        <CCard>
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
        <CButton type="submit" color="primary">Send</CButton>
        </CForm>
        </>
    )
}