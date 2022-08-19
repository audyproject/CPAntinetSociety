import $ from "jquery"
import "/css/dataTables.bootstrap5.min.css";
import "/js/jquery.dataTables.min.js";
import "/js/dataTables.bootstrap4.min.js";
import { WithContext as ReactTags } from 'react-tag-input';

import { CButton, CForm, CFormInput, CFormTextarea, CModal, CModalBody, CModalFooter, CModalHeader } from "@coreui/react";
import { useEffect, useRef, useState } from "react";
import { requestAPI } from "../../API";
import { Toast, Toaster } from "../../components";

export function SetProject() {

    const [projectData, setProjectData] = useState(false)
    const [ready, setReady] = useState(false)
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState()
    const toaster = useRef()
    const [modal, setModal] = useState(false)

    const [title, setTitle] = useState()
    const [description, setDescription] = useState("")
    const [hashtag, setHashtag]  = useState([])
    const [paragraf1, setParagraf1] = useState()
    const [paragraf2, setParagraf2] = useState()
    const [titleParagraf1, setTitleParagraf1] = useState()
    const [titleParagraf2, setTitleParagraf2] = useState()
    const [link, setLink] = useState()

    const [mainImage, setMainImage] = useState()
    const [image1, setImage1] = useState()
    const [image2, setImage2] = useState()
    const [anotherImage, setAnotherImage] = useState()

    const request = async() => {
        const resp = await requestAPI('get', '/api/getproject')
        if(resp.status == 0){
            setProjectData(resp.data)
        }
        setReady(true)
    }

    $("#projectTable").DataTable();
    useEffect(() => {
        if(!ready || !projectData){
            request()
        }
    })

    const handleDelete = i => {
        setHashtag(hashtag.filter((hashtag, index) => index !== i));
    };

    const handleAddition = tag => {
        setHashtag([...hashtag, tag]);
    };

    const doSpotlight = async (id, name) => {
        let data = {
            "id": id
        }
        const resp = await requestAPI('post', '/api/spotlight', data)
        if(resp.status == 0){
            setToast(Toaster(toaster, Toast('success', `Spotlight ${name} success!`)))
        } else {
            setToast(Toaster(toaster, Toast('danger', resp.message)))
        }
        setProjectData()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(hashtag[0].id)
        // return
        // setLoading(true)
        const data = new FormData()
        data.append('name', title)
        data.append('description', description)
        for(let i=0;i<hashtag.length;i++){
            let a = hashtag[i].id
            console.log(a)
            data.append(`hashtag[]`, a)
        }
        // data.append('hashtag', hashtag)
        data.append('judul_paragraf1', titleParagraf1)
        data.append('judul_paragraf2', titleParagraf2)
        data.append('isi_paragraf1', paragraf1)
        data.append('isi_paragraf2', paragraf2)
        data.append('gambar_utama', mainImage)
        data.append('gambar_kanan', image1)
        data.append('gambar_kiri', image2)
        // for(let i=0; i<anotherImage.length;i++){
        //     data.append('gambar_lain[]', anotherImage[i])
        // }
        data.append('link', link)
        const resp = await requestAPI('post', '/api/editproject', data)   
        console.log(resp)
        if(resp.status == 0){
            setToast(Toaster(toaster, Toast('success', "Edit Project Success!")))
        } else {
            setToast(Toaster(toaster, Toast('danger', resp.message)))
        }
        setLoading(false)
    }

    return(
        <>
        
        {/* {"SetProject"} */}
        {!projectData ? "wait" : 
        <>
        <div className="col-12">
            <div className="card mb-4">
                <div className="card-header"><strong>Set Project</strong></div>
                <div className="card-body">
                    <table id="projectTable" className="table table-striped" style={{'width':'100%'}}>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Spotlight</th>
                                <th>Link</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectData.map((data, i) => {
                                return (<tr>
                                    <td>{i+1}</td>
                                    <td>{data.name}</td>
                                    <td>{!data.spotlight ? <CButton color="warning" className="text-white" onClick={() => doSpotlight(data.id, data.name)}>Spotlight</CButton> : 
                                    <CButton color="success" className="text-white">Spotlighted</CButton>}</td>
                                    {/* <td>{data.link}</td> */}
                                    <td><a href={data.link} target="_blank">{data.link}</a></td>
                                    <td>
                                        {/* <button className="btn btn-primary m-1" data-coreui-toggle="modal" data-coreui-target="#modalEdit" */}
                                        <CButton color="primary"
                                            onClick={() => {
                                                setTitle(data.name)
                                                setDescription(data.description)
                                                setTitleParagraf1(data.judul_paragraf1)
                                                setParagraf1(data.isi_paragraf1)
                                                setTitleParagraf2(data.judul_paragraf2)
                                                setParagraf2(data.isi_paragraf2)
                                                setHashtag(() => {
                                                    return JSON.parse(data.hashtag).map((datas, i) => {
                                                        return {
                                                            "id": datas,
                                                            "text": datas
                                                        }
                                                    })
                                                })
                                                setLink(data.link)
                                                setModal(true)
                                            }}>Edit</CButton>
                                        {/* {!data.spotlight && <CButton color="warning" className="text-white" onClick={() => doSpotlight(data.id, data.name)}>Spotlight</CButton>} */}
                                        {/* {data.active == 1 ? 
                                        <CButton color="danger" className="text-white" onClick={() => active(data.id, 0)}>Deactivate</CButton> :
                                        <CButton color="success" className="text-white"  onClick={() => active(data.id, 1)}>Activate</CButton>
                                        // <button className="btn btn-success text-white" data-coreui-toggle="modal" data-coreui-target="#modalActive">Deactivate</button> : 
                                        // <button className="btn btn-danger text-white" data-coreui-toggle="modal" data-coreui-target="#modalActive">Activate</button>
                                        } */}
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Spotlight</th>
                                <th>Link</th>
                                <th>Action</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
        <CModal size="xl" visible={modal} onClose={() => setModal(false)}>
            <CModalHeader>Edit Project</CModalHeader>            
            <CForm onSubmit={handleSubmit}>
                <CModalBody>
                    <CFormInput
                        className='mb-3'
                        type="text"
                        id="title"
                        label="Title"
                        placeholder="Input here..."
                        // text="Must be 8-20 characters long."
                        aria-describedby="exampleFormControlInputHelpInline"
                        onChange={e => setTitle(e.target.value)}
                        value={title}
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
                        value={description}
                    />
                    <div className="mb-3"></div>
                    
                    <CFormInput className='mb-3' type="file" id="formFile" label="Main Image" onChange={e => setMainImage(e.target.files[0])}/>
                    {mainImage ? <CImage src={mainImage}/> : <></>}
                    {/* <CFormInput
                        className=''
                        type="text"
                        id="hashtag"
                        label="Hashtag"
                        placeholder="Input here..."
                        text="Split Hashtag With Comma (,)"
                        aria-describedby="exampleFormControlInputHelpInline"
                        onChange={e => setHashtag(e.target.value)}
                    /> */}
                    <ReactTags
                        tags={hashtag}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        inputFieldPosition="top"
                        classNames={{
                            tags: 'form-control',
                            tagInputField: 'col-sm-4'
                        }}
                    />
                    <div className="mb-3"></div>
                    <CFormInput
                        className='mb-3'
                        type="text"
                        id="judul1"
                        label="Title Paragraf 1"
                        placeholder="Input here..."
                        // text="Must be 8-20 characters long."
                        aria-describedby="exampleFormControlInputHelpInline"
                        onChange={e => setTitleParagraf1(e.target.value)}
                        value={titleParagraf1}
                    />
                    <CFormTextarea
                        className='mb-3'
                        id="paragraf1"
                        label="Paragraf 1"
                        rows="4"
                        // text={description.length + "/100 words"}
                        placeholder="Describe the project"
                        onChange={e => setParagraf1(e.target.value)}
                        value={paragraf1}
                        // invalid={description.length > 100}
                        // feedback={"more than 100 words"}
                    />
                    <CFormInput className='mb-3' type="file" id="formFile" label="Image 1" onChange={e => setImage1(e.target.files[0])} />
                    <CFormInput
                        className='mb-3'
                        type="text"
                        id="judul2"
                        label="Title Paragraf 2"
                        placeholder="Input here..."
                        // text="Must be 8-20 characters long."
                        aria-describedby="exampleFormControlInputHelpInline"
                        onChange={e => setTitleParagraf2(e.target.value)}
                        value={titleParagraf1}
                    />
                    <CFormTextarea
                        className='mb-3'
                        id="paragraf2"
                        label="Paragraf 2"
                        rows="4"
                        // text={description.length + "/100 words"}
                        placeholder="Describe the project"
                        onChange={e => setParagraf2(e.target.value)}
                        value={paragraf2}
                        // invalid={description.length > 100}
                        // feedback={"more than 100 words"}
                    />
                    <CFormInput className='mb-3' type="file" id="formFile" label="Image 2" onChange={e => {console.log(e.target.files);setImage2(e.target.files[0])}} />
                    {/* <CFormInput className='mb-3' multiple="multiple" type="file" id="formFile" label="Another Image" onChange={e => setAnotherImage(e.target.files)} /> */}
                    <CFormInput
                        className='mb-3'
                        type="text"
                        id="link"
                        label="Link"
                        placeholder="Input here..."
                        // text="Must be 8-20 characters long."
                        aria-describedby="exampleFormControlInputHelpInline"
                        onChange={e => setLink(e.target.value)}
                        value={link}
                    />
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModal(false)}>
                        Close
                    </CButton>
                    {loading ? <CSpinner color="primary"/> : <CButton color="primary" type="submit">Save changes</CButton>}
                </CModalFooter>
            </CForm>
        </CModal>
        {toast}
        </>
        }
        </>
    )
}