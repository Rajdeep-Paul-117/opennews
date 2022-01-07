import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTopArticles } from '../actions/article'
import Article from './Article'

function Home() {
    const dispatch = useDispatch()
    const { articles, isLoading } = useSelector(state => state.article)

    useEffect(() => {
        dispatch(getTopArticles())
    }, [dispatch])

    return (
        <>
            <div id="carouselExampleDark" className="carousel slide carousel-fade" data-bs-ride="carousel">

                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="5000">
                        <img alt="" src="https://pewrsr.ch/3HtiPEN" className="d-block w-100" style={{ maxHeight: "40vh", minHeight: "40vh" }} />
                    </div>
                    <div className="carousel-item">
                        <img alt="" src="https://bit.ly/3zkUIFt" className="d-block w-100" style={{ maxHeight: "40vh", minHeight: "40vh" }} />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img alt="" src="https://bit.ly/31n36ba" className="d-block w-100" style={{ maxHeight: "40vh", minHeight: "40vh" }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className='row mx-1'>
                {
                    isLoading ?
                        <div className='d-flex justify-content-center mt-5'>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> :
                        articles?.map((article) => (
                            <Article key={article._id} article={article} />
                        ))
                }
            </div>
        </>
    )
}

export default Home
