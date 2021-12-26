import "./cast.scss";
import React, { useContext, useState } from "react";
import { Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import { CastContext } from "../../redux/castContext/CastContext";
import { getCastsFind } from "../../redux/castContext/apiCalls";
import { ArrowBack } from "@material-ui/icons";
export default function Cast(index) {
  
  return (
    <div className="cast"  >
      <img src={index.castPic} alt="" />
      <div className="name-cast">{index.nameCast}</div>
      <div className="name-charac">{index.nameCha}</div>
     
    </div>
  );
}
