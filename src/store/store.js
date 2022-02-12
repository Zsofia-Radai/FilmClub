import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";

const store = configureStore({
    reducer: moviesReducer
});

export default store;
