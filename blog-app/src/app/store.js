import { configureStore} from "@reduxjs/toolkit";
import tableReducer from "../Tabledata/Tableslice.jsx";

export const store = configureStore({
    reducer: {
        table : tableReducer,
    },
});