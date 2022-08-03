import React, {useEffect, useReducer, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import FilesList from "layout/pages/files/components/FilesList";
import {selectFiles, setSavedFiles} from "store/files/files";
import {fetchUserFiles} from "helpers/firebase/fetchUserFiles";
import {selectUser} from "store/user/user";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import {Button} from "@mui/material";
import {useFileActions} from "hooks/useFileActions";
import Grid from "@mui/material/Grid";

interface Props {}

const Files = (props: Props) => {
    const files = useSelector(selectFiles);
    const user = useSelector(selectUser).user;
    const dispatch = useDispatch();
    const fileInput = useRef<any>(null);
    const {importFile, fileUploadHandler} = useFileActions();

    useEffect(() => {
        if (!user) {
            return;
        }

        fetchUserFiles(user.uid).then(r => {
            dispatch(setSavedFiles(r))
        })
    }, []);

    if (!files.saved) {
        return <div>..loading data</div>
    }

    return (
        <div className="Files">
            <Grid container spacing={2} >
                <Grid item xs={4} textAlign={"left"}>
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
                </Grid>
            </Grid>
            <FilesList/>
        </div>
    );
};

export default Files;