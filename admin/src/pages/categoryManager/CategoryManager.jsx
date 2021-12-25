import "./categoryManager.scss";
import Select from "@mui/material/Select";
import { Cached, AddCircle, Delete } from "@material-ui/icons";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Notification from "../../components/Alert/Notification";
import ConfirmDialog from "../../components/Alert/ConfirmDialog";
import ConfirmDialogUpdate from "../../components/Alert/ConfirmDialogUpdate";
import ConfirmDialogAdd from "../../components/Alert/ConfirmDialogAdd";

export default function NewList() {
  const [categories, setCategories] = useState([]);
  const [cate, setCate] = useState([]);
  const [category, setCategory] = useState([]);
  const [addcategory, setaddCategory] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
  const [confirmDialogUp, setConfirmDialogUp] = useState({ isOpen: false, title: '', subTitle: '' });
  const [confirmDialogAdd, setConfirmDialogAdd] = useState({ isOpen: false, title: '', subTitle: '' });
 
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get("/categories/");
        setNotify({
          isOpen: true,
          message: "Successfully",
          type: "success",
        });
        setCategories(res.data);
      } catch (err) {
        setNotify({
          isOpen: true,
          message: "Failed: " + err,
          type: "error",
        });
        console.log(err);
      }
    };
    getCategories();
  }, []);

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    let text = value.toString();
    setCate(text);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setCategory({ ...category, _id: cate, [e.target.name]: value });
  };
  const handleUpload = (e) => {
    setConfirmDialogUp({
      ...confirmDialogUp,
      isOpen: false
  });
    const updateCategories = async () => {
      try {
        const res = await axios.put(
          "/categories/update/" + category._id,
          category,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setNotify({
          isOpen: true,
          message: "Update Category Successfully",
          type: "success",
        });
      } catch (err) {
        setNotify({
          isOpen: true,
          message: "Update Category Failed: " + err,
          type: "error",
        });
        console.log(err);
      }
    };
    updateCategories();
  };

  const handleChangee = (e) => {
    const value = e.target.value;
    setaddCategory({ ...addcategory, [e.target.name]: value });
  };

  const handleAdd = (e) => {
    setConfirmDialogAdd({
      ...confirmDialogAdd,
      isOpen: false
  });
    const addCategories = async () => {
      try {
        const res = await axios.post("/categories/add/", addcategory, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setNotify({
          isOpen: true,
          message: "Add Category Successfully",
          type: "success",
        });
      } catch (err) {
        setNotify({
          isOpen: true,
          message: "Add Category Failed: " + err,
          type: "error",
        });
        console.log(err);
      }
    };
    addCategories();
  };
  const handleDelete = (e) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
  });
    const deleteCategories = async () => {
      try {
        const res = await axios.put(
          "/categories/delete/" + cate,
          cate,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setNotify({
          isOpen: true,
          message: "Delete Category Successfully",
          type: "success",
        });
      } catch (err) {
        setNotify({
          isOpen: true,
          message: "Delete Category Failed: " + err,
          type: "error",
        });
        console.log(err);
      }
    };
    deleteCategories();
  };

  return (
    <div className="newList">
      <h1 className="addListTitle">Genre Manager</h1>
      <form className="addListForm">
        <div className="formLeft">
          <div className="addListItem">
            <label>Genre Id</label>
            <TextField
              disabled
              type="text"
              placeholder="Category"
              name="_id"
              value={cate}
            />
          </div>
          <Delete className="ListItem" fontSize="large" type="button" 
          onClick= 
          {() => 
            setConfirmDialog({
              isOpen: true,
              title: 'Are you sure to Delete this Genre?',
              subTitle: "You can check again when Refresh",
              onConfirm: ( handleDelete)
          })
        }
           />
          <div className="addListItem">
            <label>Change</label>

            <TextField
              type="text"
              placeholder="New name for Category "
              name="name"
              onChange={handleChange}
            />
            <Cached
              className="ListItem"
              fontSize="large"
              type="button"
              onClick= 
              {() => 
                setConfirmDialogUp({
                  isOpen: true,
                  title: 'Are you sure to Update this Genre?',
                  subTitle: "You can check again when Refresh",
                  onConfirm: ( handleUpload)
              })
            }
            />
          </div>

          <div className="addListItem">
            <label>Add Genre</label>
            <TextField
              type="text"
            
              placeholder="Add Category "
              name="name"
              onChange={handleChangee}
            />
          </div>
          <AddCircle className="ListItem" fontSize="large" type="button" 
          onClick= 
          {() => 
            setConfirmDialogAdd({
              isOpen: true,
              title: 'Are you sure to Add this Genre?',
              subTitle: "You can check again when Refresh",
              onConfirm: ( handleAdd)
          })
        }
          />
        </div>
        <div className="formRight">
          <div className="addListItem">
            <label>All</label>
            <Select
              multiple
              native
              name="category"
              onChange={handleSelect}
              style={{ height: "120px" }}
            >
              {categories.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.name}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </form>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
      <ConfirmDialogUpdate
                confirmDialog={confirmDialogUp}
                setConfirmDialog={setConfirmDialogUp}
            /> 
       <ConfirmDialogAdd
                confirmDialog={confirmDialogAdd}
                setConfirmDialog={setConfirmDialogAdd}
            />         
    </div>
  );
}
