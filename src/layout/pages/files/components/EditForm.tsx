import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
import {MenuItem, Select, TextField} from "@mui/material";
import {useFormContext} from "react-hook-form";
import {useState} from "react";

interface EditFormProps {
    defaultValue: string,
    index: number,
    rowLength: number,
    name: string
}

const EditForm = (props: EditFormProps) => {
    const {register, setValue} = useFormContext();
    const [inputValue, setInputValue] = useState(props.defaultValue);
    const options = Array.from(Array(20).keys())

    const handleChange = (event: SelectChangeEvent) => {
        setInputValue(event.target.value as string);
        setValue(props.name, event.target.value as string);
    };

    if (props.index === props.rowLength) {
        return (
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <TextField
                        {...register(props.name)}
                        id="outlined-basic"
                        label="Others"
                        defaultValue={props.defaultValue}
                        variant="outlined" />
                </FormControl>
            </Box>
        )
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <input type="hidden" defaultValue={props.defaultValue} {...register(props.name)}/>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={inputValue}
                    defaultValue={props.defaultValue}
                    label="Age"
                    displayEmpty={true}
                    onChange={handleChange}
                >
                    <MenuItem value={props.defaultValue} selected={true}>{props.defaultValue}</MenuItem>
                    {options.map(option => (
                        <MenuItem
                            value={option === +props.defaultValue ? props.defaultValue : option}
                            selected={option === +props.defaultValue}>{option}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default EditForm;