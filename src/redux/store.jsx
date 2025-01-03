import { configureStore } from "@reduxjs/toolkit"
import merchantReducer from "./slice/merchantSlice"

export const store = configureStore({
    reducer: {
        merchant: merchantReducer
    }
})