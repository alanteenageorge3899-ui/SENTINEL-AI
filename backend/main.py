
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from agents.website_agent import analyze_website

app = FastAPI(title="SentinelAI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class WebsiteRequest(BaseModel):
    url: HttpUrl


@app.get("/")
def home():
    return {"message": "SentinelAI backend is running!"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.post("/analyze")
def analyze(request: WebsiteRequest):
    try:
        result = analyze_website(str(request.url))
        return result
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))
