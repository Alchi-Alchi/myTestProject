import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchUsers = createAsyncThunk('/adminPage/fetchUsers', async () => {
    const {data} = await axios.get('/adminPage');
    return data;
});
export const fetchRemoveUsers = createAsyncThunk('/adminPage/fetchRemoveUsers', async (id) => {
    await axios.delete(`/adminPage/${id}`);
});

const initialState = {
    users: {
        items: [],
        status: 'loading',
    },
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducer: {},
    extraReducers: {
        [fetchUsers.pending]: (state) => {
            state.users.items = [];
            state.users.status = 'loading';
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.users.items = action.payload;
            state.users.status = 'loaded';
        },
        [fetchUsers.rejected]: (state) => {
            state.users.items = [];
            state.users.status = 'error';
        },
        //Delete
        [fetchRemoveUsers.pending]: (state, action) => {
            state.users.items = state.users.items.filter(obj => obj._id !== action.meta.arg);
        },
    },
});

export const usersReducer = usersSlice.reducer;