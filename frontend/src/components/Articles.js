import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Pagination from './Pagination'
import Article from './Article'
import { searchInput } from '../actions/article'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Articles() {

    const dispatch = useDispatch()
    const { articles, isLoading } = useSelector(state => state.article)
    const query = useQuery()
    const page = query.get('page') || 1
    const searchValue = query.get('searchValue')

    useEffect(() => {
        if (searchValue)
            dispatch(searchInput(searchValue))
    }, [searchValue])
    return (
        <div className='row mx-1'>
            {
                isLoading ?
                    <div className='d-flex justify-content-center mt-5'>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : !articles.length ? <h1>No result found for {searchValue}</h1> :
                        articles?.map((article) => (
                            <Article key={article._id} article={article} />
                        ))
            }
            {!searchValue ?
                <div className='mt-2'>
                    <Pagination page={page} />
                </div> : ""}
        </div>
    )
}

export default Articles
