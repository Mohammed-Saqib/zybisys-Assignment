import AnimeCard from './AnimeCard';
import { BiLoaderAlt } from 'react-icons/bi'
import {  useSelector } from 'react-redux'

const Home = ({animeData}) => {
  const { loading } = useSelector(state => ({ ...state.anime }));
  return (
    <>
      <div className='container'>
        <AnimeCard animeData = {animeData}/>
      </div>
      { 
        loading ?  (
          <div className='not-found container-status'>
          <BiLoaderAlt className='loader'/>
        </div>
         )
         : ' '
       }
    </>
  )
}

export default Home