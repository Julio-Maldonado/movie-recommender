import React, {Component} from 'react'
import movies from './assets/movies(clean).json'
import Suggestions from './Suggestions'
import Recommendations from './Recommendations'
import Loader from 'react-loader-spinner'
import {compare, computeNineSimilarMovies} from './helperFunctions'
import './App.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub';
import faFacebook from '@fortawesome/fontawesome-free-brands/faFacebookF';
import faInstagram from '@fortawesome/fontawesome-free-brands/faInstagram';
import faLinkedinIn from '@fortawesome/fontawesome-free-brands/faLinkedinIn';
import faEnvelope from '@fortawesome/fontawesome-free-regular/faEnvelope';

const data = [
	{
	  link: 'https://github.com/Julio-Maldonado',
	  label: 'Github',
	  icon: faGithub,
	},
	{
	  link: 'https://www.facebook.com/julio.maldonado.904',
	  label: 'Facebook',
	  icon: faFacebook,
	},
	{
	  link: 'https://www.instagram.com/_julio_maldonado/',
	  label: 'Instagram',
	  icon: faInstagram,
	},
	{
	  link: 'https://www.linkedin.com/in/juliom72/',
	  label: 'LinkedIn',
	  icon: faLinkedinIn,
	},
	{
	  link: 'mailto:julio.maldonado.guzman@gmail.com',
	  label: 'Email',
	  icon: faEnvelope,
	},
];

let sleep = (ms) => { return new Promise(resolve => setTimeout(resolve, ms))}

class App extends Component {
  state = {
    query: '',
    suggestedMovies: [],
    step: 0,
    recommendedMovies: [],
    movie: '',
    mode: 'landscape',
    loading: false
  }

  updateStep = () => { this.setState({ step: (this.state.step + 1) % 3})}

  resetSuggestedMovies = () => { this.setState({ suggestedMovies: []})}

  flipLoadingScreen = () => { this.setState({ loading: !this.state.loading}) }
  
  onMovieSuggestionPress = async (movie) => {
    this.resetSuggestedMovies()
    this.flipLoadingScreen()
    await sleep(500)
    let recommendedMovies = computeNineSimilarMovies(movie, movies)
    this.updateStep()
    this.setState({ movie, recommendedMovies })
    this.flipLoadingScreen()
  }

  handleInputChange = () => {
    if (this.search.value.length < 1)
      this.resetSuggestedMovies()
    else
      this.setState({
        query: this.search.value,
        step: 1
      }, () => {
        if (this.state.query && this.state.query.length > 1) {
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
      })
  }

  onSearchSubmit = () => {
    if (this.search.value.length < 1)
      this.resetSuggestedMovies()
    else if (this.state.query.length > 1) {
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
    window.open(`https://www.imdb.com/title/${movie.imdbID}`)
  }

  updateDimensions = () => {
    if (window.innerWidth < window.innerHeight)
      this.setState({ mode: 'portrait' })
    else
      this.setState({ mode: 'landscape' })
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions)
  }
 
  render() {
    console.log(this.state.suggestedMovies)
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
          <div className="main-container">
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
          <div className="main-container">
            <button onClick={() => this.updateStep()} >
              Search a different movie!
            </button>
            <Recommendations
              mode={this.state.mode}
              onMovieRecommendedPress={this.onMovieRecommendedPress}
              recommendedMovies={this.state.recommendedMovies}
            />
          </div>
        }
        <div id="footer" >
          <ul className="icons-ul">
              {data.map(s => (
                  <li key={s.label}>
                    <a href={s.link} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={s.icon} />
                    </a>
                  </li>
              ))}
          </ul>
          <p className="copyright">
            <a href={"https://juliomaldonado.com"} target="_blank" rel="noopener noreferrer">
              juliomaldonado.com
            </a>
          </p>
      </div>
        {this.state.loading ? 
          <div className="loader">
            <Loader
              type="Bars"
              color="#909090"
              height="100"
              width="100"
            />
          </div> :
          null
        }
      </div>
    )
  }
}


export default App;
