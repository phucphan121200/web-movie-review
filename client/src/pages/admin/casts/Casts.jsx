import "./casts.scss"
import Topbar from '../../../components/admin/topbarAdmin/topbarAdmin';
import Sidebar from '../../../components/admin/sidebarAdmin/SidebarAdmin';
import Footer from "../../../components/admin/footerAdmin/FooterAdmin";
import { Publish } from "@material-ui/icons";
import { Link } from "react-router-dom";


export default function Casts(){

    return(
    <div>
    <Topbar/>
      <div className="container">
      <Sidebar />
      <div className="casts">
      <div className="castTitleContainer">
        <h1 className="castTitle">Cast</h1>
        <Link to="/newCast">
          <button className="castAddButton">Create</button>
        </Link>
      </div>
      <div className="castTop">
      <div className="castTopRight">
              <div className="castInfoTop">
                  <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="castInfoImg" />
                  <span className="castName">Apple Airpods</span>
              </div>
              <div className="castInfoBottom">
                  <div className="castInfoItem">
                      <span className="castInfoKey">id:</span>
                      <span className="castInfoValue">123</span>
                  </div>
                  <div className="castInfoItem">
                      <span className="castInfoKey">sales:</span>
                      <span className="castInfoValue">5123</span>
                  </div>
                  <div className="castInfoItem">
                      <span className="castInfoKey">active:</span>
                      <span className="castInfoValue">yes</span>
                  </div>
                  <div className="castInfoItem">
                      <span className="castInfoKey">in stock:</span>
                      <span className="castInfoValue">no</span>
                  </div>
                  </div>
             
          </div>
      </div>
      <div className="castBottom">
          <form className="castForm">
              <div className="castFormLeft">
                  <label>Cast Name</label>
                  <input type="text" placeholder="Apple AirPod" />
                  <label>In Stock</label>
                  <select name="inStock" id="idStock">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                  </select>
                  <label>Active</label>
                  <select name="active" id="active">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                  </select>
              </div>
              <div className="castFormRight">
                  <div className="castUpload">
                      <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="castUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="castButton">Update</button>
              </div>
          </form>
      </div>
      </div>

         
      
      </div> 
      <Footer/>
    </div>
    )
}