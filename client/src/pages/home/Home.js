import React from 'react'
import {useContext, useState, useEffect} from 'react'
import {DataContext} from '../context/Context'
import axios from 'axios'
import "./Home.scss"
import parse from "html-react-parser"

export default function Home() {

  const {userData, setUserData, posts, setPosts} = useContext(DataContext)
  const [newPost, setNewPost] = useState("");

  const handleSave = async () => {
    console.log("saved");

    const data = {
      owner: userData._id,
      text: newPost,
    };

    console.log("Home: handleSave: data is", data);
    const response = await axios.post("/posts/add", data);

    console.log("save post: response is", response);

    setNewPost("");

    if (response.data.success) setPosts([...posts, response.data.post]);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/posts/listPosts");

      console.log("useEffect response from listing posts", response);

      setPosts([...response.data]);
      console.log("current user is", userData);
    };

    getData();
  }, []);

  return (
    <div className='mainContainer'>
      {posts?.map((item, idx) => (
        <div className='postContainer' key={item?._id}>
          <h1>
            Creator:{item?.owner.username}{" "}
          </h1>
          <img
            src={item?.image}
            alt=""
            style={{ height: "300px", width: "400px", objectFit: "cover" }}
          />
          <div>{item.title}</div>
          <div>{item.subtitle}</div>
          <div>{parse(item.text)}</div>
        </div>
      ))}
    </div>
  )
}
