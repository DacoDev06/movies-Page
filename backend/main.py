from fastapi import FastAPI
from fastapi.responses import JSONResponse
from modelo.database import Base,engine
from controlador.ControladorRouter import movie_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/",tags=["HOME"],status_code=200)

def home():
    return JSONResponse(status_code=200,content={"message":"Bienvenido a la API de movies"})

app.include_router(movie_router)