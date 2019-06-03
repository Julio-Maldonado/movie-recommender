import React, {Component} from 'react'
import movies from './assets/movies(clean).json'
import Suggestions from './Suggestions'
import Recommendations from './Recommendations'
import {compare, computeNineSimilarMovies} from './helperFunctions'
import './App.css'

class App extends Component {
  state = {
    query: '',
    suggestedMovies: [],
    step: 0,
    recommendedMovies: [],
    movie: ''
  }

  updateStep = () => { this.setState({ step: (this.state.step + 1) % 3})}

  resetSuggestedMovies = () => { this.setState({ suggestedMovies: []})}

  onMovieSuggestionPress = (movie) => {
    this.resetSuggestedMovies()
    this.updateStep()

    let recommendedMovies = computeNineSimilarMovies(movie, movies)
    this.setState({ movie, recommendedMovies })
  }

  handleInputChange = () => {
    if (this.search.value === "")
      this.setState({ suggestedMovies: [] })
    else
      this.setState({
        query: this.search.value,
        step: 1
      }, () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            let suggestedMovies = []
            movies.forEach(movie => {
              if (movie.Title.toLowerCase().indexOf(this.search.value.toLowerCase()) >= 0)
                suggestedMovies.push(movie)
            })
            suggestedMovies = suggestedMovies.sort(compare)
            if (suggestedMovies.length > 5)
              suggestedMovies = suggestedMovies.slice(0,5)
            this.setState({suggestedMovies})
          }
        }
      })
  }

  onSearchSubmit = () => {
    if (this.state.query.length > 1) {
      console.log("onsearchsubmit called")
      let suggestedMovies = []
      movies.forEach(movie => {
        if (movie.Title.toLowerCase().indexOf(this.search.value) >= 0)
          suggestedMovies.push(movie)
      })
      suggestedMovies = suggestedMovies.sort(compare)
      if (suggestedMovies.length > 5)
        suggestedMovies = suggestedMovies.slice(0,5)
      this.setState({suggestedMovies})
    }
  }

  onMovieRecommendedPress = (movie) => {
    console.log(movie)
    window.open(`https://www.imdb.com/title/${movie.imdbID}`)
  }
 
  render() {
    return (
      <div className="App">
        <h1 className="title">
          Movie Recommender
        </h1>
        <h2 className="description">
          Step {this.state.step + 1}: 
          {this.state.step === 0 ? " Search for a movie" : ""}
          {this.state.step === 1 ? " Click on a movie" : ""}
          {this.state.step === 2 ? ` These movies are similar to ${this.state.movie.Title} - click on one to see it's IMDb page!` : ""}
        </h2>
        {this.state.step !== 2 ? 
          <div>
            <input
              className="movie-input"
              placeholder="Search for..."
              ref={input => this.search = input}
              onChange={this.handleInputChange}
            />
            <button
              className="search-button"
              onClick={() => this.onSearchSubmit()}
            >
              Search
            </button>
            <Suggestions
              onMovieSuggestionPress={this.onMovieSuggestionPress}
              suggestedMovies={this.state.suggestedMovies}
            />
          </div>
           :
          <div>
            <button onClick={() => {this.updateStep()}} >
              Search a different movie!
            </button>
            <Recommendations
              onMovieRecommendedPress={this.onMovieRecommendedPress}
              recommendedMovies={this.state.recommendedMovies}
            />
          </div>
        }
      </div>
    )
  }
}


export default App;
