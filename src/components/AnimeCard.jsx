import React from 'react'
import { Link } from 'react-router-dom'
import { RiStarSFill } from 'react-icons/ri'
import { BiMoviePlay } from 'react-icons/bi'
import { toast } from 'react-toastify'
const AnimeCard = ({animeData}) => {
    let updatedAnime = [];
    const handleSubmit =(anime) => {
        const LOCAL_STORAGE_KEY = "ANIME"
        const getAnime =  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
         if(getAnime){
            updatedAnime = getAnime.map(data => data);
            const found = updatedAnime.map(elem => elem.mal_id == anime.mal_id);
            if(found.includes(true)){
                toast.error("Already Saved In Watchlater List",{
                    position: toast.POSITION.TOP_CENTER
                })
            }else{
                updatedAnime.push(anime);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedAnime))
                updatedAnime=[];
                toast.success("Saved In Watchlater List",{
                    position: toast.POSITION.TOP_CENTER
                })
            }
         }else{
            updatedAnime.push(anime);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedAnime));
            toast.success("Added To Watch Later",{
                position: toast.POSITION.TOP_CENTER
            })
            updatedAnime = [];
         }
    }

    const renderData = animeData && animeData.map((anime) => {
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
                <button className='card-link' onClick={() => handleSubmit(anime)}>Save To Watch List</button>
            </div>
        )
    })
  return (
    <>
      {
        renderData
      }  
    </>
  )
}

export default AnimeCard