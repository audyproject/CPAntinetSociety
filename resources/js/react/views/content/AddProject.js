import { CCard, CCardBody, CCardHeader, CForm, CFormInput, CFormTextarea } from "@coreui/react";
import { useState } from "react";

export function AddProject() {

    const [title, setTitle] = useState()


    const handleSubmit = async() => {

    }

    return(
        <>
        {"AddProject"}
        <CCard>
            <CCardHeader><strong>Add Project</strong></CCardHeader>
            <CCardBody>
                <CForm onSubmit={handleSubmit}>
                    <CFormInput
                        className='mb-3'
                        type="text"
                        id="title"
                        label="Title"
                        placeholder="Input here..."
                        // text="Must be 8-20 characters long."
                        aria-describedby="exampleFormControlInputHelpInline"
                        onChange={e => setTitle(e.target.value)}
                    />
                    <CFormTextarea
                        className='mb-3'
                        id="exampleFormControlTextarea1"
                        label="Description"
                        rows="3"
                        // text="Describe the project"
                        placeholder="Describe the project"
                    />
                    <CFormInput className='mb-3' type="file" id="formFile" label="Main Picture" />
                </CForm>
            </CCardBody>
        </CCard>
        </>
    )
}