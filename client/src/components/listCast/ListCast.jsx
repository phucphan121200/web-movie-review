import { DehazeOutlined } from "@material-ui/icons";

import Cast from "../cast/Cast";
import "./listCast.scss";
import {
   ArrowBack
  } from "@material-ui/icons";
import {  Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import {useSelector} from 'react-redux'
import {useContext, useState } from "react";
import { CastContext } from "../../redux/castContext/CastContext";
import {getCastsFind} from "../../redux/castContext/apiCalls";
import { makeStyles } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import * as React from "react";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiPaper-root": {
      background: "transparent"
    }
  }
}));

export default function ListCast() {
  const classes = useStyles();
 const [maxWidth] = useState('xl');
  const movie = useSelector(state => state.movie.movie)
  const [open, setOpen] = useState(false);
  const handleClickOpen = (id) => {
    setOpen(true);
    getCastsFind(id, dispatch);
  };
 
  const handleClose = () => {
 
    setOpen(false);
  };

  const styles = {
    root: {
      background: 'transparent !important'
    }
  };
  
  const { casts, dispatch } = useContext(CastContext);


// console.log(movie.castItems[0].character._id)
// console.log(castId)
  return (
    <div className="listCast">
      <DehazeOutlined className="icons-title" />
      <span className="castTitle">Top cast</span>

      <div className="cast-container"  >
        {
        
          movie?.castItems.map(item => (
            <div 
              onClick={() => handleClickOpen(item.character.cast[0]._id)}
                >
                <Cast 
                id={item.character._id} 
              
                nameCha ={item.character.name}
                castPic ={item.character.cast[0].castPic}
                nameCast ={item.character.cast[0]?.name} 
                />
              </div>
          ))
        }

      
      </div>
      <hr width="80%" size="0.5px" color="red" style={{ marginTop: "20px" }} />

      <div className="writter-director">
        <div className="director">
          <span>Director</span>
          <span className="director-name">Jon Watts</span>
        </div>
        <div className="writer">
          <span>Writers</span>
          <span className="writer-name">Chris McKenna</span>
          <span className="writer-name">Erik Sommers</span>
          <span className="writer-name">Steve Ditko</span>
        </div>
      </div>

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
             
            <div className="castdetail">
            <ArrowBack onClick={handleClose} className="IconCastReturn" />
                <div className="name-cast"> {casts.name} </div>
              
              <div className="infocastDT">
                <img src={casts.castPic} />
                <div className="contentcastDT">
                  <p className="itemcastDT">
                    <b>Birthday:</b> {casts.dob}{" "}
                  </p>
                  <p className="itemcastDT">
                    <b>Biography:</b> {casts.bio}{" "}
                  </p>
                  <p className="itemcastDT"> Highest Rated: </p>
                  <p className="itemcastDT"> Lowest Rated: </p>
                  
                </div>
              </div>
            </div>
           
          }
        </DialogContent>
      </Dialog>
      </div>
    
  );
}
