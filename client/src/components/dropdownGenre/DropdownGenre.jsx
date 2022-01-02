import "./dropdownGenre.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import { Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import {
  ArrowBack,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
  Info
} from "@material-ui/icons";
import * as React from "react";
import { Link } from "react-router-dom";
import ListItemForGenre from "../listItemForGenre/ListItemForGenre";
import moment from "moment";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {
      background: "transparent",
    },
  },
}));

function Dropdown({ dropdown, setDropdown }) {
  const [click, setClick] = useState(false);
  const [moviesCate, setCateMovie] = useState(null);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [maxWidth] = useState("xl");
  const [idCate, setIdcate] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get("/categories/");
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  const getMoviesCate = async (id) => {
    try {
      const res = await axios.get("/movies/getmoviebygerne/" + id);
      setIdcate(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(idCate);
  }, [idCate]);

  const handleClick = (id, name) => {
    setDropdown(false);
    getMoviesCate(id);
    setCateMovie(name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={dropdown ? { display: "block" } : { display: "none" }}>
      <ul className={"dropdown-menuCate"}>
        {categories.map((item, index) => {
          return (
            <MenuItem
              key={index}
              onClick={() => handleClick(item._id, item.name)}
            >
              {item.name}
            </MenuItem>
          );
        })}
      </ul>
      <Dialog
        open={open}
        fullWidth={true}
        maxWidth={maxWidth}
        className={classes.root}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        {" "}
        <DialogContent>
          {
            <div className="dropdownGenredetail">
              <ArrowBack
                onClick={handleClose}
                className="IcondropdownGenreReturn"
              />
              <div className="name-dropdownGenre"> {moviesCate} </div>

              <div
                className="infodropdownGenreDT"
              
              >
                {idCate.map((item, index) => {
                  return (

                    <div
                    key = {'abc'+item._id}
                    className="listItemForGenre"
                    >
                      <img src={item.coverPic} alt=""  />
                      <div className="item-genre-action">
                          <video
                            src={item.trailer}
                            autoPlay={true}
                            loop
                            muted={true}
                          ></video>
                          <div className="itemInfoForGenre" 
                          
                          >
                            <div className="icons">
                              <PlayArrow className="icon" />
                              <Link
                                onClick={handleClose}
                                className="link"
                                to={{ pathname: "/movies/"+item._id  }}
                              >
                                <>
                                  <Info type="button" className="icon" />
                                </>
                              </Link>

                              <ThumbUpAltOutlined className="icon" />
                              <ThumbDownAltOutlined className="icon" />
                            </div>
                            <div className="itemInfoTop">
                              <span>{item.title}</span>
                              <span className="limit">{item.limit}</span>
                              <span>{moment(item.releaseDate).format("LL")}</span>
                            </div>
                          </div>
                        </div>
                    </div>
                  );
                })}
              </div>
            </div>
          }
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Dropdown;
