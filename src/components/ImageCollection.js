import { useParams } from "react-router-dom";
import axios from "axios";
import Image from "./Image";
import Layout from "./Layout";
import "../styles/collection.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AddImageDialog from "./AddImageDialog";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Collection from "./AlbumCollection";
import ImageView from "./ImageView";

const ImageCollection = () => {
  let { albumId } = useParams();
  const [images, setImages] = useState([]);
  const [albumName, setAlbumName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const addImage = async (image_name) => {
    const resp = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/album/${albumId}/add`,
      { image_name: image_name },
      { headers: { "Content-Type": "application/json" } }
    );
    const status = await resp.data.status;
    const message = await resp.data.message;
    if (status) {
      const data = await resp.data.data;
      images.push(data);
      setImages(images);
    }
    return [status, message];
  };

  const getImages = async () => {
    const resp = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/album/${albumId}/images`
    );
    const image_list = await resp.data.data.images;
    const album_name = await resp.data.data.album_name;
    setImages(image_list);
    setAlbumName(album_name);
  };

  const deleteImage = async (album_id, image_id) => {
    const resp = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/album/${album_id}/delete`,
      {
        image_id: image_id,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const status = await resp.data.status;
    if (status) {
      setImages(images.filter((image) => image.image_id !== image_id));
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/albums/:albumId">
          <Layout>
            <div className="title">
              <h1>{albumName}</h1>
            </div>
            <div id="item-container">
              {images.map((x) => {
                return (
                  <Image
                    album_id={albumId}
                    key={x.image_id}
                    image_id={x.image_id}
                    image_name={x.image_name}
                    created_at={x.created_at}
                    deleteImage={deleteImage}
                  />
                );
              })}
            </div>
            <div className="add-btn">
              <Fab
                color="secondary"
                onClick={handleClickOpen}
                caria-label="add"
              >
                <AddIcon />
              </Fab>
              <AddImageDialog
                open={dialogOpen}
                handleClose={handleClose}
                addImage={addImage}
              />
            </div>
          </Layout>
        </Route>
        <Route exact path="/albums">
          <Collection />
        </Route>
        <Route exact path="/albums/:albumId/:imageId">
          <ImageView />
        </Route>
      </Switch>
    </Router>
  );
};

export default ImageCollection;
