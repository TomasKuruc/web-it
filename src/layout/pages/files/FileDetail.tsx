import React, {useState} from 'react';
import {Button, Stack} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {modifyFileDataItems, selectFileDetail} from "store/files/file";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import FileDetailTable from "layout/pages/files/components/FileDetailTable";
import {useForm, FormProvider} from "react-hook-form";
import {deleteFile} from "helpers/firebase/deleteFile";
import {showConfirmationAlert} from "helpers/showConfirmationAlert";
import {useFileActions} from "hooks/useFileActions";

interface Props {}

const FileDetail = (props: Props) => {
    const fileDetail = useSelector(selectFileDetail);
    const [editMode, setEditMode] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const methods = useForm();
    const {exportFile} = useFileActions()

    const goBack = (): void => {
        navigate('/files')
    }

    const onSubmitHandler = (data: any): void => {
        console.log(data);
        dispatch(modifyFileDataItems(data));
    }

    const editModeHandler = (): void => {
        setEditMode(!editMode);
        methods.handleSubmit(onSubmitHandler)();
    }

    const deleteFileHandler = (): void => {
        showConfirmationAlert(() => {
            deleteFile(fileDetail.id).then(r => goBack())
        });
    }

    const saveFileHandler = (): void => {
        methods.handleSubmit(onSubmitHandler)();
        setEditMode(false);
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
                            <Button
                                variant="contained"
                                color={"secondary"}
                                onClick={editModeHandler}
                                startIcon={<EditIcon />}>
                                Edit mode
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
                    <FileDetailTable editMode={editMode}/>
                </form>
            </FormProvider>
            <Stack direction="row" spacing={2} mt={4}>
                <Button onClick={goBack} variant="contained" startIcon={<ArrowBackIcon />}>
                    Back
                </Button>
                <Button onClick={deleteFileHandler} variant="contained" color={"error"} startIcon={<DeleteSweepIcon />}>
                    Delete
                </Button>
                <Button
                    variant="contained"
                    color={"success"}
                    onClick={saveFileHandler}
                    startIcon={<SaveIcon />}>
                    Save file
                </Button>
                <Button
                    variant="contained"
                    color={"secondary"}
                    startIcon={<FileDownloadIcon />}>
                    {exportFile(fileDetail)}
                </Button>
            </Stack>
        </div>
    );
};

export default FileDetail;