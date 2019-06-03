import React from 'react'
import {truncate} from './helperFunctions'
import './App.css'

const MovieInfo = (props) => {
  const movie = props.movie
  return (
    <div
          key={movie.name}
          className="movie-recommendation-list-item"
          onClick={() => props.onMovieRecommendedPress(movie)}
        >
          <img className="poster" src={movie.image} alt="NA" />
          <p className="recommendation-name">
            {truncate(movie.name, 35)}
          </p>
          <br />
          <p className="recommendation-rating">
            {movie.rating + "/10"}
          </p>
          <p className="recommendation-length">
            {movie.length}
          </p>
          <br />
          <p className="recommendation-rated">
            {"Rated " + movie.rated}
          </p>
          <p className="recommendation-year">
            {movie.year}
          </p>
          <p className="recommendation-plot">
            {truncate(movie.plot, 92)}
          </p>
        </div> 
  )
}
const Recommendations = (props) => {
  let rows = []
  let row = []
  props.recommendedMovies.forEach((movie, i) => {
    if (i < 3) {
      row.push(
        <MovieInfo movie={movie} onMovieRecommendedPress={props.onMovieRecommendedPress} />
      )
    } else if ( i < 6) {
      row.push(
        <MovieInfo movie={movie} onMovieRecommendedPress={props.onMovieRecommendedPress} />
        )
    } else {
      row.push(
        <MovieInfo movie={movie} onMovieRecommendedPress={props.onMovieRecommendedPress} />
      )
    }

    if (row.length === 3) {
      console.log("pushed")
      rows.push(
        <div
          key={"row-" + (i + 1) / 3}
          className="movie-recommendation-list-row"
          onClick={() => props.onMovieRecommendedPress(movie)}
        >
          {row}
        </div>
      )
      row = []
    }
  })
  return rows
}

export default Recommendations