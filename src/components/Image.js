import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/Item.css";
import { useHistory } from "react-router-dom";

const Image = ({
  image_id,
  image_name,
  created_at,
  album_id,
  deleteImage,
  isViewMode = "false",
}) => {
  const history = useHistory();

  return (
    <div className="item-box">
      <div className="box-title">{image_name}</div>
      <div className="info">
        <div>Created At: {created_at}</div>
      </div>
      {isViewMode === "false" ? (
        <div className="button-case">
          <Stack direction="row" spacing={3}>
            <Button
              variant="contained"
              color="success"
              onClick={() =>
                history.push("/albums/" + album_id + "/" + image_id)
              }
            >
              Open
            </Button>
            <Button
              variant="outlined"
              onClick={() => deleteImage(album_id, image_id)}
              startIcon={<DeleteIcon />}
              color="error"
            >
              Delete
            </Button>
          </Stack>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Image;
