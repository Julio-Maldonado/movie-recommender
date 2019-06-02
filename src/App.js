import React, {Component} from 'react';
import movies from './assets/movies(clean).json'
import './App.css';

let compare = (a, b) => {
  return (parseInt(a.Year) < parseInt(b.Year) ? 1 : -1)
}

const Suggestions = (props) => {
  const options = props.results.map(movie => (
    <li key={movie.imdbID}>
      <div 
        className="movie-suggestion-list-item"
        onClick={() => props.onMovieSuggestionPress(movie)}
      >
        <img className="poster" src={movie.Poster} alt="No pic available" />
        {movie.Title}
      </div>
    </li>
  ))
  return <ul>{options}</ul>
}

class App extends Component {
  state = {
    query: '',
    results: []
  }

  results = []
  resultsSize = 0
  count = 0

  onMovieSuggestionPress = (movie) => {
    console.log('movie pressed', movie)
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value,
      }, () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            let suggestedMovies = []
            movies.forEach(movie => {
              if (movie.Title.toLowerCase().indexOf(this.search.value) >= 0) {
                suggestedMovies.push(movie)
              }
            })
            suggestedMovies = suggestedMovies.sort(compare)
            console.log(suggestedMovies)
            this.setState({results: suggestedMovies})
          }
        }
      })
    // this.search()
  }
 
  render() {
    return (
      <div className="App">
        <input
          className="movie-input"
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <Suggestions
          onMovieSuggestionPress={this.onMovieSuggestionPress}
          results={this.state.results} />
      </div>
    )
  }
}

/*
{
  "Ratings": [
    {
      "Source": "Internet Movie Database", 
      "Value": "8.9/10"
    }, 
    {
      "Source": "Rotten Tomatoes", 
      "Value": "92%"
    }, 
    {
      "Source": "Metacritic", 
      "Value": "94/100"
    }
  ], 
  "Rated": "R", 
  "Plot": "Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.", 
  "DVD": "19 May 1998", 
  "Writer": "Quentin Tarantino (stories), Roger Avary (stories), Quentin Tarantino", 
  "Production": "Miramax Films", 
  "Actors": "Tim Roth, Amanda Plummer, Laura Lovelace, John Travolta", 
  "Type": "movie", 
  "imdbVotes": "1,632,190", 
  "Website": "N/A", 
  "Poster": "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", 
  "Title": "Pulp Fiction", 
  "Director": "Quentin Tarantino", 
  "Released": "14 Oct 1994", 
  "Awards": "Won 1 Oscar. Another 62 wins & 69 nominations.", 
  "Genre": "Crime, Drama", 
  "imdbRating": "8.9", 
  "Language": "English, Spanish, French", 
  "Country": "USA", 
  "BoxOffice": "N/A", 
  "Runtime": "154 min", 
  "imdbID": "tt0110912", 
  "Metascore": "94", 
  "Response": "True", 
  "Year": "1994"
}
*/

/*

  cos = (query, doc) => {
    let keys1 = query.toLowerCase().split(' ')
    let keys2 = doc["Plot"].toLowerCase().split(' ')

    let wordFreqQ = {}
    for (let i in keys1)
      wordFreqQ[i] = 0
    for (let i in keys1)
      wordFreqQ[i] += 1

    let wordFreqD = {}
    for (let i in keys2)
      wordFreqD[i] = 0
    for (let i in keys2)
      wordFreqD[i] += 1
    let intersectionKeys = keys1.filter(value => -1 !== keys2.indexOf(value))
    let dotProduct = 0
    let magnitude1 = 0
    let magnitude2 = 0
    let i
    for (i in intersectionKeys)
      dotProduct += wordFreqQ[i] * wordFreqD[i]
    
    for (i in keys1)
      magnitude1 += Math.pow(wordFreqQ[i], 2)
    magnitude1 = Math.sqrt(magnitude1)
    for (i in keys2)
      magnitude2 += Math.pow(wordFreqD[i], 2)
    magnitude2 = Math.sqrt(magnitude2)
    
    let magnitude = magnitude1 * magnitude2
    return dotProduct / magnitude
  }

  top10 = (jsonResults) => {
    let topCount = 0
    let topUrl = ''
    let topTen = {}
    let topTenList = []
    this.resultsSize = Object.keys(jsonResults).length
    // for (let i = 0; i < resultsSize; i++) {
    for (let i = 0; i < 10; i++) {
      for (let j in jsonResults) {
        if (jsonResults[j] > topCount && !(j in topTen)) {
          topUrl = j
          topCount = jsonResults[j]
        }
      }
      topTen[topUrl] = topCount
      topCount = 0
      topTenList.push(topUrl)
    }
    return topTenList
  }

  search = () => {
        // let events = response.json()
        console.log(movies)
        let jsonResults = {}
        let query = this.state.query
        movies.forEach((movie, i) => {
          jsonResults[movie.Title] = this.cos(query, movie)
        })
        // $.each(events,function(i,event){
        //     jsonResults[event.eventbrite_url] = cos(query, event)
        // });
        jsonResults = this.top10(jsonResults)
        let arr = []
        for (let i = 0; i< jsonResults.length; i++) {
          let eventData = {}
          for (let j = 0; j < movies.length; j++){
            if (movies[j].Title === jsonResults[i]) {
              eventData = {
                url: movies[j].Website, 
                name: movies[j].Title, 
                description: movies[j].Plot,
                image: (movies[j].Poster ? movies[j].Poster : '/image_unavailable.jpeg')
              }
              break
            }
          }
          arr.push(eventData)
        }
        var photo = ''
        var desc = ''
        var title = ''
        var link = ''
        let arrPhoto = []
        let arrDesc = []
        let arrTitle = []
        let arrLink = []
        for(let i = 0; i < arr.length; i++) {
          // change out var to now be onclick to change to div id singleResult
          // photo += '<img src="' + arr[i].image +  'width="107"' + ' height="98"' + '">' + '<br>';
          photo = arr[i].image;
           // photo += '"url(' + arr[i].image + ')"';
          arrPhoto.push(photo); 
          // variables for new page once link is clicked
          title = arr[i].name;
          arrTitle.push(title);
          // document.getElementById("resultsTitle").innerText = title;
          desc = arr[i].description;
          arrDesc.push(desc);
          // document.getElementById("resultsText").innerText = desc;
          link = '<a href="' + arr[i].url + '"> For more info or to buy your tickets </a><br>';
          arrLink.push(link);
          // document.getElementById("results").innerHTML = link;
        }
    }
*/

export default App;
