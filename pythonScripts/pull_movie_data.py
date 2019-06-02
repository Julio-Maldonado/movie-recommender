import requests
import json
import sys
import csv
import time

num_movies = 9945

#15 fields in csv

def get_time(start):
    elapsed = (time.time() - start)
    seconds = int(elapsed % 60)
    minutes = int(elapsed / 60)
    if (seconds < 10):
        return str(minutes) + ":" + "0" +  str(seconds)
    else:
        return str(minutes) + ":" + str(seconds)

def pull_imdb_data():
    file = open("All U.S. Released Movies_ 1972-2016.csv")
    movies = csv.reader(file, delimiter=',')
    # skip csv header
    next(movies)

    movie_file = open("movies.txt", "a")
    movie_file.write("[")

    i, start = 1, time.time()
    for movie in movies:
        movie_ID, movie_title = movie[1], movie[5]
        url = "https://movie-database-imdb-alternative.p.rapidapi.com/?i=" + movie_ID + "&type=movie&r=json&plot=full"
        response = requests.get(
            url,
            headers={
                "X-RapidAPI-Host" : "movie-database-imdb-alternative.p.rapidapi.com",
                "X-RapidAPI-Key" : "fbf74d9705mshea988d1a1a1c8bdp1538dcjsn804db37f831c"
            }
        )
        pretty_json = json.dumps(response.json(), indent=2)
        movie_file.write(pretty_json + ",")

        t = get_time(start)
        print(str(i) + ") At " + t + "s, data obtained for movie " + movie_title + " with ID " + movie_ID)

        i += 1

    movie_file.write("]")

if __name__== "__main__":
    pull_imdb_data()

# run through 2017, 2018, and 2019 movies :)