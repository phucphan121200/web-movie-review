import "./newMovie.scss";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import storage from "../../firebase";
import { createMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Notification from "../../components/Alert/Notification";
import Select from "@mui/material/Select";
import { MenuItem, TextField } from "@mui/material";
import ConfirmDialogAdd from "../../components/Alert/ConfirmDialogAdd";


export default function Movies() {
  const [movie, setMovie] = useState(null);
  const [namePic, setnamePic] = useState(null);
  const [coverPic, setcoverPic] = useState(null);
  const [img, setImg] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
 
  const { dispatch } = useContext(MovieContext);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(0);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [country, setCountry] = useState([]);
  const [categories, setCategory] = useState([]);
  const [productions, setProd] = useState([]);
  const [character, setChar] = useState([]);
  const [cast, setCast] = useState([]);
  const [castItem, setcastItem] = useState([]);
  useEffect(() => {
    const getCountry = async () => {
      try {
        const res = await axios.get("/countries/");
        setCountry(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCountry();

    const getCategory = async () => {
      try {
        const res = await axios.get("/categories/", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setCategory(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategory();

    const getChar = async () => {
      try {
        const res = await axios.get("/characters/", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setChar(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getChar();

    const getProd = async () => {
      try {
        const res = await axios.get("/productions/", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setProd(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProd();

    const getCast = async () => {
      try {
        const res = await axios.get("/casts/", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setCast(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCast();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;

    setMovie({ ...movie, [e.target.name]: value });
  };

  const handleChangeSelectCate = (e) => {
    const category = e.target.value;
    const key = e.target.name;

    setMovie({ ...movie, [key]: { category } });
  };
  const handleChangeSelect = (e) => {
    const character = e.target.value;
    
    setcastItem({ ...castItem,  [e.target.name]: character  });
    // setMovie({ ...movie, [key]: {  [e.target.name]: character }    });
  };
  const handleChangeSelectCast = (e) => {
    const namecast = e.target.value;

    setcastItem({ ...castItem,  [e.target.name]: namecast  });
  };
  const handleChangeSelectProd = (e) => {
    const production = e.target.value;
    const key = e.target.name;

    setMovie({ ...movie, [key]: { production }, castItems: castItem });
  };

  
  const handleUpload = (e) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
  });
    e.preventDefault();
    upload([
      { file: namePic, label: "namePic" },
      { file: coverPic, label: "coverPic" },
      { file: img, label: "img" },
      { file: trailer, label: "trailer" },
      
    ]);
  };



  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/Movies/${fileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          if (progress === 100)
          {      
            setNotify({
              isOpen: true,
              message: 'Upload Image Successfully',
              type: 'success'
          })
          }
          else 
          {
            setNotify({
              isOpen: true,
              message: 'Uploading',
              type: 'warning'
          })
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleSubmit = (e) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
  });
    e.preventDefault();
    createMovies(movie, dispatch,setNotify);
    
  };


  return (
    <div className="newMovie">
      <h1 className="addMovieTitle">New Movie</h1>
      <form className="addMovieForm">
        <div className="addMovieForm">
          <div className="addMovieItem">
            <label>Name Image</label>
            <input
              type="file"
              id="img"
              name="namePic"
              accept="image/png, image/jpg, image/jpeg"
              onChange={(e) => setnamePic(e.target.files[0])}
            />
          
          </div>
          <div className="addMovieItem">
            <label>Thumbnail image</label>
            <input
              type="file"
              id="imgSm"
              name="coverPic"
              accept="image/png, image/jpg, image/jpeg"
              onChange={(e) => setcoverPic(e.target.files[0])}
            />
           
          </div>
          <div className="addMovieItem">
            <label>Poster</label>
            <input
              type="file"
              id="imgSm"
              name="img"
              accept="image/png, image/jpg, image/jpeg"
              onChange={(e) => setImg(e.target.files[0])}
            />
           
          </div>
          <div className="addMovieItem">
            <label>Trailer</label>
            <input
              type="file"
              name="trailer"
              onChange={(e) => setTrailer(e.target.files[0])}
            />
          
          </div>
          <Box sx={{ width: "98%" }}>
              <LinearProgress
              className="addMovieBar"
                variant="determinate"
                value={progress}
                max="100"
              />
            </Box>
        </div>
        {uploaded === 4 ? (
          <button 
          type="button"
          className="addMovieButton"
          onClick= 
          {() => 
            setConfirmDialog({
              isOpen: true,
              title: 'Are you sure to Add this cast?',
              subTitle: "You can check again in Menu",
              onConfirm: ( handleSubmit)
          })
        }
          >
            Create
          </button>
        ) : (
          <button 
          type="button"
          className="addMovieButton" 
          onClick={() => 
            setConfirmDialog({
              isOpen: true,
              title: 'Are you sure to Upload this Image for new Cast?',
              subTitle: "You can't change it once confirmed",
              onConfirm: ( handleUpload)
          })
        }
          >
            Upload
          </button>
        )}
        

        <div className="addMovieForm">
          <div className="addMovieItem">
            <label>Title</label>
            <TextField
              type="text"
              placeholder="Name Movie"
              name="title"
              onChange={handleChange}
            />
          </div>

          <div className="addMovieItem">
            <label>Age Limit</label>
            <TextField
              type="number"
              placeholder="Age Limit"
              name="limit"
              onChange={handleChange}
            />
          </div>

          <div className="addMovieItem">
            <label>ReleaseDate</label>
            <TextField type="date" name="releaseDate" onChange={handleChange} />
          </div>

          <div className="addMovieItem">
            <label>Site</label>
            <Select name="site" id="site" onChange={handleChange}>
              <MenuItem value="Cinema">Cinema</MenuItem>
              <MenuItem value="Netflix">Netflix</MenuItem>
              <MenuItem value="HBO">HBO</MenuItem>
              <MenuItem value="Disney+">Disney+</MenuItem>
            </Select>
          </div>
          
          

          <div className="addMovieItem">         
            <label>Country</label>
            <Select name="namecount" id="country" onChange={handleChange}>
              {(() => {
                let val = [];
                for (let i = 0; i < country.length; i++) {
                  val.push(
                    <MenuItem value={country[i].name}>
                      {" "}
                      {country[i].name}{" "}
                    </MenuItem>
                  );
                }
                return val;
              })()}
            </Select>
          </div>

          <div className="addMovieItem">
            <label>Category</label>
            <Select
              name="categoryItems"
              id="category"
              label="category"
              onChange={handleChangeSelectCate}
            >
              {(() => {
                let valcate = [];
                for (let i = 0; i < categories.length; i++) {
                  valcate.push(
                    <MenuItem value={categories[i]._id}>
                      {" "}
                      {categories[i].name}
                    </MenuItem>
                  );
                }
                return valcate;
              })()}
            </Select>
          </div>

          <div className="addMovieItem">
            <label>Producers</label>
            <Select
              name="productionItems"
              id="productionItems"
              onChange={handleChangeSelectProd}
            >
              {(() => {
                let valPro = [];
                for (let i = 0; i < productions.length; i++) {
                  valPro.push(
                    <MenuItem value={productions[i]._id}>
                      {" "}
                      {productions[i].name}
                    </MenuItem>
                  );
                }
                return valPro;
              })()}
            </Select>
          </div>
        
        </div>
        <div className="addMovieForm">
        <div className="addMovieItem">
            <label>Cast</label>
            <Select
              name="namecast"
              id="1"
              onChange={handleChangeSelectCast}
            >
              {(() => {
                let valCasts = [];
                for (let i = 0; i < cast.length; i++) {
                  valCasts.push(
                    <MenuItem value={cast[i].name}> {cast[i].name}</MenuItem>
                  );
                }
                return valCasts;
              })()}
            </Select>
            </div>
          <div className="addMovieItem">
            <label>Character</label>
            <Select
              name="character"
              id="2"
              onChange={handleChangeSelect}
            >
              {(() => {
                let valCha = [];
                for (let i = 0; i < character.length; i++) {
                  valCha.push(
                    <MenuItem value={character[i].name}> {character[i].name}</MenuItem>
                  );
                }
                return valCha;
              })()}
            </Select>
            
          </div>
          <div className = "addMovieForm">
          <div className="addMovieItem">
            <label>Description</label>
            <textarea rows="4" cols="50" name="desc" onChange={handleChange} />
          </div>
        </div>
        </div>
      </form>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialogAdd
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
    </div>
  );
}
