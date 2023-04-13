import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  ListItemButton,
  TextField,
} from "@mui/material";
import { Add } from "./components/to-do/Add";
import { Edit } from "./components/to-do/Edit";
import { GetUser } from "./requests/requests";
import { useNavigate } from "react-router-dom";

async function getUser() {
  const response = await GetUser();
  console.log(response);
}

export default function ToDo() {
  const [searchText, setSearchText] = React.useState("");
  const [checked, setChecked] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [itemIndex, setItemIndex] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseEdit = () => setOpenEdit(false);
  const navigate = useNavigate();

  console.log(checked);
  const [items, setItems] = React.useState([
    {
      picture: null,
      file: null,
      title: "This is a Title1",
      description: "This is a Description",
      id: "",
    },
    {
      picture: null,
      file: null,
      title: "This is a Title2",
      description: "This is 2nd Description",
      id: "",
    },
  ]);

  React.useEffect(() => {
    getUser();
  }, []);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (checked.length < 1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const getFilteredData = () => {
    if (!searchText) {
      return items;
    } else {
      const filteredData = items.filter((row) => {
        return Object.values(row).some((value) => {
          return value
            ?.toString()
            .toLowerCase()
            .includes(searchText.toLowerCase());
        });
      });

      return filteredData;
    }
  };

  const onSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleDelete = (event) => {
    if (checked.length) {
      const index = items.findIndex((object) => {
        return object?.description === checked[0]?.description;
      });
      console.log("To be deleted", items[index]);
      const newItems = [...items.slice(0, index), ...items.slice(index + 1)];
      setItems(newItems);
      setChecked([]);
    }
  };
  const handleOpenEdit = (index) => {
    setItemIndex(index);
    setOpenEdit(true);
  };
  const handleLogout = (index) => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <Button
        variant="contained"
        color="warning"
        sx={{ width: "100px" }}
        onClick={handleLogout}
      >
        Logout
      </Button>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        flexDirection="row"
      >
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="Dialog-modal-title"
          aria-describedby="Dialog-modal-description"
          maxWidth="1000px"
        >
          <Box>
            <Add handleClose={setOpen} setItems={setItems} />
          </Box>
        </Dialog>
        <Dialog
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="Dialog-modal-title"
          aria-describedby="Dialog-modal-description"
          maxWidth="1000px"
        >
          <Box>
            <Edit
              handleClose={setOpenEdit}
              items={items}
              setItems={setItems}
              index={itemIndex}
            />
          </Box>
        </Dialog>
        <Box display="flex" flexDirection="column" margin="40px">
          <TextField
            size="small"
            value={searchText}
            onChange={onSearchTextChange}
            label="Search"
          />
          <Box marginTop="20px">
            <Button
              variant="contained"
              color="success"
              sx={{ width: "100px", marginRight: "40px" }}
              onClick={handleOpen}
            >
              Add
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{ width: "100px" }}
              onClick={handleDelete}
              disabled={checked.length === 0}
            >
              Remove
            </Button>
          </Box>
        </Box>
        <Box width="500px">
          <Card variant="outlined">
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {items &&
                getFilteredData().map((item, index) => (
                  <div key={item.description}>
                    <ListItem
                      alignItems="flex-start"
                      secondaryAction={
                        <Checkbox
                          edge="end"
                          onChange={handleToggle(item)}
                          checked={checked.indexOf(item) !== -1}
                          // inputProps={{ "aria-labelledby": labelId }}
                        />
                      }
                    >
                      <ListItemButton
                        role={undefined}
                        onClick={() => handleOpenEdit(index)}
                        dense
                      >
                        <ListItemAvatar>
                          <Avatar src={item?.picture} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={item?.title}
                          secondary={
                            <React.Fragment>{item?.description}</React.Fragment>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
                ))}
            </List>
          </Card>
        </Box>
      </Box>
    </>
  );
}
