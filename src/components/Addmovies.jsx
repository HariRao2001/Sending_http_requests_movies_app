import { useRef } from 'react';
import classes from "./AddMovies.module.css";

export default function Addmovies(props){

    let titleRef = useRef();
    let openingTextRef = useRef();
    let dateRef = useRef();


    function submitHandler(event){
        event.preventDefault();
        const data = {title : titleRef.current.value,
            openingText : openingTextRef.current.value,
            releaseDate : dateRef.current.value}
        props.addHandler(data);
    }
    return (
        <form onSubmit={submitHandler}>
    
            <label>Title</label>
            <input type="text" ref={ titleRef } className={classes.input}></input>
        
            <label>Opening Text</label>
            <textarea rows="5" ref={openingTextRef}></textarea>

            <label>Release Date</label>
            <input type="date" ref={ dateRef }></input>

            <button id={classes.button}>Add Movie</button>
        </form>
    )
}