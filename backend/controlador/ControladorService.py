from modelo.movie import Movie as MovieModel
from vista.Esquema import Movie
from fastapi.responses import JSONResponse

class MovieService():
    def __init__(self, db):
        self.db = db
    
    def get_movies(self):
        result = self.db.query(MovieModel).all()
        return result
    
    def get_movie(self,id):
        result = self.db.query(MovieModel).filter(MovieModel.id == id).first()
        if not result:
            return JSONResponse(status_code=404,content={"message":"No se encontro la pelicula"})
        return result
        
    def post_movie(self,movie:Movie):
        newMovie = MovieModel(**movie.model_dump())
        self.db.add(newMovie)
        self.db.commit()
        return

    def put_movies(self,movie:Movie):
        result = self.db.query(MovieModel).filter(MovieModel.id == movie.id).first()
        if not result:
            return JSONResponse(status_code=404,content={"message":"No se encontro la pelicula"})
        result.id = movie.id
        result.titulo = movie.titulo
        result.año = movie.año
        result.url = movie.url
        result.description = movie.description
        self.db.commit()
    
    def delete_movie(self,id:int):
        result  = self.db.query(MovieModel).filter(MovieModel.id == id).first()
        if not result:
            return JSONResponse(status_code=404,content={"message":"No se encontro la pelicula"})
        self.db.delete(result)
        self.db.commit()
        
        