import React from 'react';

import "./adminHome.scss";

import Navbar from '../../../components/admin/navbarAdmin/NavbarAdmin';
import Footer from "../../../components/admin/footerAdmin/FooterAdmin"
import Topbar from '../../../components/admin/topbarAdmin/topbarAdmin';
import Sidebar from '../../../components/admin/sidebarAdmin/SidebarAdmin';
import MainAdmin from  '../../../components/admin/mainAdmin/MainAdmin';


function Home() {
    return (
      <div>
      <Topbar/>
      <div className="container">
      <Sidebar />

        
            <MainAdmin />
         
      
      </div> 
      <Footer/>
      </div>

    );
}
    
       

export default Home;