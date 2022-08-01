import React from 'react';
import {useSelector} from "react-redux";
import FilesList from "layout/pages/files/components/FilesList";
import {selectFiles} from "store/files/files";

interface Props {}

const Files = (props: Props) => {
    const files = useSelector(selectFiles);

    if (!files.saved) {
        return <div>..loading data</div>
    }

    console.log(files)

    return (
        <div className="Files">
            <FilesList/>
        </div>
    );
};

export default Files;