import React from "react";
import Papa from "papaparse";
import { CSVLink, CSVDownload } from "react-csv";
import {generateRandomID} from "utils/GenerateRandomID";
import {transformData} from "utils/transformData";
import {saveFile} from "helpers/firebase/saveFile";
import {setFileDetail} from "store/files/file";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "store/user/user";
import {useNavigate} from "react-router";
import {File} from "store/files/files";
import {getTotalHoursCount} from "utils/getTotalHoursCount";

interface Headers {
    label: string,
    key: string
}

interface CSVReport {
    data: any[],
    headers: Headers[],
    filename: string
}

export const useFileActions = () => {
    const user = useSelector(selectUser).user
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fileUploadHandler = (fileInputRef: React.MutableRefObject<any>): void => {
        fileInputRef.current.click();
    };

    const importFile = (event: any) => {
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: 'greedy',
            complete: function (results) {
                const data = results.data.map((item: any, index) => {
                    return {
                        id: index,
                        item: {
                            ...item,
                            others: "",
                        }
                    }
                })

                const file = {
                    id: generateRandomID(),
                    uid: user!.uid,
                    name: event.target.files[0].name,
                    created_at: new Date().toLocaleDateString(),
                    pattern: transformData(data).headers.join(","),
                    data: data,
                    price: 0,
                    total_price: 0,
                    total_hours: getTotalHoursCount(transformData(data).hours),
                }

                if (!file) {
                    console.log('error data')
                    return
                }

                saveFile(file);
                dispatch(setFileDetail(file));
                navigate("/fileDetail");
            },
        });
    }

    const exportFile = (file: File): undefined | JSX.Element => {
        const headers: Headers[] = [];
        const data: any = [];

        if (!file.name || !file.data) {
            return;
        }

        Object.keys(file.data[0].item).map((key: string) => {
            headers.push({label: key, key: key})
        })

        headers.push({label: "Total hours", key: "total_hours"},
            {label: "Price per hour", key: "price"},
            {label: "Total Price", key: "total_price"});

        file.data.map(row => {
            let obj = {}

            Object.entries(row.item).map(entry => {
                const [key, value] = entry;
                obj = {
                    ...obj,
                    [key]: value
                }
            })

            data.push(obj);
        });

        data.push({
            total_hours: file.total_hours,
            price: file.price,
            total_price: file.total_price})

        const csvReport: CSVReport = {
            data: data,
            headers: headers,
            filename: file.name
        };

        return (<CSVLink
            {...csvReport}
            style={{
                color: "white",
                textDecoration: "none"
            }}>Export to CSV</CSVLink>)
    }

    return {
        importFile,
        exportFile,
        fileUploadHandler
    }

}