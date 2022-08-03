import { createSlice } from '@reduxjs/toolkit'
import {RootState} from "store/store";
import {File} from "./files";
import {updateFile} from "helpers/firebase/updateFile";
import {getTotalPrice} from "utils/getTotalPrice";
import {transformData} from "utils/transformData";
import {getTotalHoursCount} from "utils/getTotalHoursCount";


const initialState: File = {
    uid: null,
    id: null,
    name: null,
    created_at: null,
    pattern: "",
    data: [],
    price: 0,
    total_hours: 0,
    total_price: 0
}

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setFileDetail: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes

             state.id = action.payload.id;
             state.uid = action.payload.uid;
             state.name = action.payload.name;
             state.created_at = action.payload.created_at;
             state.pattern = action.payload.pattern;
             state.data = action.payload.data;
             state.price = action.payload.price;
             state.total_hours = action.payload.total_hours;
             state.total_price = action.payload.total_price;

        },

        setFileDetailData: (state, action) => {
            state.data = action.payload
        },

        clearFileDetail: (state) => {
            Object.assign(state, initialState)
        },

        modifyFileDataItems: (state, action) => {
            if (!action.payload.row) {
                return state;
            }

            state.data.map((row: any, rowIndex: number) => {
                const oldValues: string[] = Object.values(row.item);
                const newPayloadArr: string[] = action.payload.row[rowIndex];
                const keysArr = Object.keys(row.item);
                const newObj: {[index: string]:any} = {}

                newPayloadArr[0] = oldValues[0];

                keysArr.forEach((element: string, index: number) => {
                    newObj[element] = newPayloadArr[index];
                });

                row.item = newObj
           })

            state.price = action.payload.price
            state.total_price = getTotalPrice(getTotalHoursCount(transformData(state.data).hours), action.payload.price);


            updateFile(state);
        }
    },


})

// Action creators are generated for each case reducer function
export const { setFileDetail, modifyFileDataItems, setFileDetailData, clearFileDetail } = fileSlice.actions;
export const selectFileDetail = (state: RootState) => state.fileDetail;

export default fileSlice.reducer