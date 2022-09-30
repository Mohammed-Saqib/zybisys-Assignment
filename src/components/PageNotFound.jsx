import React from 'react'
import {  MdErrorOutline  } from 'react-icons/md'
import {  BsArrowLeft  } from 'react-icons/bs'
import { Link } from 'react-router-dom'
const PageNotFound = () => {
  return (
    <div className='not-found'>
        <MdErrorOutline />
        <h2>Not Found</h2>
        <Link to='/'><BsArrowLeft /> Go Back</Link>
    </div>
  )
}

export default PageNotFound