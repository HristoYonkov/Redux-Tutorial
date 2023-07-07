import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './todoSlice';
// Add a configureStore function wich does the hard work for us,
// it creates the store wich holds our state it combines our reducers and have built-in middleware.
export default configureStore({
    reducer: {
        todos: todoReducer,
    },
});