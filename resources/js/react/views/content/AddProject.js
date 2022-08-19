import { CButton, CCard, CCardBody, CCardHeader, CForm, CFormInput, CFormTextarea, CImage, CSpinner } from "@coreui/react";
import { useEffect, useRef, useState } from "react";
import { requestAPI } from "../../API";
import { Toast, Toaster } from '../../components/index'

export function AddProject() {

    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState()
    const toaster = useRef()

    const [title, setTitle] = useState()
    const [description, setDescription] = useState("")
    const [hashtag, setHashtag]  = useState()
    const [paragraf1, setParagraf1] = useState()
    const [paragraf2, setParagraf2] = useState()

    const [mainImage, setMainImage] = useState()
    const [image1, setImage1] = useState()
    const [image2, setImage2] = useState()
    const [anotherImage, setAnotherImage] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const data = new FormData()
        data.append('title', title)
        data.append('description', description)
        data.append('hashtag', hashtag)
        data.append('paragraf1', paragraf1)
        data.append('paragraf2', paragraf2)
        data.append('mainImage', mainImage)
        data.append('image1', image1)
        data.append('image2', image2)
        data.append('anotherImage', anotherImage)
        const resp = await requestAPI('post', '/api/createproject', data)   
        console.log(resp)
        if(resp.status == 0){
            setToast(Toaster(toaster, Toast('success', "Create Project Success!")))
        } else {
            setToast(Toaster(toaster, Toast('danger', resp.message)))
        }
        setLoading(false)
    }

    const otherImage = (files) => {
        for(let i=0;i<files.length;i++){
            console.log(files[i])
        }
        // files.map((datas, i) => {
        //     console.log(datas)
        // })
    }

    return(
        <>
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
                        className=''
                        id="exampleFormControlTextarea1"
                        label="Description"
                        rows="3"
                        text={description.length + "/100 words"}
                        placeholder="Describe the project"
                        onChange={e => setDescription(e.target.value)}
                        invalid={description.length > 100}
                        feedback={"more than 100 words"}
                    />
                    <div className="mb-3"></div>
                    
                    <CFormInput className='mb-3' type="file" id="formFile" label="Main Image" onChange={e => setMainImage(e.target.files[0])}/>
                    {mainImage ? <CImage src={mainImage}/> : <></>}
                    <CFormInput
                        className=''
                        type="text"
                        id="hashtag"
                        label="Hashtag"
                        placeholder="Input here..."
                        text="Split Hashtag With Comma (,)"
                        aria-describedby="exampleFormControlInputHelpInline"
                        onChange={e => setHashtag(e.target.value)}
                    />
                    <div className="mb-3"></div>
                    <CFormTextarea
                        className='mb-3'
                        id="paragraf1"
                        label="Paragraf 1"
                        rows="4"
                        // text={description.length + "/100 words"}
                        placeholder="Describe the project"
                        onChange={e => setParagraf1(e.target.value)}
                        // invalid={description.length > 100}
                        // feedback={"more than 100 words"}
                    />
                    <CFormInput className='mb-3' type="file" id="formFile" label="Image 1" onChange={e => setImage1(e.target.files[0])} />
                    <CFormTextarea
                        className='mb-3'
                        id="paragraf1"
                        label="Paragraf 1"
                        rows="4"
                        // text={description.length + "/100 words"}
                        placeholder="Describe the project"
                        onChange={e => setParagraf2(e.target.value)}
                        // invalid={description.length > 100}
                        // feedback={"more than 100 words"}
                    />
                    <CFormInput className='mb-3' type="file" id="formFile" label="Image 2" onChange={e => {console.log(e.target.files);setImage2(e.target.files[0])}} />
                    <CFormInput className='mb-3' multiple="multiple" type="file" id="formFile" label="Another Image" onChange={e => setAnotherImage(e.target.files)} />
                    {loading ? <CSpinner color="primary"/> : <CButton color="primary" type="submit">Submit</CButton>}
                </CForm>
            </CCardBody>
        </CCard>
        {toast}
        </>
    )
}