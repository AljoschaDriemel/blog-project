import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/Context";
import axios from "axios";
import "./Home.scss";
import parse from "html-react-parser";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";
import moment from "moment"


export default function Home() {
  const { userData, setUserData, posts, setPosts } = useContext(DataContext);
  const [newPost, setNewPost] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([false]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  

  const [commentToUpdate, setCommentToUpdate] = useState({
    postid: null,
    commentid: null,
    text: "",
    idx: null,
  });
  

  
  /* const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }; */

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


  const handleCommentChange = (text, idx) => {
    console.log("text", text, idx);

    const oldComments = [...comments];
    oldComments[idx] = text;

    setComments([...oldComments]);
  };

  const handleAddComment = async (idx) => {
    const data = {
      postid: posts[idx]._id, // post id
      text: comments[idx],
      owner: userData._id,
    };

    const response = await axios.post("/posts/comments/add", data);

    console.log("add comment response is", response);

    if (response.data.success) {
      const oldPosts = [...posts];

      oldPosts[idx].comments = [...response.data.post.comments];
      setPosts([...oldPosts]);
      setComments((comments) => {
        comments[idx] = "";
        return [...comments];
      });
    }
  };

  const handleShowComments = (idx) => {
    const oldComments = [...showComments];
    oldComments[idx] = !oldComments[idx]; // toggle show the comments

    setShowComments([...oldComments]);
  };

  const handleDeleteComment = async (idx, cidx) => {
    console.log("idx, cidx", idx, cidx);

    const postid = posts[idx]._id;
    const commentid = posts[idx].comments[cidx]._id;

    const response = await axios.delete(
      `/posts/comments/delete/${postid}/${commentid}`
    );

    console.log("delete comment response is", response);

    if (response.data.success) {
      const oldPosts = [...posts];

      oldPosts[idx].comments = [...response.data.post.comments];
      setPosts([...oldPosts]);
    }
  };

  const handleEditComment = (idx, cidx) => {
    // get text from posts state
    const text = posts[idx].comments[cidx].text;

    setCommentToUpdate({
      postid: posts[idx]._id,
      commentid: posts[idx].comments[cidx]._id,
      text,
      idx,
    });
    setShowCommentModal(true);
  };

  const handleCommentSave = async () => {
    console.log("save comment pressed");

    const { postid, commentid, text } = commentToUpdate;

    const response = await axios.put(
      `/posts/comments/edit/${postid}/${commentid}`,
      { text }
    );

    console.log("edit comment response is", response);

    if (response.data.success) {
      const idx = commentToUpdate.idx;

      setShowCommentModal(false);
      const oldPosts = [...posts];

      // update the post state with the new array of comments for the specifc post
      oldPosts[idx].comments = [...response.data.post.comments];
      setPosts([...oldPosts]);

      setCommentToUpdate({
        postid: null,
        commentid: null,
        text: "",
        idx: null,
      });
    }
  };

  return (
    <div className="mainContainer">
      {posts?.map((item, idx) => (
        <div className="containerCart" key={item._id}>
          <Card sx={{ width: "300px", height: "600px" }}>
            <CardHeader
              title={item.title}
            />
            <CardMedia component="img" height="194" image={item.image} />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {item.subtitle}
                {parse(item.text)}
              </Typography>
            </CardContent>
             <Typography variant="body2" color="text.secondary">
                <div style={{textAlign:"left", marginLeft:"10px"}}>Text added by <span style={{fontWeight:"bold"}}>{item.owner.username} at {moment(item.date).format("MMM DD YYYY hh:mm")}</span></div>
                <p style={{marginLeft:"10px"}}>Category: {item.category}</p>
              </Typography> 
            <CardActions
              disableSpacing
              sx={{ position: "absolute", marginBottom: 0 }}
            >
             
              <span onClick={() => handleShowComments(idx)}>
                <CommentIcon />
                {item.comments.length}
              </span>
              
            </CardActions>
          </Card>
          {showComments[idx]
            ? item.comments.map((comment, cidx) => (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {comment.text}
                  <div className="editToolsContainer">
                    <EditIcon onClick={() => handleEditComment(idx, cidx)} />
                    <DeleteIcon
                      onClick={() => handleDeleteComment(idx, cidx)}
                    />
                  </div>
                </div>
              ))
            : null}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <textarea
              style={{ width: "220px", padding: "5px", marginRight: "10px" }}
              placeholder="Type your comment"
              value={comments[idx]}
              onChange={(e) => handleCommentChange(e.target.value, idx)}
            />
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              style={{ width: "70px", color: "green", background: "white" }}
              onClick={() => handleAddComment(idx)}
            >
              Send
            </Button>
          </div>
          <h3>{item?.description}</h3>

          {/* <div>This post has {item.comments.length} comments</div> */}
          {showCommentModal ? (
          <Modal
            save={handleCommentSave}
            close={() => setShowCommentModal(false)}
            value={commentToUpdate.text}
            onChange={(e) =>
              setCommentToUpdate({ ...commentToUpdate, text: e.target.value })
            }
          />
        ) : null}
        </div>
          
      ))}
    </div>
  );
}
function Modal({ save, close, value, onChange }) {
  return (
    <div
      style={{
        position: "fixed",
        background: "rgb(218, 214, 214)",
        width: "400px",
        height: "180px",
        top: "calc(100vh/2 - 150px)",
        left: "calc(100vw/2 - 150px)",
        display: "grid",
        placeContent: "center",
      }}
    >
      <textarea
        style={{ width: "300px", padding: "5px" }}
        value={value}
        onChange={onChange}
      />
      <p>
        <DeleteIcon variant="outlined" onClick={close} color="error" />
        <SaveIcon onClick={save} />
      </p>
    </div>
  );
}
