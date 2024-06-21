import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MovieApi from '../../common/apis/MovieApi';
import { APIKey } from '../../common/apis/MovieApiKey';

// export const fetchAsyncMoviesAndShows = createAsyncThunk('movies/fetchAsyncMoviesAndShows', async (searchQuery) => {
//     const moviesResponse = await MovieApi.get(`?apikey=${APIKey}&s=${searchQuery}&type=movie`);
//     const showsResponse = await MovieApi.get(`?apikey=${APIKey}&s=${searchQuery}&type=series`);

//     return { movies: moviesResponse.data, shows: showsResponse.data };
// })
export const fetchAsyncMoviesAndShows = createAsyncThunk('movies/fetchAsyncMoviesAndShows', async (searchQuery) => {
    let moviesResponse, showsResponse;
    if (searchQuery!=='') {
        moviesResponse = await MovieApi.get(`?apikey=${APIKey}&s=${searchQuery}&type=movie`);
        showsResponse = await MovieApi.get(`?apikey=${APIKey}&s=${searchQuery}&type=series`);
    } else {
        moviesResponse = await MovieApi.get(`?apikey=${APIKey}&type=movie`);
        showsResponse = await MovieApi.get(`?apikey=${APIKey}&type=series`);
    }
    return { movies: moviesResponse.data, shows: showsResponse.data };
});
export const fetchAsyncMovieOrShowDetail = createAsyncThunk('movies/fetchAsyncMovieorShowDetail', async (id) => {
    const response = await MovieApi.get(`?apikey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
})
const initialState = {
    searchQuery:"",
    movies: {},
    shows: {},
    selectMovieorShow: {}
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        addSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        removeSelectedMovieOrShow: (state) => {
            state.selectMovieorShow = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncMoviesAndShows.pending, (state) => {
                console.log("pending")
            })
            .addCase(fetchAsyncMoviesAndShows.fulfilled, (state, { payload }) => {
                console.log("fulfilled");
                state.movies = payload.movies;
                state.shows = payload.shows;
            })
            .addCase(fetchAsyncMoviesAndShows.rejected, (state) => {
                console.log("rejected");
            })
            .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) => {
                console.log("fulfilled movie or show detail");
                state.selectMovieorShow = payload;
            })
    }    
})
export const { removeSelectedMovieOrShow, addSearchQuery } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieorShow;
export const getSearchQuery = (state) => state.movies.searchQuery;

export default movieSlice.reducer;
