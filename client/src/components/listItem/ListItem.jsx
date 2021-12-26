import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from "@material-ui/icons"
import "./listItem.scss"
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function ListItem({index, item}) {
    const [isHovered, setIsHovered] = useState(false);
    const [movie, setMovie] = useState({});
    useEffect(() => {
        const getMovie = async () => {
          try {
            const res = await axios.get("/Movies/find/" + item);
            setMovie(res.data);
            
          } catch (err) {
            console.log(err);
          }
        };
        getMovie();
      }, [item]);  
      console.log(movie) 
    const trailer ="https://firebasestorage.googleapis.com/v0/b/netflix-59bfe.appspot.com/o/items%2FArcane_%20Official%20Trailer.mp4?alt=media&token=93621232-7550-45a8-8199-d5c17f089a1a"
    return (
        <Link to={{pathname: "/watch", movie: movie}}>
        <div>
            <div 
            className="listItem"
            style={{left: isHovered && index *225 - 50 + index *2.5}}
            onMouseEnter={()=>setIsHovered(true)}
            onMouseLeave={()=>setIsHovered(false)}>
                <img 
                src={movie.coverPic}
                alt="" />
                {isHovered && (
                <>
                <video src={movie.trailer} autoPlay={true} loop muted={true}></video>
                <div className="itemInfo">
                    <div className="icons">
                        <PlayArrow className="icon"/>
                        <Add className="icon"/>
                        <ThumbUpAltOutlined className="icon"/>
                        <ThumbDownAltOutlined className="icon"/>
                    </div>
                    <div className="itemInfoTop">
                        <span>{movie.duration}</span>
                        <span className='limit'>+{movie.limit}</span>
                        <span>{movie.site}</span>
                    </div>
                    <div className="desc">{movie.desc}
                    </div>
                    <div className="gerne">{movie.genre}</div>
                </div></>
                )}
            </div>
        </div>
        </Link>
    )
}