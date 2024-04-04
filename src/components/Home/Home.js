import React, { useEffect } from 'react'
import MovieListing from '../MovieListing/MovieListing';
import { fetchAsyncMoviesAndShows,getSearchQuery } from '../../features/movies/movieSlice';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector(getSearchQuery);

    useEffect(() => {
        if (searchQuery) {
            dispatch(fetchAsyncMoviesAndShows(searchQuery));
        }
    }, [dispatch, searchQuery]);
    
  return (
    <div className='banner'>
      <MovieListing/>
    </div>
  )
}

export default Home
