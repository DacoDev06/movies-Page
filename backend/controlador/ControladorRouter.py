from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from controlador.ControladorService import MovieService
from modelo.database import Session
from vista.Esquema import Movie
from modelo.mensajes import Mensajes

movie_router = APIRouter()


@movie_router.get("/movies",tags=["MOVIES","GET"],status_code=200)
def get_data():
    db = Session()
    result = MovieService(db).get_movies()
    if not result:
        return JSONResponse(status_code=200,content=jsonable_encoder([]))
    return JSONResponse(status_code=200,content=jsonable_encoder(result))

@movie_router.get("/movies/{id}",tags=["MOVIES","GET"],status_code=200)
def get_movie(id : int):
    db = Session()
    result = MovieService(db).get_movie(id)
    if not result:
        return JSONResponse(status_code=404,content={"message":f"{Mensajes.NOT_FOUND_ID} {id}"})
    return JSONResponse(status_code=200,content=jsonable_encoder(result))


@movie_router.post('/movies', tags = ["MOVIES","POST"],status_code=201)
async def create_movie(movie:Movie):
    db = Session()
    try:
        MovieService(db).post_movie(movie)
    except Exception as e:
        return JSONResponse(status_code=422,content={"message":f"{Mensajes.EXCEPTION_MESSAGE} {e}"})
    return JSONResponse(status_code=201,content={"message": f"{Mensajes.CREATE_MESSAGE}"})

@movie_router.put('/movies', tags = ["MOVIES","PUT"],status_code=201)
async def modify_movie(movie:Movie):
    db = Session()
    try:
        MovieService(db).put_movies(movie)
    except Exception as e:
        return JSONResponse(status_code=422,content={"message":f"{Mensajes.EXCEPTION_MESSAGE} {e}"})
    return JSONResponse(status_code=201,content={"message": f"{Mensajes.MODIFY_MESSAGE}"})
    

@movie_router.delete('/movies/{id}',tags=["MOVIES","DELETE"],status_code=200)
async def delete_movie(id : int):
    db = Session()
    try:
        MovieService(db).delete_movie(id)    
    except Exception as e:
        return JSONResponse(status_code=422,content={"message":f"{Mensajes.EXCEPTION_MESSAGE} {e}"})
    return JSONResponse(status_code=201,content={"message": f"{Mensajes.DELETE_MESSAGE}"})
