import {
  Button,
  ButtonGroup,
  Card,
  Container,
  MenuItem,
  TextField,
} from "@mui/material";
import { border, Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUsers, updateUsers } from "../../redux/actions";
const EditUser = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    gender: "female",
    status: "inactive",
  });
  const [error, setError] = useState();
  const { id } = useParams();
  const setGender = [
    {
      value: "female",
      label: "female",
    },
    {
      value: "male",
      label: "male",
    },
  ];

  const setStatus = [
    {
      value: "inactive",
      label: "inactive",
    },
    {
      value: "active",
      label: "active",
    },
  ];
  const { name, email, gender, status } = state;
  const history = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(getSingleUsers(id));
  }, []);
  useEffect(() => {
    console.log(users);
    if (users) {
      setState({ ...users });
    }
  }, [users]);
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !gender || !status) {
      setError("Please Input All Input");
    } else {
      dispatch(updateUsers(state, id));
      window.location = "/";
      setError("");
    }
  };
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275, marginTop: "5rem", background: "white" }}>
          <h1>Edit User</h1>
          {error && <h3 style={{ color: "red" }}>{error}</h3>}
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "45ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              name="name"
              value={name}
              type="text"
              onChange={handleInputChange}
            />
            <br />
            <TextField
              id="outlined-basic"
              label="Email"
              name="email"
              variant="outlined"
              value={email}
              type="email"
              onChange={handleInputChange}
            />
            <br />
            <TextField
              id="outlined-basic"
              select
              label="Gender"
              name="gender"
              variant="outlined"
              value={gender}
              onChange={handleInputChange}
            >
              {setGender.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <br />
            <TextField
              id="outlined-basic"
              select
              label="Status"
              name="status"
              variant="outlined"
              value={status}
              onChange={handleInputChange}
            >
              {setStatus.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <ButtonGroup variant="text" aria-label="text button group">
              <Stack spacing={26} direction="row">
                <Button
                  variant="outlined"
                  onClick={() => (window.location = "/")}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Stack>
            </ButtonGroup>
          </Box>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default EditUser;
