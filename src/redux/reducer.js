import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../redux/api'

export const getData = createAsyncThunk('data/anime', async({toast},{rejectWithValue}) => {
    try {
        const response = await API.get()
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const animeSlice = createSlice({
    name : 'anime',
    initialState: {
        animeData : null,
        error: "",
        loading: false,
        welcome: true,
        showSearchbar: true,
    },
    extraReducers:{
        [getData.pending] : (state, action)  => {
            state.loading = true;
        },
        [getData.rejected] : (state, action)  => {
            state.loading = true;
            state.error = action.payload.message;
        },
        [getData.fulfilled] : (state, action)  => {
            state.loading = false;
            state.animeData = action.payload
        },
        ['welcome/message'] : (state, action) => {
            state.welcome = false;
        },
        ['hideNavbar'] : (state, action) => {
            state.showSearchbar = false;
        },
        ['unHideNavbar'] : (state, action) => {
            state.showSearchbar = true;
        }
    }
});

export default animeSlice.reducer;