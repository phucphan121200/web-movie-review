import { Check, KeyboardArrowDown, PlayArrow, Star } from "@material-ui/icons"
import { useState } from "react"
import { FaStar } from "react-icons/fa"
// import ModalNotiRating from "../modal/modalNotiRating/ModalNotiRating"
import ModalRating from "../modal/modalRating/ModalRating"
import "./featuredMovie.scss"
import { useSelector } from 'react-redux'
import {
    Link
} from "react-router-dom";
import { useEffect } from "react"
import axios from "axios"
import moment from "moment"

export default function FeaturedMovie({ type, addToWatchList }) {
    const [openModal, setOpenModal] = useState(false);
    const movieFeatured = useSelector(state => state.movie)
    const { movie } = movieFeatured
    const movieRating = useSelector(state => state.rating)
    const { rating } = movieRating
    const isLogged = useSelector(state => state.auth.isLogged)

    return (
        <div className="featuredMovie">
            {type && (
                <div className="category">

                </div>
            )}
            <img
                src={movie.coverPic}
                alt="" />
            <div class="arrow bounce">
                <KeyboardArrowDown style={{ fontSize: "70px", color: "white" }} />
            </div>
            <div className="info">
                <img
                    src={movie.namePic}
                    alt="" />
                <div className="generinfo">
                    <span className="match">98% Match</span>
                    <span className="limit">+{movie.limit}</span>
                    <span className="year">{moment(movie.releaseDate).format("LL")}</span>
                    {
                        rating ?
                            <>
                                <span className="rating-score">{rating}</span>
                                <span className="rating-percent">/10</span>
                            </>
                        :
                        <span className="rating-percent" style={{marginLeft: "10px"}}>No Rating</span>
                    }

                    {/* <span className="time-detail">1 hour 14 mins</span> */}
                </div>
                <div className="time">
                    {/* <span className="progress-bar" style={{width: "30%"}}></span>                     */}
                </div>
                <span className="description">
                    {movie.desc}
                </span>
                <div className="buttons">
                    <Link className="link" to="/watch">
                        <button className="play"
                        // onClick={openModalTrailer}
                        >
                            <PlayArrow />
                            <span>Trailer</span>
                        </button>
                    </Link>
                    {
                        isLogged ?
                            <>
                                <button className="rate"
                                    onClick={() => { setOpenModal(true) }}>
                                    <FaStar className="star" />
                                    <span className="rate">Rate</span>
                                </button>

                                <button onClick={addToWatchList} className="more">
                                    <Check />
                                    <span>Watch List</span>
                                </button>
                                {openModal && <ModalRating closeModal={setOpenModal} />}
                            </>
                            :
                            <></>
                    }
                </div>
            </div>
        </div>
    )
}