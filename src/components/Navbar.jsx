import React, { useRef, useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { MdOutlineWatchLater } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
const Navbar = ({ term, searchTitle }) => {
    const { showSearchbar } = useSelector(state => ({ ...state.anime }))
    const inputRef = useRef("");
    const handleSearch = () => {
        searchTitle(inputRef.current.value);
    }    

    return (
        <div className='navbar'>
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            {
                showSearchbar ? 
                <div className="search-box">
                 <input type="text" ref={inputRef} placeholder='Search Anime' value={term} onInput={handleSearch} />
                <BsSearch />
                </div> : 
                <h2 className='my-heading'>My Watch List</h2>
            }
            <div className="menu">
                <Link to='/watchlist'><MdOutlineWatchLater /></Link>
                <p>My WatchList</p>
            </div>
        </div>
    )
}

export default Navbar