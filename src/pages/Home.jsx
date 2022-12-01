import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import { loadUsers } from "../redux/actions";

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
];

function createData(id, name, email, gender, status) {
  return { id, name, email, gender, status };
}

const Home = () => {
  const dispatch = useDispatch();
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

  return (
    <>
      <h1>Daftar Pengguna</h1>
      <p>{process.env.REACT_APP_NOT_SECRET_CODE}</p>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
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
                      {columns.map((column) => {
                        const value = users[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
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
