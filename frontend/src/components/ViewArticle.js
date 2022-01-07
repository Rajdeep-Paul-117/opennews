import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { deleteArticle, getArticleById, likeArticle } from '../actions/article'
import Comments from './Comments'

function ViewArticle() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { article, isLoading } = useSelector(state => state.article)
    const { authData } = useSelector(state => state.auth)
    const user = authData?.user

    const liked = article?.likes?.find((like) => like === user?._id)


    useEffect(() => {
        dispatch(getArticleById(id))
    }, [dispatch, id])

    const deleteHandler = () => {
        dispatch(deleteArticle(id, navigate))
    }
    const toggleLike = () => {
        dispatch(likeArticle(id))
    }

    return (
        <>        {
            isLoading || !article ?
                <div className='d-flex justify-content-center mt-5'>
                    < div className="spinner-border" role="status" >
                        <span className="visually-hidden">Loading...</span>
                    </div >
                </div > :
                <div className='container-fluid px-lg-5 px-3'>

                    <p className='mt-3 fs-3 fw-bold'>{article.title}</p>
                    <div className=' d-flex justify-content-between'>
                        <p className='fs-6 text-muted '>By-<Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={`/profile/${article.userId}`} >{article.userName}</Link></p>
                        <p className='fs-6 text-muted'>{moment(article.date).fromNow()}</p>
                    </div>
                    {user && user?._id === article.userId ?
                        <div className='mb-2'>
                            <Link to={`/edit-article/${article._id}`} className='btn btn-warning'>Edit</Link>
                            <button className='ms-2 btn btn-danger' onClick={deleteHandler}>Delete</button>
                        </div> : ""
                    }
                    <img alt='' src={article.image ? `data:image/jpeg;base64,${article.image}` : 'https://bit.ly/3ESzMXL'} className="card-img-top " style={{ height: "50vh", objectFit: "fill" }} />
                    <p className='fs-5 mt-4'>{article.detail}</p>
                    <button disabled={user ? false : true} className='btn p-0 m-0' onClick={toggleLike}><i className={liked ? "fs-1 bi bi-hand-thumbs-up-fill text-primary" : "fs-1 bi bi-hand-thumbs-up text-primary"}  ></i>{article.top}</button>

                    <hr></hr>
                    <Comments id={article._id} comments={article.comments} user={user} />
                </div>
        }
        </>

    )
}

export default ViewArticle
