from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from pydantic import BaseModel



app = FastAPI()
class Movie(BaseModel):
    id: int
    titulo : str
    año : int
    url : str
    description : str

moviesDict = [{"id":1,"titulo":"Juegos del hambre","año":2022,"url":"https://es.web.img2.acsta.net/pictures/210/455/21045552_20131001101323189.jpg","description":"hola"},
            {"id":2,"titulo":"Como entrenar a tu dragon","año":2010,"url":"https://es.web.img3.acsta.net/medias/nmedia/18/72/98/66/20235719.jpg","description":"Hipo, un vikingo adolescente, comienza las clases de entrenamiento con dragones y ve por fin una oportunidad para demostrar que es capaz de convertirse en guerrero cuando hace amistad con un dragón herido."},
            {"id":3,"titulo":"DEADPOOL AND WOLVERINE","año":2024,"url":"https://lumiere-a.akamaihd.net/v1/images/tidalwave_payoff_poster_las_0a47c6a2.jpeg","description":"hola"},
]

@app.get("/movies",tags=["MOVIES","GET"],status_code=200)
def get_data():
    return JSONResponse(status_code=200,content=jsonable_encoder(moviesDict))

@app.get("/movies/{id}",tags=["MOVIES","GET"],status_code=200)
def get_movie(id : int):
    for movie in moviesDict:
        if movie["id"] == id:
            return JSONResponse(status_code=200,content=jsonable_encoder(movie))
    return JSONResponse(status_code=404, content={"message":"Not found"})

@app.post('/movies', tags = ["MOVIES","POST"],status_code=201)
async def create_movie(movie:Movie):
    try:
        moviesDict.append(movie)
    except Exception as e:
        return JSONResponse(status_code=422,content={"message":f"No se puede procesar {e}"})
    return JSONResponse(status_code=201,content={"message": "Se ha creado el recurso correctamente"})

@app.put('/movies', tags = ["MOVIES","PUT"],status_code=201)
async def modify_movie(movie:Movie):
    for item in moviesDict:
        if(isinstance(item,Movie)):
            if(item.id == movie.id):
                item.titulo = movie.titulo
                item.año = movie.año
                item.url = movie.url
                item.description = movie.description
                
                return JSONResponse(status_code=200,content={"message":"Se modifico el recurso Correctamente"})
        elif item["id"] == movie.id:
            item["titulo"] = movie.titulo
            item["año"] = movie.año
            item["url"] = movie.url
            item["description"] = movie.description
            return JSONResponse(status_code=200,content={"message":"Se modifico el recurso Correctamente"})
    return JSONResponse(status_code=404,content={"message":"No se encontro la Pelicula"}) 
    

@app.delete('/movies/{id}',tags=["MOVIES","DELETE"],status_code=200)
async def delete_movie(id : int):
    for movie in moviesDict:
        if(isinstance(movie,Movie)):
            if(movie.id == id):
                moviesDict.remove(movie)
                return JSONResponse(status_code=200,content={"message":"Se elimino Correctamente"})
        elif movie["id"] == id:
            moviesDict.remove(movie)
            return JSONResponse(status_code=200,content={"message":"Se elimino Correctamente"})
    return JSONResponse(status_code=404,content={"message":"No se encontro la Pelicula"}) 