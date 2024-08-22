from pydantic import BaseModel,Field
from typing import Optional


class Movie(BaseModel):
    id: int
    titulo : str
    año : int 
    url : str
    description : str
    class Config: 
        json_schema_extra = {
            "example": {
                "id": 0,
                "titulo": "Nombre Pelicula",
                "año":2004,
                "url":"Url de la imagen",
                "description":"Descripcion de la imagen"
            }
        }