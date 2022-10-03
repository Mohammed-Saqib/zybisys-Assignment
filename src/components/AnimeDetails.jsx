import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { BiMoviePlay, BiLoaderAlt } from 'react-icons/bi'
import { RiStarSFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { AiFillBackward } from 'react-icons/ai'
const AnimeDetails = () => {
    const LOCAL_STORAGE_KEY = "ANIME";
    const navigate = useNavigate();
    const { id } = useParams();
    const [displayAnime, setDisplayAnime] = useState([]);
    const { animeData, error } = useSelector((state) => ({ ...state.anime }));

    async function getAnime() {
        if (animeData) {
            const renderData = await animeData.filter(anime => anime.mal_id == id);
            toast.success(`The ${renderData[0].title} Details`)
            return renderData;
        } else {
            const retreiveWatchList = await JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
            if (retreiveWatchList) {
                const foundAnime = await retreiveWatchList.filter(anime => anime.mal_id == id)
                if (foundAnime) {
                    return foundAnime;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
    }

    useEffect(() => {
        getAnime()
            .then(res => {
                setDisplayAnime(res);
                if(displayAnime[0]) toast.success(`The ${displayAnime[0].title} Details`)
            })
            .catch(err => console.log(err));
    }, [id])
    return (
        <>
            <div className="d-info" style={{ marginTop: "2rem", marginLeft: '1rem' }}>
                <AiFillBackward />
                <Link to='/'>Go Back</Link>
            </div>
            {
                displayAnime.length === 0 ?
                    (
                        <div className='not-found container-status'>
                            <BiLoaderAlt className='loader' />
                        </div>
                    ) :
                    (
                        <>
                            <div className='details-page'>
                                <div className="d-left-side">
                                    <h1 className="d-heding">{displayAnime[0].title}</h1>
                                    <p className="d-desc">{displayAnime[0].synopsis}</p>
                                    <div className="d-info">
                                        <span>Type:</span>
                                        <span>{displayAnime[0].type}</span>
                                    </div>
                                    <div className="d-info">
                                        <span>Duration:</span>
                                        <span>{displayAnime[0].duration}</span>
                                    </div>
                                    <div className="d-info">
                                        <span>Aired:</span>
                                        <span>{displayAnime[0].aired.string}</span>
                                    </div>
                                    <div className="d-info">
                                        <span>Score:</span>
                                        <RiStarSFill />
                                        <span>{displayAnime[0].score}</span>
                                        <RiStarSFill />
                                    </div>
                                    <div className="d-info">
                                        <BiMoviePlay />
                                        <a href={displayAnime[0].trailer.url} target='_Blank'>Watch Episode Trailer {displayAnime[0].episodes}</a>
                                    </div>
                                </div>
                                <div className="d-right-side">
                                    <img src={displayAnime[0].images.jpg.image_url} alt={displayAnime[0].title} />
                                </div>
                            </div>
                        </>
                    )
            }
        </>
    )
}

export default AnimeDetails