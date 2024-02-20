import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchUsers = createAsyncThunk('/adminPage/fetchUsers', async () => {
    const {data} = await axios.get('/adminPage');
    return data;
});
export const fetchRemoveUsers = createAsyncThunk('/adminPage/fetchRemoveUsers', async (id: string) => {
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
    reducers: {},
    extraReducers: (builder) => {
        /* eslint-disable */
        builder.addCase(fetchUsers.pending, (state: any) => {
            state.users.items = [];
            state.users.status = 'loading';
        }),
        builder.addCase(fetchUsers.fulfilled, (state: any, action: any) => {
            state.users.items = action.payload;
            state.users.status = 'loaded';
        }),
        builder.addCase(fetchUsers.rejected, (state: any) => {
            state.users.items = [];
            state.users.status = 'error';
        }),
        //Delete
        builder.addCase(fetchRemoveUsers.pending, (state: any, action: any) => {
            state.users.items = state.users.items.filter((obj: { _id: string; }) => obj._id !== action.meta.arg);
        });
    },
});

export const usersReducer = usersSlice.reducer;