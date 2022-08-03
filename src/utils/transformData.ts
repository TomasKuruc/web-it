import {FileData} from "store/files/files";

export interface TransformDataReturnType {
    headers: string[],
    nonEditableColumn: string[],
    hours: any[]
}

export const transformData = (data: FileData[]): TransformDataReturnType => {
    const headers = Object.keys(data[0].item);
    const nonEditableColumn: string[] = data.map((row: FileData): string =>
        <string>Object.values(row.item)
            .filter((value, index: number) => index === 0)[0]
    )

    const hours: number[] = [];

    data.map((row: FileData) => {
        Object.values(row.item).filter((item: any) => !isNaN(parseInt(item))).map((num: any) => {
            hours.push(parseInt(num));
        })
    })

    return {headers: headers, nonEditableColumn: nonEditableColumn, hours: hours}
}