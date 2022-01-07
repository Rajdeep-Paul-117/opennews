import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addArticle, editArticle, getArticleById } from '../actions/article'
import { useParams, useNavigate } from 'react-router-dom'


function FormNews() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { authData } = useSelector(state => state.auth)

    const [submitted, setsubmitted] = useState(false)
    const initialState = { title: "", detail: "" }
    const [formData, setformData] = useState(initialState)
    const [image, setimage] = useState("")
    const { article } = useSelector(state => state.article)
    const { isLoading } = useSelector(state => state.article)
    const user = authData?.user
    const { id } = useParams()
    useEffect(() => {
        if (id) {
            dispatch(getArticleById(id))
        }
        else
            setformData(initialState)
    }, [id])
    useEffect(() => {
        if (article && id) {
            setformData({ ...formData, title: article.title, detail: article.detail })
            setimage(article.image)
        }
        else {
            setformData(initialState)
        }
    }, [article])

    const _handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result;
        setimage(btoa(binaryString))
    }
    const handleImageChange = (e) => {
        let file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = _handleReaderLoaded
            reader.readAsBinaryString(file)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setformData({
            ...formData,
            [name]: value
        })
    }

    const submitForm = (e) => {
        e.preventDefault()
        setsubmitted(true)
        if (id) {
            dispatch(editArticle(id, { ...formData, image }, navigate))
        }
        else
            dispatch(addArticle({ ...formData, image }, navigate))
    }

    return (
        <>
            {isLoading && submitted ? <div className='d-flex justify-content-center mt-5'>
                < div className="spinner-border" role="status" >
                    <span className="visually-hidden">Loading...</span>
                </div >
            </div > :
                <form onSubmit={submitForm} className='mt-3 mt-lg-5 col-11 col-lg-8 mx-auto text-center'>
                    {
                        !user ? <div className="alert alert-danger d-flex align-items-center" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                            <div>
                                Log In To Add Article
                            </div>
                        </div> : ""
                    }
                    <div className="form-floating mb-3 ">
                        <input required type="text" className="form-control" placeholder="Title" onChange={handleInputChange} name='title' value={formData.title} />
                        <label >Title</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea required type="text" className="form-control h-25" placeholder="Details" name='detail' rows={10} value={formData.detail} onChange={handleInputChange} />
                        <label >Detail</label>
                    </div>
                    <div className='text-start'>
                        <label htmlFor="formFile" className="form-label">Choose an Image</label>
                        <input accept='image/*' className="form-control" name="image" type="file" id="formFile" onChange={handleImageChange} />
                    </div>
                    <button type="submit" disabled={user ? false : true} className='mt-2 mb-5 col-5 col-lg-3 btn btn-danger m-auto '>Submit</button>
                </form >
            }
        </>
    )
}

export default FormNews
