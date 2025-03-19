from dataclasses import dataclass
from typing import List, Optional
from datetime import datetime

@dataclass
class EventState:
    name: Optional[str] = None
    date: Optional[datetime] = None
    time: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    duration: Optional[int] = None
    guests: List[str] = None
    current_step: str = "name"

    def __post_init__(self):
        if self.guests is None:
            self.guests = []

class EventBot:
    def __init__(self):
        self.conversation_flow = {
            "name": {
                "question": "What's the name of your event?",
                "next": "date"
            },
            "date": {
                "question": "What date would you like to schedule the event for? (YYYY-MM-DD)",
                "next": "time"
            },
            "time": {
                "question": "What time should the event start? (HH:MM)",
                "next": "duration"
            },
            "duration": {
                "question": "How long will the event last? (in minutes)",
                "next": "location"
            },
            "location": {
                "question": "Where will the event take place?",
                "next": "description"
            },
            "description": {
                "question": "Please provide a brief description of the event:",
                "next": "guests"
            },
            "guests": {
                "question": "Would you like to add any guest emails? (Enter email or 'done' to finish)",
                "next": "complete"
            }
        }

    def process_input(self, user_input: str, state: EventState) -> tuple[str, EventState]:
        current_step = state.current_step
        
        if current_step == "name":
            state.name = user_input
        elif current_step == "date":
            try:
                state.date = datetime.strptime(user_input, "%Y-%m-%d")
            except ValueError:
                return "Please enter a valid date in YYYY-MM-DD format.", state
        elif current_step == "time":
            state.time = user_input
        elif current_step == "duration":
            try:
                duration = int(user_input)
                if duration < 30 or duration > 1440:
                    return "Duration must be between 30 and 1440 minutes.", state
                state.duration = duration
            except ValueError:
                return "Please enter a valid number of minutes.", state
        elif current_step == "location":
            state.location = user_input
        elif current_step == "description":
            state.description = user_input
        elif current_step == "guests":
            if user_input.lower() != 'done':
                if '@' not in user_input:
                    return "Please enter a valid email address or 'done' to finish.", state
                state.guests.append(user_input)
                return self.conversation_flow[current_step]["question"], state

        next_step = self.conversation_flow[current_step]["next"]
        state.current_step = next_step

        if next_step == "complete":
            return "Great! I have all the information needed. Would you like me to create this event?", state
        
        return self.conversation_flow[next_step]["question"], state

    def get_initial_question(self) -> str:
        return self.conversation_flow["name"]["question"]

    def get_event_data(self, state: EventState) -> dict:
        return {
            "name": state.name,
            "startDate": state.date.isoformat() if state.date else None,
            "time": state.time,
            "duration": state.duration,
            "location": state.location,
            "description": state.description,
            "guestCapacity": len(state.guests) + 5,  # Adding buffer
            "guests": state.guests,
            "agenda": ["Event created via chatbot"]
        }