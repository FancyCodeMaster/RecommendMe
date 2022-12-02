from flask_sqlalchemy import SQLAlchemy
# import uuid

db = SQLAlchemy()

# def get__uuid():
#     return uuid.uuid4().hex

class User(db.Model):
    tablename = "users"
    # id = db.Column(db.String(32) , primary_key=True , unique=True , default=get_uuid)
    name = db.Column(db.String(30) , nullable = False)
    email = db.Column(db.String(345) , unique=True , nullable=False , primary_key=True)
    password = db.Column(db.Text , nullable=False)
    movies = db.relationship('WatchList' , backref='movies')

class WatchList(db.Model):
    tablename = "watchlist"
    email = db.Column(db.String(345) , db.ForeignKey('user.email'))
    id = db.Column(db.String(32) , primary_key=True , unique=True)
    movie_title = db.Column(db.String(300) , nullable=False)
    img_src = db.Column(db.String(500) , unique=True , nullable=False)



