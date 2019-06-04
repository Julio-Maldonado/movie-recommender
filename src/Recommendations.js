import React from 'react'
import MovieResult from './MovieResult'
import './App.css'

const Recommendations = (props) => {
  let rows = []
  let row = []
  props.recommendedMovies.forEach((movie, i) => {
    if (i < 3) {
      row.push(
        <MovieResult
          movie={movie}
          mode={props.mode}
          onMovieRecommendedPress={props.onMovieRecommendedPress} />
      )
    } else if ( i < 6) {
      row.push(
        <MovieResult 
          movie={movie}
          mode={props.mode}
          onMovieRecommendedPress={props.onMovieRecommendedPress} />
        )
    } else {
      row.push(
        <MovieResult
          movie={movie}
          mode={props.mode}
          onMovieRecommendedPress={props.onMovieRecommendedPress} />
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