import React from 'react'
import './App.css'

const Suggestions = (props) => {
  const options = props.suggestedMovies.map(movie => (
      <div
        className="movie-suggestion-list-item"
        onClick={() => props.onMovieSuggestionPress(movie)}
      >
        <img className="poster" src={movie.Poster} alt="NA" />
        {movie.Title}
      </div>
  ))
  return options
}

export default Suggestions