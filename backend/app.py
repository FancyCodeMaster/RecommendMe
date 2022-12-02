from flask import Flask , request , jsonify , session
import bcrypt
from flask_mysqldb import MySQL , MySQLdb
import pandas as pd
from flask_cors import CORS
import json
import pickle
#to check the similarity between searched movie in the search bar and from the dataset
from difflib import SequenceMatcher
# from models import db , User , WatchList
# from config import AppConfig


movies_file = pickle.load(open('movies.pkl' , 'rb' ))
similarity_score_file = pickle.load(open('similarity_score.pkl' , 'rb'))

app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:'rikeshsilwal'@localhost/rmdb"
app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'rmdb'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)

CORS(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:@localhost/recommendme"
# app.config.from_object(AppConfig)


# db.init_app(app)
# with app.app_context():
#     db.create_all()

@app.route("/register" , methods=['GET','POST'])
def register_user():
    name = request.json['name']
    email = request.json["email"]
    password = request.json["password"].encode('utf-8')

    hash_password = bcrypt.hashpw(password , bcrypt.gensalt())

    cur = mysql.connection.cursor()
    cur.execute('''INSERT INTO users(email , name , password) values(%s , %s , %s)''' , (email , name , hash_password))
    mysql.connection.commit()
    session['email'] = email
    session['name'] = name

    return jsonify({
        "name" : name,
        "email" : email
    })

@app.route("/login" , methods=['GET' , 'POST'])
def login_user():
    email = request.json["email"]
    password = request.json["password"].encode('utf-8')


    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute('''SELECT * FROM users WHERE email=%s''' , (email,))
    user = cur.fetchone()
    cur.close()

    if type(user) != 'NoneType':
        if bcrypt.checkpw(password , user['password'].encode('utf-8')):
            print(user['name'])
            session["name"] = user['name']
            session["email"] = user['email']
            return jsonify({"name" : user['name'] , "email" : user['email']})
        else:
            return jsonify({"error" : 'wrong password or user not match'})
    else:
        return jsonify({"error" : 'wrong password or user not match'})

# @app.route('/updateWatchList' , methods=['GET' , 'POST'])
# def update_watchlist():
#     id = request.json['movieId']
#     title = request.json['movieTitle']
#     src = request.json['imgSrc']
#     email = request.json['email']

#     cur = mysql.connection.cursor()
#     cur.execute('''INSERT INTO watchlist(id , title , src , email) values(%s , %s , %s , %s)''' , (id , title , src , email))
#     mysql.connection.commit()
#     # session['email'] = email
#     # session['name'] = name

#     return jsonify({
#         "movieId" : id,
#         "movieTitle" : title,
#         "imgSrc" : src 
#     })

    
@app.route("/checkEmailBeforeRegister" , methods=['GET' , 'POST'])
def checkEmail():
    email = request.json['email']

    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute('''SELECT * FROM users WHERE email=%s''' , (email,))
    user = cur.fetchone()
    cur.close()

    if user:
        if(len(user) > 0):
            return jsonify({"msg" : '0'})
        elif type(user) == 'NoneType':
            return jsonify({"msg" : '1'})
        else:
            pass
    else:
        return jsonify({"msg" : '1'})
    

def get_high_rating_movies(dataset):
    high_rating_movies = []

    for i in dataset.index:
        if dataset._get_value(i , 'imdb_score') > 8.5:
            high_rating_movies.append(i)

    movies_name = []
    for j in high_rating_movies:
        movies_name.append({str(dataset._get_value(j , 'movie_id')) : [dataset._get_value(j , 'original_title') , dataset._get_value(j , 'img_source')]})

    return {
        "top_18_movies" : movies_name
    }

def recommend_movies(movie_id):
    # movie_id = int(id)
    movie_id = int(movie_id)

    movie_id = movies_file[movies_file['movie_id']==movie_id].index[0]
    
    calculate = sorted(list(enumerate(similarity_score_file[movie_id])), reverse=True, key=lambda x: x[1])

    movies_list = []
    for i in calculate[1:10]:
        # movie_details = []

        # movie_details.append((movies_file.iloc[i[0]].movie_id))
        # movie_details.append((movies_file.iloc[i[0]].original_title))
        # movie_details.append((movies_file.iloc[i[0]].img_source))

        m_id = movies_file.iloc[i[0]].movie_id
        movie_original_title = movies_file.iloc[i[0]].original_title
        movie_img_source = movies_file.iloc[i[0]].img_source

        movies_list.append({str(m_id) : [movie_original_title , movie_img_source]})
        # print(movies.iloc[i[0]].original_title)
    return movies_list

dataset = pd.read_csv('./movies.csv')
def get_movie_info(movie_id):
    original_title = ''
    img_source = ''
    imdb_score = ''
    overview = ''
    genres = ''
    for i in dataset.index:
        if dataset._get_value(i,'movie_id') == movie_id:
            original_title = dataset._get_value(i,'original_title')
            img_source = dataset._get_value(i,'img_source')
            imdb_score = dataset._get_value(i , 'imdb_score')
            overview = dataset._get_value(i , 'overview')
            genres = dataset._get_value(i , 'genres')

    return movie_id , original_title , img_source , imdb_score , overview , genres

def get_movies_details(movies_id):
    send_recommended_movies = []
    for id in movies_id:
        similar_movies = []
        movie_id , original_title , img_source , imdb_score , overview , genres = get_movie_info(id)
        similar_movies = recommend_movies(movie_id)
        send_recommended_movies.append({movie_id : [original_title , img_source , imdb_score , overview , genres , similar_movies]})
    return send_recommended_movies


# @app.route("/allMovies")
# def get_all_movies():
#     all_movies_id = dataset['movie_id'].to_list()
#     all_movies_info = get_movies_details(all_movies_id)
#     return json.dumps({"all_movies" : all_movies_info})


@app.route('/giveIdDetails/<int:id>')
def give_id_details(id):
    movie_details = []
    similar_movies = []
    movie_id , original_title , img_source , imdb_score , overview , genres = get_movie_info(id)
    similar_movies = recommend_movies(movie_id)
    movie_details.append({movie_id : [original_title , img_source , imdb_score , overview , genres , similar_movies]})
    return json.dumps({"movie_details" : movie_details})

@app.route('/searchBarMovie/<string:title>')
def getSearchedMovie(title):
    search_similar_movies = []
    for i in dataset.index:
        if str.lower(title) == str.lower(dataset._get_value(i , 'original_title')[0:len(title)]):
            search_similar_movies.append({str(dataset._get_value(i,'movie_id')) : [dataset._get_value(i,'original_title') , dataset._get_value(i,'img_source')]})
    if len(search_similar_movies) > 0:
        return json.dumps({"search_similar_movies" : search_similar_movies})
    else:
        return 'no such movies'


    

send_recommended_movies = []
@app.route("/moviesSent" , methods=['GET','POST'])
def get_movies_recommended():
    # content_type = request.headers.get('Content-Type')
    movies = request.json
    data = movies['data']
    print(type(data))
    print("data is : " , data)
    all_rec_movies = []
    # movies_id_list = [int(movies) for movies in movies_id_list]
    for id in data:
        rec_movies = recommend_movies(id)
        all_rec_movies.append(rec_movies)
    # print(all_rec_movies)
    # print(type(movies_id_list))
    # return str(type(movies_id_list))
    movies_id = []
    for i in all_rec_movies:
        for j in i:
            for k in j:
                movies_id.append(k)
    movies_id = [int(movie) for movie in movies_id]
    movies_id = list(set(movies_id))
    movies_id.sort()
    
    # print("movies_id" , movies_id)

    print("movies_id" , len(movies_id))

    # count = 0
    # for id in movies_id:
    #     # count += 1
    #     movie_id , original_title , img_source , imdb_score , overview , genres = get_movie_info(id)
    #     send_recommended_movies.append({movie_id : [original_title , img_source , imdb_score , overview , genres]})
    #     # print("movies count" , len(send_recommended_movies))
    #     # print("loop count" , count)

    # movie_id , original_title , img_source , imdb_score , overview , genres = get_movie_info(movies_id)
    # send_recommended_movies.append({movie_id : [original_title , img_source , imdb_score , overview , genres]})
    # print("recommendedmovies" , recommended_movies)

    global send_recommended_movies

    send_recommended_movies = get_movies_details(movies_id)

    print("sendrecommendedmovies" , len(send_recommended_movies))

    
    return json.dumps({"send_recommended_movies" : send_recommended_movies})

    # return json.dumps({"movies_id" : movies_id})


    # if content_type == 'application/json':
    #     # movies = recommend_movies(movies_id_list)
    #     return json.dumps(movies)
    # else:
    #     return 'Content Type not supported'

@app.route("/getRecommendedMovies")
def getRecMovies():
    # print("sendrecommendedmovies" , send_recommended_movies)
    # print("movies sent in getRec" , len(send_recommended_movies))
    if(len(send_recommended_movies) > 0):
        print("movies sent in getRec" , len(send_recommended_movies))
        return json.dumps({"send_recommended_movies" : send_recommended_movies})

    return "No movies recommended"
    


@app.route("/")
def main():
    dataset = pd.read_csv("E:/React Projects/recommend-me/backend/movies.csv")

    high_rating_movies = get_high_rating_movies(dataset)

    return json.dumps(high_rating_movies)



if __name__ == "__main__":
    app.secret_key = "123!@#$%^&*()"
    app.run(debug = True)