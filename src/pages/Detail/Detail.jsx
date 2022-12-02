import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  addPost,
  deletePost,
  getSingleUsers,
  loadPost,
} from "../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../Home.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Detail = () => {
  const [state, setState] = useState({
    title: "",
    body: "",
  });

  const { title, body } = state;
  const [error, setError] = useState();

  const { id } = useParams();
  const history = useNavigate();
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.data);
  const { post } = useSelector((state) => state.data);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(getSingleUsers(id));
  }, []);

  useEffect(() => {
    dispatch(loadPost());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete this post ?")) {
      dispatch(deletePost(id));
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !body) {
      setError("Please Input All Input");
    } else {
      dispatch(addPost(state));
      window.location = "/";
      setError("");
    }
  };
  return (
    <>
      <Card sx={{ minWidth: 275, textAlign: "left" }}>
        <CardContent>
          <div className="flex a-center">
            <div className="flex1">
              <Typography variant="h4" component="div">
                Lihat Pengguna
              </Typography>
            </div>
            <div className="flex3">
              <Button
                size="small"
                onClick={() => (window.location = "/")}
                variant="outlined"
              >
                Back
              </Button>
            </div>
          </div>
          <Typography variant="h6" component="div">
            Name : {users.name}
          </Typography>
          <Typography variant="h6" component="div">
            Email : {users.email}
          </Typography>
          <Typography variant="h6" component="div">
            Gender : {users.gender}
          </Typography>
        </CardContent>
        <CardActions>
          <div className="flex a-center">
            <div className="flex1">
              <h3>Daftar Post</h3>
            </div>
            <div className="flex3">
              <Button size="small" onClick={handleOpen} variant="contained">
                Create Post
              </Button>
            </div>
          </div>
        </CardActions>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Body</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {post.map((p) => (
                <TableRow
                  key={post.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{p.title}</TableCell>
                  <TableCell align="left">{p.body}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex a-center">
              <div className="flex1">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Create Post
                </Typography>
              </div>
              <div className="flex2">
                <Button size="small" onClick={handleSubmit} variant="contained">
                  Submit
                </Button>
              </div>
            </div>
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
                label="Title"
                variant="outlined"
                name="title"
                value={title}
                type="text"
                onChange={handleInputChange}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Body"
                name="body"
                variant="outlined"
                value={body}
                type="textarea"
                onChange={handleInputChange}
              />
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Detail;
