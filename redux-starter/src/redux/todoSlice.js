import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// createSlice is a higher order function that accepts an initial state,
// an object full of reducer functions and a slice name. It automatically generates action creators
// and action types that correspond to the reducers and state.

// In Redux - Toolkit, the createSlice method helps us create a slice of the redux - store.
// This function aims to reduce the boilerplate required to add data to redux in the canonical way.
// Internally, it uses createAction and createReducer.

export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync',
    async () => {
        const response = await fetch('http://localhost:7000/todos');
        if (response.ok) {
            const todos = await response.json();
            return { todos };
        }
    }
);

export const addTodoAsync = createAsyncThunk(
    'todos/addTodoAsync',
    async (payload) => {
        const response = await fetch('http://localhost:7000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: payload.title }),
        });
        if (response.ok) {
            const todo = response.json();
            return { todo };
        }
    }
);

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
        },
        toggleComplete: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state[index].completed = action.payload.completed;
        },
        deleteTodo: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload.id);
        }
    },
    extraReducers: {
        [getTodosAsync.pending]: (state, action) => {
            console.log('Fetching data...');
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            console.log('Fetched data successfully!');
            return action.payload.todos;
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.push(action.payload.todo);
        }
    }
});

export const {
    addTodo,
    toggleComplete,
    deleteTodo,
} = todoSlice.actions;

export default todoSlice.reducer;