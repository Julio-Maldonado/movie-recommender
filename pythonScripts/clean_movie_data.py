import json

num_movies = 9945

# categories = {
#     'superhero': ['avengers', 'superman', 'dc', 'save', 'hero', 'batman', 'heroic', 'villian'],
#     # 'love': ['love', 'heart', 'adore', 'sweethearts', 'intamicy', 'romance', 'affection', 'feelings'],
#     'coming of age': ['teenage', 'growth', 'adventure', 'lost', 'confused', 'experience', 'awkward', 'belong'],
#     # 'horror': ['evil', 'kill', 'murder', 'murderer', 'scary', 'horror', 'nightmare', 'gore'],
#     # 'funny' : ['comedy', 'comedic', 'funny', 'laugh', 'laughter', 'hilarious', 'rowdy', 'laughs'],
#     # 'sad' : ['sad', 'breaking', 'crying', 'breakup', '']
# }

def clean_imdb_data():
    with open('movies(raw).json', 'r') as movie_file:
        movies = json.load(movie_file)

        clean_movie_file = open('movies(clean).json', 'a')
        clean_movie_file.write("[")

        for movie in movies:
            pretty_json = json.dumps(movie, indent=2)
            if (movie["Response"] == "True"):
                clean_movie_file.write(pretty_json + ",")
        
        clean_movie_file.write("]")

if __name__== "__main__":
    clean_imdb_data()

# run through 2017, 2018, and 2019 movies :)