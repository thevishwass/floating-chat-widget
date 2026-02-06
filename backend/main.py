from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    user_name: str | None = None

@app.get("/")
def root():
    return {"status": "FastAPI running"}

@app.post("/chat")
def chat(req: ChatRequest):
    msg = req.message.lower()

    if "price" in msg:
        reply = "Our plans start from ₹999 per month."
    elif "feature" in msg:
        reply = "We offer automation, AI chatbots, and analytics."
    elif "contact" in msg:
        reply = "Please share your email and our team will reach out."
    else:
        reply = "Can you please tell me more?"

    return {
        "reply": reply
    }
