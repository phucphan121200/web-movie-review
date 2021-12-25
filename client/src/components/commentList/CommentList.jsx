import Comment from "../comment/Comment";
import "./commentList.scss";
import { DehazeOutlined } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
export default function CommentList(cmt) {
  const [comment, setComment] = useState(null);
  useEffect(() => {
    const getComment = async () => {
      try {
        const res = await axios.get("/reviews/find/" + cmt.moId);
        setComment(res.data);
      } catch (err) {}
    };
    getComment();
  }, []);

  console.log(comment);

  return (
    <div className="commentList">
      <DehazeOutlined className="icons-title" />
      <span className="detailTitle">Reviews</span>
      <div className="review-container">
        {comment?.reviewItems.map((item) => (
          <div >
            <Comment
             quote={item.text}
             rating ={item.rating}
             profilePic ={item.user.profilePic}
             usernameF ={item.user.firstname}
             usernameL ={item.user.lastname}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
