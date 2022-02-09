import Layout from "./Layout";
import "../styles/common.css";
import "../styles/collection.css";
import Album from "./Album";
import ImageCollection from "./ImageCollection";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import axios from "axios";
import AddAlbumDialog from "./AddAlbumDialog";
import Home from "./Home";

function Collection() {
  const [albums, setAlbums] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const addAlbum = async (album_name) => {
    const resp = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/album/create`,
      { album_name: album_name },
      { headers: { "Content-Type": "application/json" } }
    );
    const status = await resp.data.status;
    const message = await resp.data.message;
    if (status) {
      const data = await resp.data.data;
      albums.push(data);
      setAlbums(albums);
    }
    return [status, message];
  };

  const getAlbums = async () => {
    const resp = await axios.get(`${process.env.REACT_APP_API_URL}/api/album`);
    const data = await resp.data.data;
    setAlbums(data);
  };

  const deleteAlbum = async (album_id) => {
    const resp = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/album/delete`,
      { album_id: album_id },
      { headers: { "Content-Type": "application/json" } }
    );
    const status = await resp.data.status;
    if (status) {
      setAlbums(albums.filter((album) => album.album_id !== album_id));
    }
  };

  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/albums">
            <Layout>
              <div className="title">
                <h1>Albums</h1>
              </div>
              <div id="item-container">
                {albums.map((x) => (
                  <Album
                    key={x.album_id}
                    album_id={x.album_id}
                    album_name={x.name}
                    created_at={x.created_at}
                    modified_at={x.modified_at}
                    image_count={x.image_count}
                    deleteAlbum={deleteAlbum}
                  />
                ))}
              </div>
              <div className="add-btn">
                <Fab
                  color="secondary"
                  onClick={handleClickOpen}
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>
              </div>
              <AddAlbumDialog
                open={dialogOpen}
                handleClose={handleClose}
                addAlbum={addAlbum}
              />
            </Layout>
          </Route>
          <Route exact path="/albums/:albumId">
            <ImageCollection />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default Collection;
