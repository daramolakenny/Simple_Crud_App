
import { createSlice } from '@reduxjs/toolkit';

export const tableSlice = createSlice({
    name : "table",
    initialState : {
        tableData : JSON.parse(localStorage.getItem("data")) || []
    },
    reducers: {
        getAllData(state, action) {
            state.tableData = action.payload;
        },
        createData(state, action) {
            state.tableData.push(action.payload);
        },
        updateData(state, action) {
            const index = state.tableData.findIndex(item => item.id === action.payload.id);
            if(index !== -1){
                state.tableData[index] = action.payload;
            }
        },
        deleteData(state, action) {
            state.tableData = state.tableData.filter(item => item.id !== action.payload);
        },
    }
});

export const {getAllData, createData, updateData, deleteData} = tableSlice.actions;

export default tableSlice.reducer