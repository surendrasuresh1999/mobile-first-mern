import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead"; // Add TableHead import
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { EyeIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import UserDialogbox from "./UserDialogbox";
import MuiLoader from "../Common/MuiLoader";
const headers = ["Name", "Gender", "Height", "Weight", "Films", "Action"];

const CustomPaginationActionsTable = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [nextIsAvailable, setNextIsAvailable] = useState(false);
  const [prevIsAvailable, setPrevIsAvailable] = useState(false);
  const [openDialogObj, setOpenDialogObj] = useState({ open: false, url: "" });
  const [isFetching, setIsFetching] = useState(true);
  const [tableData, setTableData] = useState([]);

  const getSwapiPeoplesData = () => {
    axios
      .get(`https://swapi.dev/api/people/?page=${pageIndex}`)
      .then((response) => {
        response?.data?.next !== null
          ? setNextIsAvailable(true)
          : setNextIsAvailable(false);
        response?.data?.previous !== null
          ? setPrevIsAvailable(true)
          : setPrevIsAvailable(false);
        setTableData(response?.data?.results);
        setIsFetching(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getSwapiPeoplesData();
  }, [pageIndex]);

  return (
    <div>
      {isFetching ? (
        <MuiLoader />
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
              {tableData?.map((row) => (
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
                        onClick={() =>
                          setOpenDialogObj({ open: true, url: row.url })
                        }
                        className="flex items-center justify-center gap-1 border px-2 py-1 rounded-md"
                      >
                        <EyeIcon className="h-6 w-6 text-gray-500" />
                        View
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="flex items-center justify-end gap-3">
                    <span className="font-bold text-14size text-black">Current page: {pageIndex}</span>
                    <IconButton
                      onClick={() => {
                        setIsFetching(true);
                        if (pageIndex !== 0) {
                          setPageIndex((prevIndex) => prevIndex - 1);
                        }
                      }}
                      disabled={!prevIsAvailable}
                      aria-label="previous page"
                    >
                      <KeyboardArrowLeft />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setIsFetching(true);
                        setPageIndex((prevIndex) => prevIndex + 1);
                      }}
                      disabled={!nextIsAvailable}
                      aria-label="next page"
                    >
                      <KeyboardArrowRight />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
      {openDialogObj.open && (
        <UserDialogbox openDialog={openDialogObj} setter={setOpenDialogObj} />
      )}
    </div>
  );
};

export default CustomPaginationActionsTable;
