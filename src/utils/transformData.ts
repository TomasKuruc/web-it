import {FileData} from "store/files/files";

export interface TransformDataReturnType {
    headers: string[],
    nonEditableColumn: string[]
}

export const transformData = (data: FileData[]): TransformDataReturnType => {
    const headers = Object.keys(data[0].item);
    const nonEditableColumn: string[] = data.map((row: FileData): string =>
        <string>Object.values(row.item)
            .filter((value, index: number) => index === 0)[0]
    )

    console.log('headers: ',headers, 'nonEditable: ', nonEditableColumn);
    return {headers: headers, nonEditableColumn: nonEditableColumn}
}