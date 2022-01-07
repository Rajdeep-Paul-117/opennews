import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { addComment, deleteComment, editComment } from '../actions/article'

function Comments({ id, comments, user }) {
    const dispatch = useDispatch()
    const [editMode, seteditMode] = useState("")
    const [submitting, setsubmitting] = useState(false)
    const [formData, setformData] = useState({ content: "" })

    const changeHandler = (e) => {
        const { name, value } = e.target
        setformData({
            ...formData,
            [name]: value
        })

    }
    const deleteCommentHandler = (comntId) => {
        setsubmitting(true)
        dispatch(deleteComment(id, comntId))
        setsubmitting(false)
    }

    const editCommentHandler = (e, comntId) => {
        e.preventDefault()
        setsubmitting(true)
        dispatch(editComment(id, comntId, { content: e.target.editComment.value }))
        setsubmitting(false)
        seteditMode("")
    }
    const editToggle = (id) => {
        if (editMode === "")
            seteditMode(id)
        else
            seteditMode("")
    }
    const commentSubmit = (e) => {
        e.preventDefault()
        setsubmitting(true)
        dispatch(addComment(id, formData))
        setformData({ content: "" })
        setsubmitting(false)
    }
    return (
        <>
            <form onSubmit={commentSubmit} className="ms-1 me-1 ms-md-4 me-md-4 card border-3">
                {
                    !user ? <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                        <div>
                            Log In To Like Or Comment
                        </div>
                    </div> : ""
                }
                <div className="card-body ">
                    <h5 className="card-title">Comment</h5>
                    <textarea name="content" placeholder="Type your Comment..." required className="card-text form-control h-10 border-2" onChange={changeHandler} value={formData.content} ></textarea>
                    <button disabled={user && !submitting ? false : true} type='submit' className="btn btn-outline-primary mt-2">Submit</button>
                </div>
            </form>
            {
                comments.map((comment) => {
                    return (
                        <div key={comment._id} className="ms-2 me-2 ms-md-5 me-md-5 card-border-0">
                            <div className="card-body p-0">
                                {
                                    editMode === comment._id ? null :
                                        <div>
                                            <p >{comment.content}</p>
                                            <footer className="blockquote-footer">By <cite>{comment.userName} {moment(comment.date).fromNow()}</cite></footer>
                                        </div>
                                }
                                {
                                    editMode === comment._id && user?._id && user?._id === comment.userId ?
                                        <form onSubmit={(e) => editCommentHandler(e, comment._id)}>
                                            <textarea name="editComment" required defaultValue={comment.content} className="mt-1 card-text form-control h-60 border-2" ></textarea>
                                            <button disabled={submitting} className="mt-1 mb-1 btn btn-sm btn-primary">submit</button>
                                        </form>
                                        : null
                                }
                                {
                                    user?._id && user?._id === comment.userId ? <div>
                                        {
                                            editMode === comment._id ?
                                                <button onClick={() => editToggle(comment._id)} className="btn btn-sm btn-warning me-2 mb-2 ">Cancel</button> :
                                                <button onClick={() => editToggle(comment._id)} className="btn btn-sm btn-warning me-2 mb-2 ">Edit</button>
                                        }
                                        <button disabled={submitting} onClick={() => deleteCommentHandler(comment._id)} className="btn btn-sm btn-danger mb-2">Delete</button>
                                    </div> : null
                                }

                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}
export default Comments