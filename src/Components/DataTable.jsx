import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead"; // Add TableHead import
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { EyeIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import UserDialogbox from "./UserDialogbox";

const DataTable = ({ count, page, rowsPerPage, onPageChange }) => {
  const theme = useTheme();

  const handleFirstPageButtonClick = () => {
    onPageChange(0);
  };

  const handleBackButtonClick = () => {
    onPageChange(page - 1);
  };

  const handleNextButtonClick = () => {
    onPageChange(page + 1);
  };

  const handleLastPageButtonClick = () => {
    onPageChange(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

function createData(name, calories, fat, gender, height) {
  return { name, calories, fat, gender, height };
}

const headers = ["Name", "Gender", "Height", "Weight", "Films", "Action"];

export default function CustomPaginationActionsTable() {
  const [prevPageIndex, setPrevPageIndex] = useState("");
  const [nextPageIndex, setNextPageIndex] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getSwapiPeoplesData = () => {
    axios
      .get(`https://swapi.dev/api/people/`)
      .then((response) => {
        const nextPageUrl =
          response?.data?.next !== null ? response?.data?.next : "";
        const prevPageUrl =
          response?.data?.prev !== null ? response?.data?.prev : "";
        setNextPageIndex(nextPageUrl?.match(/page=(\d+)/)[1]);
        setPrevPageIndex(prevPageUrl?.match(/page=(\d+)/)[1]);
        setTableData(response?.data?.results);
        setIsFetching(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getSwapiPeoplesData();
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      {isFetching ? (
        <div className="flex items-center justify-center py-10">
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell
                    key={index}
                    style={{
                      width: index !== 0 ? 160 : "",
                      fontWeight: "bold",
                      fontSize: 16,
                      color: "#31323b",
                    }}
                    align={index === 0 ? "left" : "right"}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? tableData?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : tableData
              )?.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.gender}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.height}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.mass}/kg
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.films.length}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => setOpenDialog(true)}
                        className="flex items-center justify-center gap-1 border px-2 py-1 rounded-md"
                      >
                        <EyeIcon className="h-6 w-6 text-gray-500" />
                        View
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20]}
                  colSpan={6}
                  count={tableData?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={(props) => (
                    <DataTable
                      {...props}
                      count={tableData?.length}
                      page={page}
                      rowsPerPage={rowsPerPage}
                      onPageChange={handleChangePage}
                    />
                  )}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
      {openDialog && (
        <UserDialogbox openDialog={openDialog} setter={setOpenDialog} />
      )}
    </div>
  );
}
