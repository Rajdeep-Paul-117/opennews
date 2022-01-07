import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { getArticles } from '../actions/article'
function Pagination({ page }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getArticles(page))
    }, [dispatch, page])

    return (
        <nav >
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <Link to={`/news?page=${Math.max(Number(page) - 1, 1)}`} className="btn page-link">Prev</Link>
                </li>
                <li className="page-item active"><Link to={`/news?page=${Number(page)}`} className="page-link " href="#">{page}</Link></li>
                <li className="page-item">
                    <Link to={`/news?page=${Number(page) + 1}`} className=" btn page-link">Next</Link>
                </li>
            </ul>
        </nav>

    )
}

export default Pagination
