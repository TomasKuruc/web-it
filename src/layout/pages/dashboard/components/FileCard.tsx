import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {useNavigate} from "react-router";
import {File} from "store/files/files";
import {useDispatch} from "react-redux";
import {setFileDetail} from "store/files/file";

interface Props {
    file: File
}

export default function BasicCard(props: Props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const openFileDetailHandler = (): void => {
        dispatch(setFileDetail(props.file));
        navigate('/fileDetail');
    }

    return (
        <Card sx={{ maxWidth: 125 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {props.file.created_at}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {props.file.name}
                </Typography>
                <Button
                    size="small"
                    variant="contained"
                    onClick={openFileDetailHandler}
                    startIcon={<RemoveRedEyeIcon/>}>open</Button>
            </CardContent>
        </Card>
    );
}
