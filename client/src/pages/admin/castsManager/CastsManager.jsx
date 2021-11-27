import "./castsManager.scss";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";

import Topbar from '../../../components/admin/topbarAdmin/topbarAdmin';
import Sidebar from '../../../components/admin/sidebarAdmin/SidebarAdmin';
import Footer from "../../../components/admin/footerAdmin/FooterAdmin";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200,
    renderCell: (params) => {
        return (
          <div className="castssListItem">
            <img className="castssListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
     }
    },
    { field: 'country', headerName: 'email', width: 130 },
    { field: 'dob', headerName: 'Date Of Birth', width: 130 },
    {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {
          return (
            <>
               <Link to={"/Casts/" + params.row.id}>
              <button className="castssListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="castssListDelete"
             
              />
            </>
          );
        },
    },
  ];
  
  const rows = [
    { id: 1, username: 'Snow', email: 'Jon', 
    avatar: "https://thuthuatnhanh.com/wp-content/uploads/2019/12/avatar-deo-khau-trang.jpg" },
    { id: 2, username: 'Lannister', email: 'Cersei', avatar: "https://thuthuatnhanh.com/wp-content/uploads/2019/12/avatar-deo-khau-trang.jpg"  },
    { id: 3, username: 'Lannister', email: 'Jaime', avatar: "https://thuthuatnhanh.com/wp-content/uploads/2019/12/avatar-deo-khau-trang.jpg"  },
    { id: 4, username: 'Lannister', email: 'Cersei', avatar: "https://thuthuatnhanh.com/wp-content/uploads/2019/12/avatar-deo-khau-trang.jpg"  },
    { id: 5, username: 'Lannister', email: 'Jaime', avatar: "https://thuthuatnhanh.com/wp-content/uploads/2019/12/avatar-deo-khau-trang.jpg"  },
    { id: 6, username: 'Lannister', email: 'Cersei', avatar: "https://thuthuatnhanh.com/wp-content/uploads/2019/12/avatar-deo-khau-trang.jpg"  },
    { id: 7, username: 'Lannister', email: 'Jaime', avatar: "https://thuthuatnhanh.com/wp-content/uploads/2019/12/avatar-deo-khau-trang.jpg"  },
    { id: 8, username: 'Lannister', email: 'Cersei', avatar: "https://thuthuatnhanh.com/wp-content/uploads/2019/12/avatar-deo-khau-trang.jpg"  },
    { id: 9, username: 'Lannister', email: 'Jaime', avatar: "https://thuthuatnhanh.com/wp-content/uploads/2019/12/avatar-deo-khau-trang.jpg"  },

    
  ];

export default function CastsManager(){

    return(
        <div>
<Topbar/>
      <div className="container">
            <Sidebar />  
            <div className="castssList">
            <DataGrid
        rows={rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
       </div>
      
       </div>            
       <Footer/>
        </div>
    )
}