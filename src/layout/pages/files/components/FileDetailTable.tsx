import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useSelector} from "react-redux";
import {selectFileDetail} from "store/files/file";

export default function BasicTable() {
    const file = useSelector(selectFileDetail);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {Object.keys(file.data[0].item).map(item => (
                            <TableCell key={item}>{item}</TableCell>
                        ))}
                        <TableCell key={"other"}>Other</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {file.data.map((row: any, index: number) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {Object.values(row.item).map((rowItem: any, index) => (
                                <TableCell key={index} component="th" scope="row">
                                    {rowItem}
                                </TableCell>
                            ))}
                            <TableCell key={`other-${index}`} component="th" scope="row">

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
