import React from 'react';

import { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList.jsx';
import Addmovies from './components/Addmovies.jsx';
import './App.css';

function App() {

    const[ movies, setMovies] = useState([]);
    const [loading, isLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchingMoviesList = useCallback(async()=>{
      try{
        isLoading(true);
        {/*
        const response = await fetch("https://swapi.dev/api/films");
        if(!response.ok){
          throw new Error('Somethingwent wrong!');
        }
        const data = await response.json();

        const loadedMovies = [];

        for(const key in data){
          loadedArray.push({
            id: key,
            title :data[key].title,
            openingText : data[key].openingText,
            releaseDate : data[key].releaseDate
          })
          setMovies(loadedMovies);
        }
      
      */ }
        const response = await fetch("https://swapi.dev/api/films");
        if(!response.ok){
          throw new Error('Somethingwent wrong!');
        }
        const data = await response.json();
        
        const transformedMovieData = data.results.map(movieData=>{
        return {
            id : movieData.episode_id,
            title : movieData.title,
            openingText : movieData.opening_crawl,
            releaseDate : movieData.release_date
        }
       
      })
        setMovies(transformedMovieData);
      }
      catch(error){
        setError(error.message);
      }
      isLoading(false); 

    },[]);
    
    useEffect(()=>fetchingMoviesList,[fetchingMoviesList]);

    async function addMovieHanlder(movie){
      const response = await fetch('https://firebase.google.com/docs/reference',{
        method:'POST',
        body : JSON.stringify(movie),
        headers :{
          'Content-Type' : 'application/json'
        }
      });
      const data = await response.json();
      console.log(data);

    }
   
    // function fetchingMoviesList(){
    //   console.log('data fetching...');
    //   setFetchState(true);
    //   fetch("https://swapi.dev/api/films")
    //    .catch(error){
    //        setError('sommething went wrong'); 
    //    }
    //   .then((response)=>{return response.json()})
    //   .then((data)=>{
    //     console.log(data);
    //     const transformedMovieData = data.results.map(movieData=>{
    //       return {
    //         id : movieData.episode_id,
    //         title : movieData.title,
    //         openingText : movieData.opening_crawl,
    //         releaseDate : movieData.release_date
    //       }
    //     })
    //     setMovies(transformedMovieData);
    //     console.log('data fetching completed.');
    //     setFetchState(false);

    //   });
      
    //}
     const dummyMovies = [
    {
      id: 1,
      title: 'Some Dummy Movie',
      openingText: 'This is the opening text of the movie',
      releaseDate: '2021-05-18',
    },
    {
      id: 2,
      title: 'Some Dummy Movie 2',
      openingText: 'This is the second opening text of the movie',
      releaseDate: '2021-05-19',
    },
  ];

  if(error){
    return <dialog open>
      <p>{error}</p>
      <form>
        <button>yes</button>
        <button>no</button>
      </form>
    </dialog>
  }

  return (
    <React.Fragment>
      <section>
        <Addmovies addHandler = {addMovieHanlder}></Addmovies>
      </section>
      <section>
        <button onClick={fetchingMoviesList}>Fetch Movies</button>
      </section>
      <section>
        {loading && <p>Fetching Data...</p>}
        {!loading && movies.length === 0 && <p>Movies not found.</p>}
        {!loading && movies.length > 0 && <MoviesList movies={movies}/>}
      </section>
    </React.Fragment>
  );
}

export default App;