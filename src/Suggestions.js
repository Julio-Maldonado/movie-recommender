import React from 'react'
import './App.css'

/*

TODO:

MAKE A BLOG POST ABOUT WHY GIVING A PROPER KEY TO
YOUR LISTS IS CRITICAL

CONVERT KEY TO TITLE AND SEE THE ERRORS HAPPEN

FIGURE OUT WHY THIS IS HAPPENING AND MAKE BLOG POST
ABOUT PROPER KEY VALUES

:)

*/

const Suggestions = (props) => {
  const options = props.suggestedMovies.map(movie => (
      <div
        key={movie.imdbID}
        className="movie-suggestion-list-item"
        onClick={() => props.onMovieSuggestionPress(movie)}
      >
        <div className="suggestion" >
            <img className="suggestion-image" src={movie.Poster} alt="" />
            <p className="suggestion-text">
              {movie.Title}, {movie.Year}
            </p>
        </div>
      </div>
  ))
  return options
}

export default Suggestions