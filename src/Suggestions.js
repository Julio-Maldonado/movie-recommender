import React from 'react'
import './App.css'

const Suggestions = (props) => {
  const options = props.suggestedMovies.map(movie => (
      <div
        key={movie.Title}
        className="movie-suggestion-list-item"
        onClick={() => props.onMovieSuggestionPress(movie)}
      >
        <div className="suggestion" >
            <img className="poster" src={movie.Poster} alt="" />
            <p className="suggestion-text">
              {movie.Title}, {movie.Year}
            </p>
        </div>
      </div>
  ))
  return options
}

export default Suggestions