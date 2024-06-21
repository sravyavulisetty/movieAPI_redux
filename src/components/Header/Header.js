import React, { useEffect, useState } from 'react'
import user from '../../images/userimg.png';
import { Link } from 'react-router-dom';
import './Header.scss';
import { useDispatch } from 'react-redux';
import { addSearchQuery } from '../../features/movies/movieSlice';
import { IoSearch } from "react-icons/io5";

const Header = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(addSearchQuery(value));
  }

  useEffect(() => {
    dispatch(addSearchQuery("harry"))
  },[])

  return (
    <div className='header'>
        <Link to="/">
            <div className='logo'>
                Movie App
            </div>
        </Link>
        <div className='user-search'>
            <form>
              <input type='text' placeholder='Select Movie or Show' onChange={(e)=>setValue(e.target.value)}></input>
              <button onClick={handleSubmitForm}><IoSearch size={25} color='white'/></button>
            </form>
            <img src={user} alt='user'></img>
        </div>
      
    </div>
  )
}

export default Header;
