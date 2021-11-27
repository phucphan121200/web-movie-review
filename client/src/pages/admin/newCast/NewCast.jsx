import "./newCast.scss"
import Topbar from '../../../components/admin/topbarAdmin/topbarAdmin';
import Sidebar from '../../../components/admin/sidebarAdmin/SidebarAdmin';
import Footer from "../../../components/admin/footerAdmin/FooterAdmin";

import { Link } from "react-router-dom";
export default function Casts(){

    return(
    <div>
    <Topbar/>
      <div className="container">
      <Sidebar />
      
      <div className="newCast">
      <h1 className="addCastTitle">New Cast</h1>
      <form className="addCastForm">
        <div className="addCastItem">
          <label>Image</label>
          <input type="file" id="file" />
        </div>
        <div className="addCastItem">
          <label>Name</label>
          <input type="text" placeholder="Apple Airpods" />
        </div>
        <div className="addCastItem">
          <label>Stock</label>
          <input type="text" placeholder="123" />
        </div>
        <div className="addCastItem">
          <label>Country</label>
          <select name="active" id="active">
            <option value="yes">Vietnam</option>
            <option value="no">USA</option>
          </select>
        </div>
        <button className="addCastButton">Create</button>
      </form>

      </div>
      </div>
      <Footer/>
    </div>
    )
}