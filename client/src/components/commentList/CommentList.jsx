import Comment from "../comment/Comment";
import "./commentList.scss";
import { DehazeOutlined } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
export default function CommentList(cmt) {
  // const [comment, setComment] = useState(null);
  // useEffect(() => {
  //   const getComment = async () => {
  //     try {
  //       const res = await axios.get("/reviews/find/" + cmt.moId);
  //       setComment(res.data);
  //     } catch (err) {}
  //   };
  //   getComment();
  // }, []);

  // console.log(comment);
  const review = useSelector(state => state.review.review);
  console.log(review)
  return (
    <div className="commentList">
      <DehazeOutlined className="icons-title" />
      <span className="detailTitle">Reviews</span>
      <div className="review-container">
        {
        review ? 
        review?.reviewItems.map((item) => (
          <div >
            <Comment
             quote={item.text}
             rating ={item.rating}
             profilePic ={item.user.profilePic}
             usernameF ={item.user.firstname}
             usernameL ={item.user.lastname}
            />
          </div>
        ))
        :
        <div>
          Be the first to review this movie!
        </div>
      }
      </div>
    </div>
  );
}
