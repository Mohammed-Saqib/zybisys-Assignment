import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from './redux/reducer';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PageNotFound from './components/PageNotFound';
import WatchList from './components/WatchList';
import Home from './components/Home';
import AnimeDetails from './components/AnimeDetails';

const App = () => {
  const dispatch = useDispatch();
  const[ searchTerm, setSearchTerm ] = useState("");
  const[ searchResult, setSearchResult ] = useState([]);
  const { error, animeData, welcome, showSearchbar } = useSelector(state => ({ ...state.anime }))
  if(welcome){
    toast.success("Welcome",{
      position: toast.POSITION.TOP_CENTER
    })
  }
  useEffect(() => {
    dispatch(getData({ toast }))
    dispatch({
      type: 'welcome/message'
    })
    error && toast.error(error,{
      position: toast.POSITION.TOP_CENTER
  })  
  }, [error]);

  function searchHandler(term) {
    setSearchTerm(term)
    if(searchTerm !== ""){
      const newAnimeData = animeData.filter(anime => {
        return anime.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResult(newAnimeData);
    }else{
      setSearchResult(animeData);
    }
  }

  return (
    <Router>
      <Navbar term={searchTerm} searchTitle={searchHandler}/>
      <ToastContainer />
      <Routes>
      <Route path="/" element= { <Home animeData={searchTerm.length < 1 ? animeData : searchResult}/> } />
      <Route path="/watchlist" element= { <WatchList /> }/>
      <Route path="/detail/:id" element= { <AnimeDetails /> }/>
      <Route path="*" element={ <PageNotFound /> }/>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App