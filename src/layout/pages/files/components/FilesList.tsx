import React from 'react';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {useDispatch, useSelector} from "react-redux";
import {File, selectFiles} from "store/files/files";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router";
import {setFileDetail, setFileDetailData} from "store/files/file";
import {transformData} from "utils/transformData";
import {sortData} from "utils/sortData";

interface Props {}

const FilesList = (props: Props) => {
    const files = useSelector(selectFiles);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openFileDetail = (file: File) => {
        dispatch(setFileDetail(file));
        dispatch(setFileDetailData(sortData(file)))

        navigate("/fileDetail");
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {files.saved.map((file: File) => (
                        <TableRow
                            key={file.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {file.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {file.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {file.created_at}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <Button onClick={() => openFileDetail(file)}>
                                    <RemoveRedEyeIcon/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    )).reverse()}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default FilesList;