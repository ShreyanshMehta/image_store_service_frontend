import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function AddImageDialog({ open, handleClose, addImage }) {
  const [imageName, setImageName] = useState("");
  const [dialogId, setDialogId] = useState("outlined-basic");
  const [helperText, setHelperText] = useState("");
  const [isError, setIsError] = useState(false);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the image name here.
          </DialogContentText>
          <TextField
            autofocuse="true"
            error={isError}
            margin="dense"
            id={dialogId}
            label="Image Name"
            helperText={helperText}
            fullWidth
            required
            onChange={(e) => {
              setImageName(e.target.value);
            }}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              setHelperText("");
              setIsError(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              const [status, message] = await addImage(imageName);
              if (status) {
                setIsError(false);
                handleClose(() => {
                  setTimeout(500);
                });
                setHelperText("");
              } else {
                setIsError(true);
                setHelperText(message);
                setDialogId("outlined-error-helper-text");
              }
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
