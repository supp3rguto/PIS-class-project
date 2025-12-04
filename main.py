from fastapi import FastAPI, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import models
import schemas
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/mensagens", response_model=List[schemas.Messages], status_code=status.HTTP_200_OK)
async def buscar_valores(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    mensagens = db.query(models.Model_Message).offset(skip).limit(limit).all()
    return mensagens

@app.post("/mensagens/", status_code=status.HTTP_201_CREATED)
def criar_mensagem(nova_mensagem: schemas.Messages, db_session: Session = Depends(get_db)):
    mensagem_criada = models.Model_Message(**nova_mensagem.model_dump())
    db_session.add(mensagem_criada)
    db_session.commit()
    db_session.refresh(mensagem_criada)
    return mensagem_criada