import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/Item.css";
import { useHistory } from "react-router-dom";

const Album = ({
  album_id,
  album_name,
  created_at,
  modified_at,
  image_count,
  deleteAlbum,
}) => {
  const history = useHistory();

  return (
    <div className="item-box">
      <div className="box-title">{album_name}</div>
      <div className="info">
        <div>Created At: {created_at}</div>
        <div>Modified At: {modified_at}</div>
        <div>Total Images: {image_count}</div>
      </div>
      <div className="button-case">
        <Stack direction="row" spacing={3}>
          <Button
            variant="contained"
            color="success"
            onClick={() => history.replace("/albums/" + album_id)}
          >
            Open
          </Button>
          <Button
            variant="outlined"
            onClick={() => deleteAlbum(album_id)}
            startIcon={<DeleteIcon />}
            color="error"
          >
            Delete
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default Album;
