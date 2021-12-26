import { Star } from "@material-ui/icons"
import { FaStar } from "react-icons/fa"
import "./comment.scss"

export default function Comment(cmtindex) {
    
    return (
        <div className="comment">
            <div className="review-quote">
                <score-icon-critic size="small" percentage="hide" state="rotten"> </score-icon-critic>

                <div className="quote-container">
                    <p className="quote">{cmtindex.quote}</p>
                    <span className="review-meta-data">
                        <FaStar className="icon-star"/>
                        <span className="review-time-and-rating">Rating: {cmtindex.rating}/10</span>
                    <span> </span>
                </span>
             </div>
            </div>
            <div className="user-info">
                {/* <div className="box"></div> */}
                <img src={cmtindex.profilePic} alt="" />
                
                <div className="name-time">
                    <div className="user-name">{cmtindex.usernameF} {cmtindex.usernameL}</div>
                    <div className="time">//October 13, 2021</div>
                </div>
            </div>
            
        </div>
    )
}