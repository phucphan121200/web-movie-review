import ReactQuill from 'react-quill';
import React, { useEffect, useRef, useCallback, useState } from 'react'
import '../../../node_modules/react-quill/dist/quill.snow.css';
//import storage from "../../utils/firebase";
import { checkImage, imageUpload } from '../../utils/uploadFile';

const Quill = ({ setBody }) => {
    const [image, setImage] = useState('');
    const [url, setUrl] = useState("");
    //const [body, setBody] = useState("")
    const quillRef = useRef(null)
    const handleChange = (e) => {
        //console.log(e)
        setBody(e)
    }
    //console.log(url)
    const modules = { toolbar: { container } }

    const handleChangeImage = useCallback(() => {
        //console.log("Change Image")
        const input = document.createElement('input')
        input.type = "file"
        input.accept = "image/*"
        input.click()

        input.onchange = async () => {
            const files = input.files
            if (!files) return;
            const file = files[0]
            console.log(input.files[0])
            const photo = await imageUpload(file)
            console.log(photo)

            const quill = quillRef.current;
            const range = quill?.getEditor().getSelection()?.index
            if(range !== undefined){
                quill?.getEditor().insertEmbed(range, 'image', `${photo}`)
            }
        }
    }, [])
    useEffect(() => {
        const quill = quillRef.current;
        if (!quill) return;

        let toolbar = quill.getEditor().getModule('toolbar')
        toolbar.addHandler('image', handleChangeImage)
    }, [handleChangeImage])

    return (
        <div>
            <ReactQuill theme="snow"
                modules={modules}
                onChange={handleChange}
                ref={quillRef} />
        </div>
    )
}
let container = [
    [{ 'font': [] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript

    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'align': [] }],

    ['clean', 'link', 'image', 'video']
]

export default Quill
