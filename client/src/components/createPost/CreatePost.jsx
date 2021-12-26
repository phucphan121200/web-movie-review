import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
// import { useLocation } from "react-router-dom";
// import axios from 'axios'
// import Select from "@mui/material/Select";
// import { MenuItem } from "@mui/material";
import ReactQuill from "../edit/ReactQuill"
import './createPost.scss'
import { imageUpload } from '../../utils/uploadFile';
import axios from 'axios';
const initialState = {
  title: '',
  content: '',
  desc: '',
  genre: '',
  user: '',
  err: '',
  success: '',
}
const CreatePost = () => {
  const [post, setPost] = useState(null)
  const genre = useSelector(state => state.genre.genre)
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [url, setUrl] = useState("");
  const token = useSelector(state => state.token)

  const handleInput = e => {
    const { name, value } = e.target
    setPost({ ...post, [name]: value })
  }
  useEffect(() => {
    setPost({ ...post, thumbnail: url, content: body })
  }, [url, body])

  const handleKeyDown = e => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }
  const handleChange = async event => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      const photo = await imageUpload(event.target.files[0])
      setUrl(photo);
    }
  };
  //console.log(postId)
  console.log(post)
  console.log(body)
  const handleSave = async e =>{
    e.preventDefault();
    const res = await axios.post('/posts/add', post, {
      headers: {token: "Bearer " + token}
  })
    console.log(res)
  }
  const handlePublish = async e =>{
    e.preventDefault();
    const res = await axios.post('/posts/publish', post, {
      headers: {token: "Bearer " + token}
  })
    console.log(res)
  }
  return (
    <div>
      <div className='check'>
        <input type="file" id='thumbnailinput' accept='image/*' className='thumbnailinput' style={{ display: "none" }}
          name='thumbnail' onChange={handleChange} />
        {
          !image ?
            <>
              <label htmlFor="thumbnailinput">
                <img src="https://static-cse.canva.com/blob/651263/youtube.jpg" alt="" className='thumbnailshow' />
              </label>
            </>

            :

            <>
              <label htmlFor="thumbnailinput">
                <img src={image} alt="" className='thumbnailshow' />
              </label>
            </>
        }

        <input type="text" className='title' placeholder='Title...' name='title' onChange={handleInput} />

        <div>
          <textarea className='desc' placeholder='Description....' name='desc' onInput={handleInput} onChange={handleKeyDown} />

        </div>
        <div>
          <small style={{ color: "gray" }}>{post == null ? 0 : (post.desc == null ? 0 : post.desc.length)}/200</small>
        </div>


        <ReactQuill className="quill" setBody={setBody} />

        <div className='cate'>
          <select className='getgenre' value={genre.name} name="genre" onChange={handleInput}>
            <option value="">Choose a category</option>
            {
              genre.map(genre => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))
            }
          </select>
        </div>


        <div className='buttonsavecreate'>
          <button className='buttonSavePost' onClick={handleSave}>Save</button>
          <button className='buttonCreate' onClick={handlePublish}>Publish</button>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
