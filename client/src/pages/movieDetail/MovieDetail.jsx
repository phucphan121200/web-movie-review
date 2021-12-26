import Featured from "../../components/featured/Featured";
import Navbar from "../../components/navbar/Navbar";
import FeaturedMovie from "../../components/featuredMovie/FeaturedMovie";
import "./movieDetail.scss";
import ListCast from "../../components/listCast/ListCast";
import Related from "../../components/related/Related";
import VoteList from "../../components/votelist/VoteList";
import DetailMovie from "../../components/detailMovie/DetailMovie";
import CommentList from "../../components/commentList/CommentList";
import ModalNotiRating from "../../components/modal/modalNotiRating/ModalNotiRating";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovie,
  dispatchGetMovie,
  fetchRatingMovie,
  dispatchGetRatingMovie,
} from "../../redux/actions/movieAction";
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "../../redux/actions/authAction";
import axios from "axios";
import { toast } from "react-toastify";

const MovieDetail = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const movie = useSelector((state) => state.movie.movie);
  useEffect(() => {
    const firstlogin = localStorage.getItem("firstlogin");
    if (firstlogin) {
      const getToken = async () => {
        const res = await axios.post("/users/refresh_token", null);
        console.log(res);
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);
  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());

        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  const addToWatchList = async () => {
    try {
      const result = await axios.post(
        "/favorites/add",
        {
          favoriteItems: {
            movie: movie,
          },
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(result);
      if (result.status === 201) {
          toast.success("Added movie to watch list");
      }else{
          toast.error("Error");
      }
    } catch (error) {
        error.response.data.msg && toast.error(error.response.data.msg)
    }
  };
  return (
    <div className="movieDetail">
      <div className="sort-cast-relate">
        <Navbar />
        <FeaturedMovie addToWatchList={addToWatchList} />
        <span className="sort-cast-deatil">
          <ListCast cast={movie.castItems} />
          <DetailMovie />
          <CommentList />
        </span>
        <span className="sort-relate-votelist">
          <Related />
          <VoteList />
          <ModalNotiRating />
        </span>
      </div>
    </div>
  );
};

export default MovieDetail;
