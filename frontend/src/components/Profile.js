import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProfile } from '../actions/auth'
import Article from './Article'
function Profile() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { profile } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(getProfile(id))
    }, [id])
    return (
        <>
            <p className='fs-1 text-center'>{profile?.name}</p>
            <div className='row mx-1'>
                <p className='fs-2' >My Articles</p >
                {
                    profile?.articles?.map((article) => <Article key={article._id} article={article} />)
                }
            </div>
        </>
    )
}

export default Profile
