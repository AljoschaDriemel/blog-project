import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { DataContext } from "../context/Context";
import Modal from "../modal/Modal";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import "./Profile.scss";
import { useRef } from 'react';
import parse from "html-react-parser"
import { textAlign } from "@mui/system";
import moment from "moment";


export default function Profile() {
  const { posts, setPosts, userData, setUserData } =
    useContext(DataContext);

  // States
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [blobFile, setBlobFile] = useState(null);
  const [profileUrl, setProfileUrl] = useState("");
  const [profileBlobFile, setProfileBlobFile] = useState(null);


  const [data, setData] = useState ({
    owner: userData._id,
    text: "",
    image: fileUrl,
    title:"",
    subtitle:"",
    published: false
  });
  const editorRef = useRef();
  
 
  /* --------------------POST IMAGE--------------------------------------------- */
  const handleSave = async () => {
    if (editorRef.current.getContent()) {
      console.log('Hande Save:', editorRef.current.getContent())

      console.log('data is', data)

      const response = await axios.post('/posts/addPost', data)

      console.log('response is', response)}
    
     const formdata = new FormData();

    Object.entries(data).forEach((item) => formdata.set(item[0], item[1]));

    if (blobFile) formdata.set("image", blobFile, "somefilename"); // add a file and a name

    const config = {
      headers: { "content-type": "mulitpart/form-data" },
    };

    console.log("Home: handleSave: data is", data);
    const response = await axios.post("/posts/addPost", formdata, config);

    console.log("save post: response is", response);

    setText("");
    setShowModal(false);

    if (response.data.success) setPosts([...posts, response.data.post]) ;
  }
  

  /* -------------POST IMAGE CHANGE ---------------------- */
  const handleImageChange = (e) => {
    console.log("File is", e.currentTarget.files[0]);
    // console.log('File is', e.target.files[0])

    const file = e.currentTarget.files[0];

    setFileUrl(URL.createObjectURL(file)); // create a url from file user chose and update the state

    setBlobFile(e.currentTarget.files[0]);
  };

  /* -------------Profile CHange--------------------- */
  const handleProfileChange = (e) => {
    console.log("File is", e.currentTarget.files[0]);

    const file = e.currentTarget.files[0];

    setProfileUrl(URL.createObjectURL(file)); // create a url from file user chose and update the state

    setProfileBlobFile(e.currentTarget.files[0]);
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));
  return (
    <div className="profileContainer">
      <div className="profileInfo">
        <h1 style={{fontWeight:"bold", textAlign:"center"}}>
          {" "}
          Welcome admin: @{userData ? userData.username : "Stranger"}{" "}
          <div>
            <h5>{posts?.filter((item) => item?.owner._id === userData?._id).length} posts</h5>{" "}
          </div>
        </h1>
        <div className="addPost"><ColorButton variant="contained" onClick={() => setShowModal(true)}>
          Add Post
        </ColorButton>
        </div>
        
      </div>
      <div className="userPostContainer">
        {posts?.map((item) =>
          item?.owner._id === userData?._id ? (
            <div className="card"
              key={item?._id}
            >
             
              <img className="image"
                src={item?.image}
                alt=""
              /> 
              <h2>{item.title}</h2>
              <h4>{item.subtitle}</h4>
              <p>{parse(item.text)}</p>
              <div className="info"><p>Text created by {item.owner.username} on {moment(item.date).format("MMM DD YYYY hh:mm")}</p>
              <p>Category: {item.category}</p>
              </div>
              
              
            </div>
          ) : null
        )}
      </div>
      {showModal ? (
        <Modal
          save={handleSave}
          close={() => setShowModal(false)}
          valueText={text}
          onTextChange={(e) => setText(e.target.value)}
          onChangeFile={handleImageChange}
          data={data}
          setData={setData}
          editorRef={editorRef}
        />
      ) : null}
    </div>
  );
}
