import { createSlice } from "@reduxjs/toolkit";

// createSlice is a higher order function that accepts an initial state,
// an object full of reducer functions and a slice name. It automatically generates action creators
// and action types that correspond to the reducers and state.

// In Redux - Toolkit, the createSlice method helps us create a slice of the redux - store.
// This function aims to reduce the boilerplate required to add data to redux in the canonical way.
// Internally, it uses createAction and createReducer.

const todoSlice = createSlice({
    name: 'todos',
    initialState: [
        { id: 1, title: 'todo1', completed: false },
        { id: 2, title: 'todo2', completed: false },
        { id: 3, title: 'todo3', completed: true },
    ],
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                comleted: false
            }
            state.push(newTodo);
        }
    }
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;