from database import Base
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String, unique=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    admin = Column(Boolean, default=False)


class Note(Base):
    __tablename__ = 'note'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(String)
    priority = Column(Integer)
    complete = Column(Boolean, default=False)
    author_id = Column(Integer, ForeignKey(
        'user.id', ondelete='CASCADE', onupdate='CASCADE'))
