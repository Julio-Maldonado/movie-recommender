let compare = (a, b) => {
  return (parseInt(a.Year) < parseInt(b.Year) ? 1 : -1)
}

let cos = (m1, m2) => {
  let query = m1["Plot"]
  let doc = m2

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
  // console.log(dotProduct / magnitude)
  
  let scores = []
  scores.push(dotProduct / magnitude)

  let m1Actors = m1['Actors'].split(",")
  let m2Actors = m2['Actors'].split(",")
  let actorsIntersection = m1Actors.filter(value => -1 !== m2Actors.indexOf(value))
  
  scores.push((actorsIntersection.length * 1.5) / (m1Actors.length + m2Actors.length))

  let m1Genre = m1['Genre'].split(",")
  let m2Genre = m2['Genre'].split(",")
  let genreIntersection = m1Genre.filter(value => -1 !== m2Genre.indexOf(value))
  
  scores.push((genreIntersection.length * 1.7) / (m1Genre.length + m2Genre.length))

  let m1Director = m1['Director'].split(",")
  let m2Director = m2['Director'].split(",")
  let directorIntersection = m1Director.filter(value => -1 !== m2Director.indexOf(value))
  
  scores.push((directorIntersection.length * 1.2) / (m1Director.length + m2Director.length))
  
  let m1Writer = m1['Writer'].split(",")
  let m2Writer = m2['Writer'].split(",")
  let writerIntersection = m1Writer.filter(value => -1 !== m2Writer.indexOf(value))
  
  scores.push((writerIntersection.length * 1.5) / (m1Writer.length + m2Writer.length))
  
  

  return scores.reduce((a, b) => a + b)
}

let top9 = (jsonResults) => {
  let topCount = 0
  let topUrl = ''
  let topTen = {}
  let topTenList = []
  for (let i = 0; i < 9; i++) {
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

let computeNineSimilarMovies = (movie, movies) => {
  let jsonResults = {}
  // query is currently the plot... update to pass in movie object and use various metrics for comparison
  movies.forEach((m, i) => {
    jsonResults[m.Title] = cos(movie, m)
  })

  delete jsonResults[movie.Title]
  jsonResults = top9(jsonResults)
  let arr = []
  for (let i = 0; i< jsonResults.length; i++) {
    let movieData = {}
    for (let j = 0; j < movies.length; j++){
      let movie = movies[j]
      if (movie.Title === jsonResults[i]) {
        movieData = {
          url: movie.Website,
          name: movie.Title,
          plot: movie.Plot,
          image: (movie.Poster ? movie.Poster : '/image_unavailable.jpeg'),
          year: movie.Year,
          imdbID: movie.imdbID,
          length: movie.Runtime,
          rating: movie.imdbRating,
          rated: movie.Rated
        }
        break
      }
    }
    arr.push(movieData)
  }
  return arr
}

let truncate = (input, size) => {
  if (input.length > size)
     return input.substring(0, size) + '...';
  else
     return input;
}

export {compare, computeNineSimilarMovies, truncate}