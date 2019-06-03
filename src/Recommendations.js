import React from 'react'
import './App.css'

const Recommendations = (props) => {
  const options = props.recommendedMovies.map(movie => (
    <div
      className="movie-suggestion-list-item"
      onClick={() => props.onMovieSuggestionPress(movie)}
    >
      <img className="poster" src={movie.image} alt="NA" />
      {movie.name}
    </div>
  ))
  return options
}

export default Recommendations