from modelo.config.database import Base
from sqlalchemy import Column,Integer,String

class Movie(Base):
    __tablename__ = "Movies"
    
    id = Column(Integer,primary_key=True)
    titulo = Column(String)    
    año = Column(Integer)
    url = Column(String)
    description = Column(String)
    