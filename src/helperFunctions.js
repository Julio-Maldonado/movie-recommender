let compare = (a, b) => {
  return (parseInt(a.Year) < parseInt(b.Year) ? 1 : -1)
}

let cos = (query, doc) => {
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
  let query = movie["Plot"]
  movies.forEach((movie, i) => {
    jsonResults[movie.Title] = cos(query, movie)
  })
  jsonResults = top9(jsonResults)
  let arr = []
  for (let i = 0; i< jsonResults.length; i++) {
    let movieData = {}
    for (let j = 0; j < movies.length; j++){
      if (movies[j].Title === jsonResults[i]) {
        movieData = {
          url: movies[j].Website, 
          name: movies[j].Title, 
          description: movies[j].Plot,
          image: (movies[j].Poster ? movies[j].Poster : '/image_unavailable.jpeg')
        }
        break
      }
    }
    arr.push(movieData)
  }
  console.log(arr)
  return arr
}

export {compare, computeNineSimilarMovies}