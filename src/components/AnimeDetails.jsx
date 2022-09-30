import React, {useEffect} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { BiMoviePlay } from 'react-icons/bi'
import { RiStarSFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { AiFillBackward } from 'react-icons/ai'
const AnimeDetails = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const { animeData, error } = useSelector( (state) => ({ ...state.anime }));
    if(error){
        return navigate('/')
    }
    const renderData = animeData && animeData.filter( anime => anime.mal_id == id)
    renderData && toast.success(`The ${renderData[0].title} Details`);
    const { title, synopsis, aired, duration, type, score, episodes } = renderData && renderData[0];
  return (
    <>
        <div className="d-info" style={{ marginTop: "2rem", marginLeft: '1rem' }}>
                <AiFillBackward />
                <Link to='/'>Go Back</Link>
        </div>
        <div className='details-page'>
        <div className="d-left-side">
            <h1 className="d-heding">{title}</h1>
            <p className="d-desc">{synopsis}</p>
            <div className="d-info">
                <span>Type:</span>
                <span>{type}</span>
            </div>
            <div className="d-info">
                <span>Duration:</span>
                <span>{duration}</span>
            </div>
            <div className="d-info">
                <span>Aired:</span>
                <span>{aired.string}</span>
            </div>
            <div className="d-info">
                <span>Score:</span>
                <RiStarSFill />
                <span>{score}</span>
                <RiStarSFill />
            </div>
            <div className="d-info">
                <BiMoviePlay />
                <a href="" target='_Blank'>Watch Episode Trailer {episodes}</a>
            </div>
        </div>
        <div className="d-right-side">
            <img src="https://cdn.myanimelist.net/images/anime/4/19644.jpg" alt="" />
        </div>
    </div>
    </>
  )
}

export default AnimeDetails