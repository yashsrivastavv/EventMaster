from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict
import json
from .event_bot import EventBot, EventState

app = FastAPI()
bot = EventBot()
sessions: Dict[str, EventState] = {}

class ChatMessage(BaseModel):
    session_id: str
    message: str

@app.post("/chat")
async def chat(chat_message: ChatMessage):
    session_id = chat_message.session_id
    
    if session_id not in sessions:
        sessions[session_id] = EventState()
        return {"message": bot.get_initial_question()}
    
    response, updated_state = bot.process_input(chat_message.message, sessions[session_id])
    sessions[session_id] = updated_state
    
    if updated_state.current_step == "complete":
        return {
            "message": response,
            "event_data": bot.get_event_data(updated_state)
        }
    
    return {"message": response}

@app.delete("/chat/{session_id}")
async def end_chat(session_id: str):
    if session_id in sessions:
        del sessions[session_id]
    return {"message": "Chat session ended"}