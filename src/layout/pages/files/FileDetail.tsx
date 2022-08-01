import React from 'react';
import BasicTable from "layout/pages/files/components/FileDetailTable";
import {Button, Stack} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {selectFileDetail, setFileDetail} from "store/files/file";
import {File, removeFileFromUnsaved, saveFile} from "store/files/files";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';

interface Props {}

const FileDetail = (props: Props) => {
    const fileDetail = useSelector(selectFileDetail);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goBack = (): void => {
        navigate(-1);
    }

    const saveFileHandler = (file: File): void => {
        dispatch(saveFile(file));
        dispatch(removeFileFromUnsaved(file.id));
        navigate("/");
    }

    if (!fileDetail.data) {
        return <React.Fragment>..loading data</React.Fragment>
    }

    return (
        <div className="FileDetail">
            <Box mb={3}>
                <Paper elevation={1} style={{padding: "10px"}}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography variant={'h5'} textAlign={"left"}>
                                {fileDetail.created_at} - {fileDetail.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} textAlign={"right"}>
                            <Button variant="contained" color={"secondary"} startIcon={<EditIcon />}>
                                Edit mode
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
            <BasicTable/>
            <Stack direction="row" spacing={2} mt={4}>
                <Button onClick={goBack} variant="contained" startIcon={<ArrowBackIcon />}>
                    Back
                </Button>
                <Button variant="contained" color={"error"} startIcon={<DeleteSweepIcon />}>
                    Delete
                </Button>
                <Button
                    variant="contained"
                    color={"success"}
                    onClick={() => saveFileHandler(fileDetail)}
                    startIcon={<SaveIcon />}>
                    Save file
                </Button>
                <Button variant="contained" color={"secondary"} startIcon={<FileDownloadIcon />}>
                    Export .csv
                </Button>
            </Stack>
        </div>
    );
};

export default FileDetail;