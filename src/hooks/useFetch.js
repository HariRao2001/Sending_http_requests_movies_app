import { useEffect, useState} from 'react';


export default function useFetch(fetchfn){

    const [loading, isLoading] = useState(false);
    const [movies, setMovies] = useState();
    const [error, setError] = useState();

    useEffect(()=>{
            async function fetchPlaces(){
                isLoading(true);

                try{
                    const response = await fetch("https://swapi.dev/api/films");
                    // const response = await fetchfn();
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

            }
            fetchPlaces();

        },[]);

        return {loading, movies, error}
    }
        
     