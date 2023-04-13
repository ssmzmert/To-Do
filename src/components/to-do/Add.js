import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { AddToUser } from "../../requests/requests";

async function addItem(data) {
  const token = localStorage.getItem("AccessToken");

  const response = await AddToUser(data, token);
  console.log(response);
}

export function Add({ handleClose, setItems }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const item = {
      title: data.get("title"),
      description: data.get("description"),
      picture: null,
      file: null,
    };
    console.log(item);
    addItem(item);
    setItems((old) => [...old, item]);
    handleClose();
  };
  return (
    <Box width="500px" height="350px">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 1 }}
        margin="40px"
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="description"
          label="Description"
          type="description"
          id="description"
          autoComplete="current-description"
          multiline
          minRows={4}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
