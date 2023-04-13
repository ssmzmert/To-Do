import { Box, Button, TextField } from "@mui/material";
import React from "react";

export function Edit({ handleClose, items, setItems, index }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const item = {
      title: data.get("title"),
      description: data.get("description"),
      picture: null,
      file: null,
      id: "",
    };
    console.log(item);

    const newItems = [...items.slice(0, index), ...items.slice(index + 1)];
    setItems(newItems);
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
          defaultValue={items[index].title}
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
          defaultValue={items[index].description}
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
