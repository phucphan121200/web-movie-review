import "./characterManager.scss";
import Select from "@mui/material/Select";
import { Cached, AddCircle, Delete } from "@material-ui/icons";
import { TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Notification from "../../components/Alert/Notification";
import Autocomplete from "@mui/material/Autocomplete";
import { getCasts } from "../../context/castContext/apiCalls";
import { CastContext } from "../../context/castContext/CastContext";
import ConfirmDialog from "../../components/Alert/ConfirmDialog";
import ConfirmDialogUpdate from "../../components/Alert/ConfirmDialogUpdate";
import ConfirmDialogAdd from "../../components/Alert/ConfirmDialogAdd";

export default function NewCharacter() {
  const { casts, dispatch } = useContext(CastContext);
  const [characters, setCharacters] = useState([]);
  const [cha, setCha] = useState([]);
  const [character, setCharacter] = useState([]);
  const [addCha, setAddCha] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
  const [confirmDialogUp, setConfirmDialogUp] = useState({ isOpen: false, title: '', subTitle: '' });
  const [confirmDialogAdd, setConfirmDialogAdd] = useState({ isOpen: false, title: '', subTitle: '' });
 
  useEffect(() => {
    getCasts(dispatch,setNotify);
  }, [dispatch]);

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const res = await axios.get("/characters/", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setNotify({
          isOpen: true,
          message: "Successfully",
          type: "success",
        });
        setCharacters(res.data);
      } catch (err) {
        setNotify({
          isOpen: true,
          message: "Failed: " + err,
          type: "error",
        });
        console.log(err);
      }
    };
    getCharacters();
  }, []);

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    let text = value.toString();
    setCha(text);
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setCharacter({ ...character, _id: cha, [e.target.name]: value });
  };

  const handleUpload = (e) => {
    setConfirmDialogUp({
      ...confirmDialogUp,
      isOpen: false
  });
    const updateCharacters = async () => {
      try {
        const res = await axios.put(
          "/characters/update/" + character._id,
          character,
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
          message: "Update character Successfully",
          type: "success",
        });
      } catch (err) {
        setNotify({
          isOpen: true,
          message: "Update character Failed: " + err,
          type: "error",
        });
        console.log(err);
      }
    };
    updateCharacters();
  };

  const handleDelete = (e) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
  });
    const deleteCharacters = async () => {
      try {
        const res = await axios.put("/characters/delete/" + cha, cha, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setNotify({
          isOpen: true,
          message: "Delete character Successfully",
          type: "success",
        });
      } catch (err) {
        setNotify({
          isOpen: true,
          message: "Delete character Failed: " + err,
          type: "error",
        });
        console.log(err);
      }
    };
    deleteCharacters();
  };

  const handleChangee = (e) => {
    const value = e.target.value;
    setAddCha({ ...addCha, [e.target.name]: value });
  };
 console.log(addCha)
  const handleAdd = (e) => {
    setConfirmDialogAdd({
      ...confirmDialogAdd,
      isOpen: false
  });
    const addChar = async () => {
      try {
        const res = await axios.post("/characters/add/", addCha, {
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
    addChar();
  };
 
  return (
    <div className="newCharacter">
      <h1 className="addCharacterTitle">Character Manager</h1>
      <form className="addCharacterForm">
        <div className="formLeft">
          <div className="addCharacterItem">
            <label>Character Id</label>
            <TextField
              disabled
              type="text"
              placeholder="Character Id show hear"
              name="_id"
              value={cha}
            />
          </div>
          <Delete
            className="CharacterItemDelete"
            fontSize="large"
            type="button"
            onClick= 
          {() => 
            setConfirmDialog({
              isOpen: true,
              title: 'Are you sure to Delete this Character?',
              subTitle: "You can check again when Refresh",
              onConfirm: ( handleDelete)
          })
        }
          />
          <div className="addCharacterItem">
            <label>Change Name Character </label>
            <TextField
              type="text"
              placeholder="New name for character "
              name="name"
              onChange={handleChange}
            />
          </div>

          <div className="addCharacterItem">
            <label>Change Name Cast</label>
           
            <Autocomplete
              autoComplete
              getOptionLabel={(option) => option}
              disableClearable
              filterSelectedOptions={false}
              options={casts.map((option) => option.name)}
              renderInput={(params) => (
                <TextField
                  name="namecast"
                  value={params}
                  onChange={handleChange}
                  {...params}
                  label="Search input"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </div>
          <Cached
            className="CharacterItem"
            fontSize="large"
            type="button"
            onClick= 
              {() => 
                setConfirmDialogUp({
                  isOpen: true,
                  title: 'Are you sure to Update this Character?',
                  subTitle: "You can check again when Refresh",
                  onConfirm: ( handleUpload)
              })
            }
          />
        </div>

        <div className="formRight">
        <div className="addCharacterItem">
            <label>All Character</label>
            <Select
              multiple
              native
              name="character"
              onChange={handleSelect}
              style={{ height: "120px" }}
            >
              {characters.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="addListItem">
            <label>Add Character</label>
            <TextField
              type="text"
              placeholder="Add Character "
              name="name"
              onChange={handleChangee}
            />
          </div>
          <div className="addCharacterItem">
            <label>Add Name Cast</label>
            {/* <TextField
              type="text"
              placeholder="action"
              placeholder="Add character "
              name="name"
            /> */}
            <Autocomplete
              autoComplete
              getOptionLabel={(option) => option}
              disableClearable
            
              filterSelectedOptions={false}
              options={casts.map((option) => option.name)}
              renderInput={(params) => (
                <TextField
                  name="namecast"         
                  onChange={handleChangee}
                  {...params} 
                  value={params}
                  label="Search input"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </div>
          <AddCircle
            className="ListItem"
            fontSize="large"
            type="button"
            onClick= 
          {() => 
            setConfirmDialogAdd({
              isOpen: true,
              title: 'Are you sure to Add this Character?',
              subTitle: "You can check again when Refresh",
              onConfirm: ( handleAdd)
          })
        }
          />

          
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
