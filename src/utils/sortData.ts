import {File, FileData} from "store/files/files";

export const sortData = (unsortedData: File): FileData[] => {
    return unsortedData.data.map(row => {

        const remappedObj: any = [];
        const patternArr = unsortedData.pattern.split(",")
         patternArr.map(key => {
            Object.keys(row.item).map(item => {
                if (key === item) {
                    remappedObj.push({[key]: row.item[key]})
                }
            })
        })

        let newObj: any = {}
        remappedObj.map((item: any) => {
            newObj = {
               ...newObj,
               ...item
            }
        })

        return {item: newObj, id: row.id}
    });
}