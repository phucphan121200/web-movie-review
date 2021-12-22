import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from "@material-ui/icons"
import "./listItemForGenre.scss"
import { useState } from "react";

export default function ListItem(index) {
    const [isHovered, setIsHovered] = useState(false);
    const trailer ="https://firebasestorage.googleapis.com/v0/b/netflix-59bfe.appspot.com/o/items%2FArcane_%20Official%20Trailer.mp4?alt=media&token=93621232-7550-45a8-8199-d5c17f089a1a"
    return (
        <div>
            <div 
            className="listItemForGenre"
            style={{left: isHovered && 225 - 50 + 2.5}}
            onMouseEnter={()=>setIsHovered(true)}
            onMouseLeave={()=>setIsHovered(false)}>
                <img src= {''}alt="" />
                {isHovered && (
                <>
                <video src={trailer} autoPlay={true} loop muted={true}></video>
                <div className="itemInfoForGenre">
                    <div className="icons">
                        <PlayArrow className="icon"/>
                        <Add className="icon"/>
                        <ThumbUpAltOutlined className="icon"/>
                        <ThumbDownAltOutlined className="icon"/>
                    </div>
                    <div className="itemInfoTop">
                        <span>1 hour 14 mins</span>
                        <span className='limit'>+16</span>
                        <span>2021</span>
                    </div>
                    <div className="desc">
                    For the first time in the cinematic history of Spider-Man, our friendly neighborhood hero is unmasked and no longer able to separate his normal life from the high-stakes of being a Super Hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.
                    </div>
                    <div className="gerne">Action</div>
                </div></>
                )}
            </div>
        </div>
    )
}