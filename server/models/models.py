from database import Base
from sqlalchemy import Column, Integer, String, Boolean


class Note(Base):
    __tablename__ = 'note'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(String)
    priority = Column(Integer)
    complete = Column(Boolean, default=False)
