import React, {useRef} from 'react';
import Grid from '@mui/material/Grid';
import {Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import Item from "layout/pages/dashboard/components/Item";
import {useDispatch, useSelector} from "react-redux";
import { setFileDetail} from "store/files/file";
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BasicCard from "layout/pages/dashboard/components/FileCard";
import {addFileToUnsaved, selectFiles} from "store/files/files";
import {generateRandomID} from "utils/GenerateRandomID";

interface Props {}

const Dashboard = (props: Props) => {
    const dispatch = useDispatch();
    const fileInput = useRef<any>(null);
    const navigate = useNavigate();
    const files = useSelector(selectFiles);

    const fileUploadHandler = (): void => {
        fileInput.current.click();
    };

    const handleFileUpload = (event: any) => {

        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const data = results.data.map((item: any, index) => {
                    return {
                        id: index,
                        item: item
                    }
                })

                const file = {
                    id: generateRandomID(),
                    name: event.target.files[0].name,
                    created_at: new Date().toLocaleDateString(),
                    data: data
                }

                dispatch(setFileDetail(file));
                dispatch(addFileToUnsaved(file));
                navigate("/fileDetail");
            },
        });
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Item>
                    <Typography variant={"h6"}>CSV</Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddToDriveIcon />}
                        onClick={fileUploadHandler}>
                        Import .csv
                    </Button>
                    <input
                        ref={fileInput}
                        type="file"
                        name={"file"}
                        accept={".csv"}
                        onChange={handleFileUpload}
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