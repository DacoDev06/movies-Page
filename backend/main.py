from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from modelo.config.database import Session,Base,engine
from modelo.models.movie import Movie as MovieModel
from controlador.services.movie import MovieService
from pydantic import BaseModel
from vista.schemas.movie import Movie


app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/",tags=["HOME"],status_code=200)
def home():
    return JSONResponse(status_code=200,content={"message":"Bienvenido a la API de movies"})

@app.get("/movies",tags=["MOVIES","GET"],status_code=200)
def get_data():
    db = Session()
    result = MovieService(db).get_movies()
    if not result:
        return JSONResponse(status_code=200,content=jsonable_encoder([]))
    return JSONResponse(status_code=200,content=jsonable_encoder(result))

@app.get("/movies/{id}",tags=["MOVIES","GET"],status_code=200)
def get_movie(id : int):
    db = Session()
    result = MovieService(db).get_movie(id)
    return JSONResponse(status_code=200,content=jsonable_encoder(result))


@app.post('/movies', tags = ["MOVIES","POST"],status_code=201)
async def create_movie(movie:Movie):
    db = Session()
    try:
        MovieService(db).post_movie(movie)
    except Exception as e:
        return JSONResponse(status_code=422,content={"message":f"No se puede procesar {e}"})
    return JSONResponse(status_code=201,content={"message": "Se ha creado el recurso correctamente"})

@app.put('/movies', tags = ["MOVIES","PUT"],status_code=201)
async def modify_movie(movie:Movie):
    db = Session()
    try:
        MovieService(db).put_movies(movie)
    except Exception as e:
        return JSONResponse(status_code=422,content={"message":f"No se puede procesar {e}"})
    return JSONResponse(status_code=201,content={"message": "Se ha MODIFICADO el recurso correctamente"})
    

@app.delete('/movies/{id}',tags=["MOVIES","DELETE"],status_code=200)
async def delete_movie(id : int):
    db = Session()
    try:
        MovieService(db).delete_movie(id)    
    except Exception as e:
        return JSONResponse(status_code=422,content={"message":f"No se puede procesar {e}"})
    return JSONResponse(status_code=201,content={"message": "Se ha ELIMINADO el recurso correctamente"})
