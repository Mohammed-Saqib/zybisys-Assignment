import React, { useRef } from 'react'
import { BsSearch } from 'react-icons/bs'
import { MdOutlineWatchLater } from 'react-icons/md'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
const Navbar = ({term, searchTitle}) => {
    const inputRef = useRef("");
    const  handleSearch = () => {
        searchTitle(inputRef.current.value);
    }
  return (
    <div className='navbar'>
        <div className="logo">
            <img src={logo} alt="Logo" />
        </div>
        <div className="search-box">
            <input type="text" ref={inputRef} placeholder='Search Anime' value={term} onInput={handleSearch} />
            <BsSearch />
        </div>
        <div className="menu">
            <Link to='/watchlist'><MdOutlineWatchLater /></Link>
            <p>My WatchList</p>
        </div>
    </div>
  )
}

export default Navbar