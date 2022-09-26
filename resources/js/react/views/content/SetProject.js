import $ from "jquery"
import "/css/dataTables.bootstrap5.min.css";
import "/js/jquery.dataTables.min.js";
import "/js/dataTables.bootstrap4.min.js";
import { WithContext as ReactTags } from 'react-tag-input';

import { CButton, CForm, CFormCheck, CFormInput, CFormTextarea, CImage, CModal, CModalBody, CModalFooter, CModalHeader, CSpinner } from "@coreui/react";
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
    const [modal2, setModal2] = useState(false)
    const [modal3, setModal3] = useState(false)

    const [isLink, setIsLink] = useState(true);
    const [active, setActive] = useState(false);

    const [link, setLink] = useState()

    const [id, setId] = useState(false)
    const [title, setTitle] = useState()
    const [description, setDescription] = useState("")
    const [hashtag, setHashtag] = useState([])
    const [paragraf1, setParagraf1] = useState()
    const [paragraf2, setParagraf2] = useState()
    const [titleParagraf1, setTitleParagraf1] = useState()
    const [titleParagraf2, setTitleParagraf2] = useState()

    const [mainImage, setMainImage] = useState()
    const [image1, setImage1] = useState()
    const [image2, setImage2] = useState()
    const [anotherImage, setAnotherImage] = useState([])

    const [viewAnotherImage, setViewAnotherImage] = useState()

    const request = async () => {
        const resp = await requestAPI('get', '/api/project/get')
        if (resp.status == 0) {
            setProjectData(resp.data)
            console.log(resp.data)
        }
        setReady(true)
    }

    $("#projectTable").DataTable({
        retrieve: true,
        pagingType: "full_numbers",
    });

    useEffect(() => {
        if (!ready || !projectData) {
            request()
        }
        // if (id && projectData) {
        //     console.log(id)
        //     projectData.map((datas, i) => {
        //         if (datas.id == id) setViewAnotherImage(JSON.parse(datas.gambar_lain))
        //     })
        // }
    }, [ready])

    const handleDelete = i => {
        setHashtag(hashtag.filter((hashtag, index) => index !== i));
    };

    const handleAddition = tag => {
        setHashtag([...hashtag, tag]);
    };

    const doSpotlight = async (id, name) => {
        setReady(false)
        let data = {
            "id": id
        }
        const resp = await requestAPI('post', '/api/project/spotlight', data)
        if (resp.status == 0) {
            setToast(Toaster(toaster, Toast('success', `Spotlight ${name} success!`)))
        } else {
            setToast(Toaster(toaster, Toast('danger', resp.message)))
        }
        setProjectData(false)
    }

    const deleteImage = async (id, link) => {
        let data = {
            'id': id,
            'delete': link
        }
        console.log(id)
        const resp = await requestAPI('post', '/api/deletegambarlain', data)
        if (resp.status == 0) {
            setToast(Toaster(toaster, Toast('success', `Delete image success!`)))
            setViewAnotherImage()
            setProjectData(false)
            // projectData.map((data, i) => {
            //     if(data.id == id) setViewAnotherImage(JSON.parse(data.gambar_lain))
            // })
            // setViewAnotherImage(id)
        } else {
            setToast(Toaster(toaster, Toast('danger', resp.message)))
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        // console.log(hashtag[0].id)
        // return
        // setLoading(true)
        const data = new FormData()
        data.append('id', id)
        data.append('name', title)
        data.append('description', description)
        for (let i = 0; i < hashtag.length; i++) {
            let a = hashtag[i].id
            console.log(a)
            data.append(`hashtag[]`, a)
        }
        data.append('gambar_utama', mainImage)
        if (isLink == true) {
            data.append("link", link);
        } else {
            data.append('judul_paragraf1', titleParagraf1)
            data.append('judul_paragraf2', titleParagraf2)
            data.append('isi_paragraf1', paragraf1)
            data.append('isi_paragraf2', paragraf2)
            data.append('gambar_kanan', image1)
            data.append('gambar_kiri', image2)
        }
        const resp = await requestAPI('post', '/api/project/edit', data)
        console.log(resp)
        if (resp.status == 0) {
            setToast(Toaster(toaster, Toast('success', "Edit Project Success!")))
            setModal(false)
            setReady(false)
            setProjectData(false)
        } else {
            setToast(Toaster(toaster, Toast('danger', resp.message)))
        }
        setLoading(false)
    }

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        setLoading(true)
        const data = new FormData()
        data.append('id', id)
        for (let i = 0; i < anotherImage.length; i++) {
            data.append('gambar_lain[]', anotherImage[i])
        }
        const resp = await requestAPI('post', '/api/editgambarlain', data)
        if (resp.status == 0) {
            setToast(Toaster(toaster, Toast('success', "Edit Image Success!")))
        } else {
            setToast(Toaster(toaster, Toast('danger', resp.message)))
        }
        setModal2(false)
        setLoading(false)
        setProjectData(false)
        setReady(false)
    }

    const handleSubmit3 = async (e) => {
        e.preventDefault();
        setLoading(true)
        let data = {
            id: id
        }
        const resp = await requestAPI('post', "api/project/activate", data)
        if (resp.status == 0) {
            setToast(Toaster(toaster, Toast('success', { active } + " " + { title } + " success")))
        } else {
            setToast(Toaster(toaster, Toast('danger', { active } + " " + { title } + " failed")))
        }
        setActive(false)
        setTitle(false)
        setId(false)
        setLoading(false)
    }

    return (
        <>
            {/* {"SetProject"} */}
            {ready == false ? <CSpinner color="primary" /> :
                <>
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-header"><strong>Set Project</strong></div>
                            <div className="card-body">
                                <table id="projectTable" className="table table-striped" style={{ 'width': '100%' }}>
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
                                                <td>{i + 1}</td>
                                                <td>{data.name}</td>
                                                <td>{!data.spotlight ? <CButton color="warning" className="text-white" onClick={() => doSpotlight(data.id, data.name)}>Spotlight</CButton> :
                                                    <CButton color="success" className="text-white">Spotlighted</CButton>}</td>
                                                {/* <td>{data.link}</td> */}
                                                <td><a href={data.link} target="_blank">{data.link}</a></td>
                                                <td>
                                                    {/* <button className="btn btn-primary m-1" data-coreui-toggle="modal" data-coreui-target="#modalEdit" */}
                                                    <CButton color="primary"
                                                        onClick={() => {
                                                            setId(data.id)
                                                            setTitle(data.name)
                                                            setDescription(data.description)
                                                            setHashtag(() => {
                                                                if (data.hashtag != "null") {
                                                                    console.log(data.hashtag != null)
                                                                    return JSON.parse(data.hashtag).map((datas, i) => {
                                                                        return {
                                                                            "id": datas,
                                                                            "text": datas
                                                                        }
                                                                    })
                                                                } else {
                                                                    return []
                                                                }
                                                            })
                                                            setTitleParagraf1(data.judul_paragraf1)
                                                            setParagraf1(data.isi_paragraf1)
                                                            setTitleParagraf2(data.judul_paragraf2)
                                                            setParagraf2(data.isi_paragraf2)
                                                            setLink(data.link)
                                                            setModal(true)
                                                            if (data.link != null) {
                                                                setIsLink(true)
                                                                // document.getElementById('radio_link').checked = true
                                                                // document.getElementById('radio_popup').checked = false
                                                            }
                                                            else {
                                                                setIsLink(false)
                                                                // document.getElementById('radio_popup').checked = true
                                                                // document.getElementById('radio_link').checked = false
                                                            }
                                                        }}>Edit</CButton> &nbsp;
                                                    {
                                                        data.active == 1 ?
                                                            <CButton color="danger" className="text-white" onClick={() => {
                                                                setId(data.id)
                                                                setTitle(data.name)
                                                                setModal3(true)
                                                                setActive("Deactivate")
                                                            }}>Deactivate</CButton> :
                                                            <CButton color="danger" className="text-white" onClick={() => {
                                                                setId(data.id)
                                                                setTitle(data.name)
                                                                setModal3(true)
                                                                setActive("Activate")
                                                            }}>Activate</CButton>
                                                    }
                                                    <CButton color="danger"
                                                        onClick={() => {
                                                            setId(data.id)
                                                            setTitle(data.name)
                                                            setModal3(true)
                                                        }}
                                                    >
                                                        Delete
                                                    </CButton>
                                                    {/* <CButton id="editPicture" color="primary"
                                                        onClick={() => {
                                                            setId(data.id)
                                                            setViewAnotherImage(JSON.parse(projectData[i].gambar_lain))
                                                            setModal2(true)
                                                        }}>Edit Picture</CButton> */}
                                                    {/* {!data.spotlight && <CButton color="warning" className="text-white" onClick={() => doSpotlight(data.id, data.name)}>Spotlight</CButton>} */}
                                                    {/* {data.active == 1 ? 
>>>>>>> 5b34639a3fcf48fcacb99c8926a5561167debe69
                                        <CButton color="danger" className="text-white" onClick={() => active(data.id, 0)}>Deactivate</CButton> :
                                        <CButton color="success" className="text-white"  onClick={() => active(data.id, 1)}>Activate</CButton>
                                        // <button className="btn btn-success text-white" data-coreui-toggle="modal" data-coreui-target="#modalActive">Deactivate</button> : 
                                        // <button className="btn btn-danger text-white" data-coreui-toggle="modal" data-coreui-target="#modalActive">Activate</button>
                                        } */}
                                                </td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <CModal size="xl" backdrop={false} visible={modal} onClose={() => setModal(false)}>
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

                                <CFormInput className='mb-3' type="file" id="formFile" label="Main Image" onChange={e => setMainImage(e.target.files[0])} />
                                {mainImage ? <CImage src={mainImage} /> : <></>}
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
                                {/* <div className="mb-3"></div> */}
                                {link != null &&
                                    <>
                                        <CFormCheck type="radio" id="radio_link" name="link" label="Link" onClick={() => setIsLink(true)} checked />
                                        <CFormCheck type="radio" id="radio_popup" name="link" label="Popup" onClick={() => setIsLink(false)} />
                                    </>
                                }
                                {link == null &&
                                    <>
                                        <CFormCheck type="radio" id="radio_link" name="link" label="Link" onClick={() => setIsLink(true)} />
                                        <CFormCheck type="radio" id="radio_popup" name="link" label="Popup" onClick={() => setIsLink(false)} checked />
                                    </>
                                }

                                {isLink ?
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
                                    /> : <>
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
                                        <CFormInput className='mb-3' type="file" id="formFile" label="Image 2" onChange={e => { console.log(e.target.files); setImage2(e.target.files[0]) }} />
                                    </>}
                                {/* <CFormInput className='mb-3' multiple="multiple" type="file" id="formFile" label="Another Image" onChange={e => setAnotherImage(e.target.files)} /> */}
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setModal(false)}>
                                    Close
                                </CButton>
                                {loading ? <CSpinner color="primary" /> : <CButton color="primary" type="submit">Save changes</CButton>}
                            </CModalFooter>
                        </CForm>
                    </CModal>
                    <CModal size="xl" visible={modal2} onClose={() => setModal2(false)}>
                        <CModalHeader>Edit Another Image</CModalHeader>
                        <CForm onSubmit={handleSubmit2}>
                            <CModalBody>
                                <div className="row">
                                    {viewAnotherImage &&
                                        viewAnotherImage.map((datas, i) => {
                                            return (
                                                <div className="col-sm-3">
                                                    <CImage src={datas} width={200} height={200} className="m-3" /><br />
                                                    <CButton className="d-flex justify-content-center w-100" onClick={() => deleteImage(id, datas)} color="danger">Delete</CButton>
                                                </div>
                                            )
                                        })
                                    }
                                    {/* <br></br>
                    {anotherImage &&
                        JSON.parse(anotherImage).map((datas, i) => {
                            return <CButton onClick={() => deleteImage(id, anotherImage)} color="danger">Delete</CButton>
                        })
                    } */}
                                </div>
                                <br></br>
                                <CFormInput className='mb-3' multiple="multiple" type="file" id="formFile" label="Add Image" onChange={e => setAnotherImage(e.target.files)} />
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setModal(false)}>
                                    Close
                                </CButton>
                                {loading ? <CSpinner color="primary" /> : <CButton color="primary" type="submit">Save changes</CButton>}
                            </CModalFooter>
                        </CForm>
                    </CModal>
                    <CModal size="xl" visible={modal3} onClose={() => setModal3(false)}>
                        <CModalHeader></CModalHeader>
                        <CForm onSubmit={handleSubmit3}>
                            <CModalBody>
                                <p>Are You Sure Want To {active} {title} Project?</p>
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setModal3(false)}>
                                    No
                                </CButton>
                                {loading ? <CSpinner color="primary" /> : <CButton color="primary" type="submit">Yes</CButton>}
                            </CModalFooter>
                        </CForm>
                    </CModal>
                    {toast}
                </>
            }
        </>
    )
}