from database import Base
from sqlalchemy import Column, Integer, String, Boolean


class Notes(Base):
    __tablename__ = 'notes'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(String)
    priority = Column(Integer)
    complete = Column(Boolean, default=False)
