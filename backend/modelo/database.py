import os
from sqlalchemy import create_engine
from sqlalchemy.orm.session import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

sqlite_file_name = "./database.sqlite"
#obtiene la ruta del directorio donde se encuentra database.py
base_dir = os.path.dirname(os.path.realpath(__file__))

#Construye la url a la base de datos
#combina la ruta del archivo, con el nombre que va a tener la base de datos
database_url = f"sqlite:///{os.path.join(base_dir,sqlite_file_name)}"

#Esta línea crea el motor de la base de datos, que es el objeto principal 
#para interactuar con la base de datos en SQLAlchemy.
engine = create_engine(database_url,echo = True)


#Esta línea crea una fábrica de sesiones, que se utiliza para crear 
#instancias de Session en SQLAlchemy.
Session = sessionmaker(bind=engine)


#Crea una clase base a partir de la cual todos los modelos heredarán.
Base = declarative_base()

