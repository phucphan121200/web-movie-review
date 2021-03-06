import "./deleteManager.scss";
import { useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { RestoreFromTrash, DeleteForever } from "@material-ui/icons";
import Notification from "../../components/Alert/Notification"
import ConfirmDialog from "../../components/Alert/ConfirmDialog";
import ConfirmDialogOk from "../../components/Alert/ConfirmDialogOk";
import { CastContext } from "../../context/castContext/CastContext";
import Select from '@mui/material/Select';
import { getCastsDelFindObject, deleteCasts, RestoreCasts } from "../../context/castContext/apiCalls";
import { MenuItem } from "@mui/material";

export default function DeleteManager() {
    const { casts, dispatch } = useContext(CastContext);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
    const [confirmDialogOk, setConfirmDialogOk] = useState({ isOpen: false, title: '', subTitle: '' });
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [object, setObject] = useState("user");
    const handleDelete = (id) => {
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false
    })
    deleteCasts(object,id, dispatch,setNotify);
      
    };

    const handleRecover = (id) => {
      setConfirmDialogOk({
        ...confirmDialogOk,
        isOpen: false
    })
    RestoreCasts(object,id, dispatch,setNotify);
      
    };
    
  
    
    
  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "email", headerName: "Email", width: 230
    },
    { field: "title", headerName: "Title", width: 150 },
    { field: "name", headerName: "Name", width: 150
    },

    { field: "createdAt", headerName: "Create", width: 110 },
    { field: "updatedAt", headerName: "Update", width: 110 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <DeleteForever
              className="deleteForever"

              onClick={() =>
                setConfirmDialog({
                  isOpen: true,
                  title: "Are you sure to delete FOREVER this?",
                  subTitle: "You can't undo this action. Make sure you want to do it ",
                  onConfirm: () => { handleDelete(params.row._id)
                  },
                })
           
                }
        />
            <RestoreFromTrash
              className="deleteRestore"
              onClick={() =>
                setConfirmDialogOk({
                  isOpen: true,
                  title: "Are you sure to Restore this?",
                  subTitle: "You can check again in Quick Menu",
                  onConfirm: () => {
                    handleRecover(params.row._id)
                  },
                  
                })
            }
            />
          </>
        );
      },
    },
  ];
  
  const handleObject = (e) => {
    const value = e.target.value;
    setObject(value);
    getCastsDelFindObject(e.target.value,dispatch,setNotify)

  };

 
  

 
  return (
    <div className=" DeleteManager">
      <h1 className=" DeleteManagerTitle">Delete Manager</h1>
       <div className="DeleteManagerSelectObject">
          <Select 
           className="DeleteManagerSelectObject" 
          onChange={handleObject} 
         >
            <MenuItem value="users">User</MenuItem>
            <MenuItem value="casts">Cast</MenuItem>
            <MenuItem value="movies">Movies</MenuItem>
          </Select>

       </div>
      <form className=" DeleteManagerForm" type="form">
        <DataGrid
          rows={casts}
          disableSelectionOnClick
          columns={columns}
          autoHeight
          pageSize={5}
          rowsPerPage10Options={[2]}
          getRowId={(r) => r._id}
          option = {{columnsButton:true}}
        />
      </form>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <ConfirmDialogOk
        confirmDialogOk={confirmDialogOk}
        setConfirmDialogOk={setConfirmDialogOk}
      />
    </div>
  );
}
