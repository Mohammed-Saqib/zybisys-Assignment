import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RiStarSFill } from 'react-icons/ri'
import { BiMoviePlay } from 'react-icons/bi'
import { MdErrorOutline } from 'react-icons/md'
import { BsFillTrashFill } from 'react-icons/bs'
import { AiFillBackward } from 'react-icons/ai'
import { toast } from 'react-toastify'

const WatchList = () => {

  const [watchList, setWatchList] = useState([]);
  const LOCAL_STORAGE_KEY = "ANIME"
  useEffect(() => {
    toast.info("Your WatchList",{
      position : 'top-center'
    })
    const retreiveWatchList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retreiveWatchList) setWatchList(retreiveWatchList)
    console.log(watchList.length);
  }, []);

  const removeHandler = (anime) => {
    const updatedWatchList = watchList.filter((elem) => {
      return elem.mal_id != anime.mal_id
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedWatchList));
    const retreiveWatchList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retreiveWatchList) setWatchList(retreiveWatchList)
    toast.success("SuccessFully Removed From Watchlist", {
      position: toast.POSITION.TOP_CENTER,
    })
    console.log(watchList.length);
  }


  return (
    <>
      <div className="d-info" style={{ marginTop: "2rem", marginLeft: '1rem' }}>
        <AiFillBackward />
        <Link to='/'>Go Back</Link>
      </div>
      { 
        watchList.length === 0 ?  (
          <div className='not-found container-status'>
          <MdErrorOutline />
        <h2>No Watchlist</h2>
        </div>
         )
         : ' '
       }
      <div className='container'>
        {
          watchList && watchList.map((anime) => {
            const image = anime.images.jpg.image_url;
            const title = anime.title;
            const rating = anime.rating;
            const score = anime.score;
            const trailer = anime.trailer.url;
            const episode = anime.episodes;
            const id = anime.mal_id
            return (
              <div className="card" key={id}>
                <div className="card-image">
                  <img src={`${image}`} alt={title} />
                </div>
                <h3 className="card-title">{`${title}`}</h3>
                <div className="card-info">
                  <span>Ratings:</span>
                  <p className="crd-info-text">{`${rating}`}</p>
                </div>
                <div className="card-info">
                  <BiMoviePlay />
                  <a href={`${trailer}`} target='_Blank'>Watch Trailer {episode}</a>
                </div>
                <div className="card-info">
                  <span>Score:</span>
                  <RiStarSFill />
                  <p className="crd-info-text">{`${score}`}</p>
                  <RiStarSFill />
                </div>
                <Link to={`/detail/${id}`} className='card-link'>Know More</Link>
                <button className='card-link' onClick={() => removeHandler(anime)} style={{ backgroundColor: 'red', color: 'white' }}><BsFillTrashFill style={{ marginRight: '.3rem' }} />Remove From Watch List</button>
              </div>
            )
          })
        }
      </div>
    </>

  )
}

export default WatchList