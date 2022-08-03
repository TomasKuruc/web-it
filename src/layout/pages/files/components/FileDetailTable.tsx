import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from "react-redux";
import {selectFileDetail, setFileDetail} from "store/files/file";
import EditForm from "layout/pages/files/components/EditForm";
import FormControl from "@mui/material/FormControl";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {transformData} from "utils/transformData";
import {useFormContext} from "react-hook-form";
import {getTotalPrice} from "utils/getTotalPrice";
import {getTotalHoursCount} from "utils/getTotalHoursCount";

interface FileDetailTableProps {
    editMode: boolean,
}

const FileDetailTable = (props: FileDetailTableProps) => {
    const file = useSelector(selectFileDetail);
    const [price, setPrice] = useState(file.price);
    const {hours} = transformData(file.data);
    const {register} = useFormContext();
    const dispatch = useDispatch();
    const [count, setCount] = useState(hours.reduce((partialSum, a) => partialSum + a, 0));

    useEffect(() => {
        setCount(hours.reduce((partialSum, a) => partialSum + a, 0));
    }, [file.data])

    useEffect(() => {
        dispatch(setFileDetail({...file, price: price}))
    }, [price])

    console.log(hours)

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {Object.keys(file.data[0].item).map(item => (
                            <TableCell key={item}>{item}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {file.data.map((row: any, rowIndex: number) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {Object.values(row.item).map((rowItem: any, rowItemIndex) => (
                                <TableCell key={rowItemIndex} component="th" scope="row">
                                    {
                                        rowItemIndex > 0 && props.editMode
                                            ? <EditForm
                                                defaultValue={rowItem}
                                                index={rowItemIndex}
                                                name={'row['+rowIndex+'][' + rowItemIndex + ']'}
                                                rowLength={Object.keys(row.item).length - 1}/>
                                            : rowItem
                                    }
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            name
                        </TableCell>
                        <TableCell component="th" scope="row">
                            price per hour
                        </TableCell>
                        <TableCell component="th" scope="row">
                            total price
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            total
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {count}
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            total price
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {!props.editMode
                                ? (
                                    file.price + " Kc"
                                ) : (
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <TextField
                                                {...register('price')}
                                                id="outlined-basic"
                                                value={file.price}
                                                defaultValue={file.price}
                                                onChange={(e) => setPrice(+e.target.value)}
                                                variant="outlined" />
                                        </FormControl>
                                    </Box>
                                ) }
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {getTotalPrice(getTotalHoursCount(transformData(file.data).hours), price)} Kc
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default FileDetailTable;