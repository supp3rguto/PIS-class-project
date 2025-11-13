from pydantic import BaseModel

class Messages(BaseModel):
    title: str
    content: str
    published: bool = True