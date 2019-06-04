import React from 'react'
import {truncate} from './helperFunctions'
import './App.css'

const MovieResult = (props) => {
  const movie = props.movie
  return (
    <div
        key={movie.name}
        className="movie-recommendation-list-item"
        onClick={() => props.onMovieRecommendedPress(movie)} >
        <img className="recommender-image" src={movie.image} alt="NA" />
        {props.mode === "landscape" ?
            <div>
                <p className="recommendation-name">
                    {truncate(movie.name, 35)}
                </p>
                <br />
                <div className="rating-length-row">
                    <p className="recommendation-rating">
                        {movie.rating + "/10"}
                    </p>
                    <p className="recommendation-length">
                        {movie.length}
                    </p>
                </div>
                <br />
                <div className="rated-year-row">
                    <p className="recommendation-rated">
                        {"Rated " + movie.rated}
                    </p>
                    <p className="recommendation-year">
                        {movie.year}
                    </p>
                </div>
            </div>
            :
            null
        }
        </div> 
  )
}

export default MovieResult