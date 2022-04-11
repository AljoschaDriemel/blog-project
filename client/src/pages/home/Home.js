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


export default function Home() {
  const { userData, setUserData, posts, setPosts } = useContext(DataContext);
  const [newPost, setNewPost] = useState("");

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));
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
                <div style={{textAlign:"left", marginLeft:"10px"}}>Text added by <span style={{fontWeight:"bold"}}>{item.owner.username} on {item.date}</span></div>
              </Typography>
            <CardActions
              disableSpacing
              sx={{ position: "absolute", marginBottom: 0 }}
            >
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        </div>
      ))}
    </div>
  );
}
