import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { deleteUsers, loadUsers } from "../redux/actions";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
import { Box, Stack } from "@mui/system";
const columns = [
  {
    id: "id",
    label: "ID",
    minWidth: 170,
    align: "center",
  },
  {
    id: "name",
    label: "Name",
    minWidth: 100,
    align: "center",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "center",
  },
  {
    id: "gender",
    label: "Gender",
    minWidth: 170,
    align: "center",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "center",
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { users } = useSelector((state) => state.data);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete this user ?")) {
      dispatch(deleteUsers(id));
    }
  };
  return (
    <>
      <h2>Daftar Pengguna</h2>
      <div className="button-action">
        <Button
          variant="contained"
          color="primary"
          onClick={() => history("/addUser")}
        >
          Create User
        </Button>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 540 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((users) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={users.id}
                    >
                      <TableCell align="center">{users.id}</TableCell>
                      <TableCell align="center">{users.name}</TableCell>
                      <TableCell align="center">{users.email}</TableCell>
                      <TableCell align="center">{users.gender}</TableCell>
                      <TableCell align="center">{users.status}</TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            "& > *": {
                              m: 1,
                            },
                          }}
                        >
                          <ButtonGroup
                            variant="text"
                            aria-label="text button group"
                          >
                            <Stack spacing={1} direction="row">
                              <Button
                                variant="outlined"
                                color="primary"
                                onClick={() =>
                                  history(`/detailUser/${users.id}`)
                                }
                              >
                                Detail
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => history(`/editUser/${users.id}`)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleDelete(users.id)}
                              >
                                Delete
                              </Button>
                            </Stack>
                          </ButtonGroup>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default Home;
