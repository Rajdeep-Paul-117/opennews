import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
function Article({ article }) {

    return (
        <div className='col-lg-3 col-md-6 col-sm-12 mt-2 mb-2 '>
            <Link to={`/news/${article._id}`} className="card shadow border-light " style={{ color: 'inherit', textDecoration: 'inherit' }}>
                <img alt='' src={article.image ? `data:image/jpeg;base64,${article.image}` : 'https://bit.ly/3ESzMXL'} className="card-img-top" style={{ height: "30vh", objectFit: "cover" }} />
                <div className="card-body">
                    <p className="card-text h5 trunc">{article.title}</p>
                    <p className="blockquote-footer mt-1 mb-0"><cite>{article.userName}</cite></p>
                    <p className="card-text "><small className='text-muted'>{moment(article.date).fromNow()}</small></p>
                </div>
            </Link >
        </div >

    )
}

export default Article
