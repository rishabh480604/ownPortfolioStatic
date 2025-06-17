import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addYoutube, getUser } from "../../actions/user";
import { MdKeyboardBackspace } from "react-icons/md";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import YoutubeCard from "../youtubeCard/YoutubeCard";

const Youtube = () => {
  const { message, error, loading } = useSelector((state) => state.update);
  const { message: loginMessage } = useSelector((state) => state.login);

  const { user } = useSelector((state) => state.user);
  

  const dispatch = useDispatch();
  

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [clientName,setClientName]=useState("");
  const [description,setDescription]=useState("");
  const [role,setRole]=useState("");
  const [tools,setTools]=useState("");
  const [review,setReview]=useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(addYoutube(title, url, image,clientName,description,role,tools,review));
    dispatch(getUser());
    
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();

    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };
  

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (message) {
        console.log(message);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
    if (loginMessage) {
        console.log(loginMessage);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
  }, [error, message, dispatch, loginMessage]);

  return (
    <div className="adminPanel">
      <div className="adminPanelContainer">
        <Typography variant="h4">
          <p>A</p>
          <p>D</p>
          <p>M</p>
          <p>I</p>
          <p style={{ marginRight: "1vmax" }}>N</p>

          <p>P</p>
          <p>A</p>
          <p>N</p>
          <p>E</p>
          <p>L</p>
        </Typography>

        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="text"
            placeholder="Link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="text"
            placeholder="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="adminPanelInputs"
          />


          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="adminPanelInputs"
          />
          <input
          type="text"
          placeholder="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="adminPanelInputs"
        />
        <input
            type="text"
            placeholder="tools"
            value={tools}
            onChange={(e) => setTools(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="text"
            placeholder="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="adminPanelInputs"
          />

          <input
            type="file"
            onChange={handleImage}
            className="adminPanelFileUpload"
            accept="image/*"
          />


          <Link to="/account">
            BACK <MdKeyboardBackspace />
          </Link>

          <Button type="submit" variant="contained" disabled={loading}>
            Add
          </Button>
        </form>

        <div className="adminPanelYoutubeVideos">
            
        
          {user &&
            user.youtube  &&
            user.youtube.map((item) => (
              <YoutubeCard
                key={item._id}
                url={item.url}
                title={item.title}
                image={item.image.url}
                clientName={item.clientName}
                description={item.description}
                role={item.role}
                tools={item.tools}
                review={item.review}
                isAdmin={true}
                id={item._id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Youtube;