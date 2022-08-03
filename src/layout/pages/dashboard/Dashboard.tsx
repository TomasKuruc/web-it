import React, {useRef} from 'react';
import Grid from '@mui/material/Grid';
import {Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import Item from "layout/pages/dashboard/components/Item";
import {useSelector} from "react-redux";
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BasicCard from "layout/pages/dashboard/components/FileCard";
import {selectFiles} from "store/files/files";
import {useFileActions} from "hooks/useFileActions";

interface Props {}

const Dashboard = (props: Props) => {
    const fileInput = useRef<any>(null);
    const files = useSelector(selectFiles);
    const {importFile, fileUploadHandler} = useFileActions();


    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Item>
                    <Typography variant={"h6"}>CSV</Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddToDriveIcon />}
                        onClick={() => fileUploadHandler(fileInput)}>
                        Import .csv
                    </Button>
                    <input
                        ref={fileInput}
                        type="file"
                        name={"file"}
                        accept={".csv"}
                        onChange={importFile}
                        style={{visibility: "hidden"}}/>
                </Item>
            </Grid>
            <Grid item xs={8}>
                <Item>
                    <Typography variant={"h6"}>Unsaved Files</Typography>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {files.unsaved && files.unsaved.map(file => (
                            <Grid item key={file.id}>
                                <BasicCard file={file}/>
                            </Grid>
                        ))}
                    </Grid>
                </Item>
            </Grid>
        </Grid>
    );
};

export default Dashboard;