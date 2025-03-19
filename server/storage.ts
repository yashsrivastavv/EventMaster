import { events, type Event, type InsertEvent } from "@shared/schema";
import { type EventFilter } from "@shared/schema";

export interface IStorage {
  createEvent(event: InsertEvent): Promise<Event>;
  getEvents(filter?: EventFilter): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
}

export class MemStorage implements IStorage {
  private events: Map<number, Event>;
  private currentId: number;

  constructor() {
    this.events = new Map();
    this.currentId = 1;
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.currentId++;
    const now = new Date();
    
    const event: Event = {
      ...insertEvent,
      id,
      status: "upcoming"
    };
    
    this.events.set(id, event);
    return event;
  }

  async getEvents(filter?: EventFilter): Promise<Event[]> {
    let events = Array.from(this.events.values());
    
    if (filter?.status) {
      events = events.filter(event => event.status === filter.status);
    }
    
    if (filter?.duration) {
      events = events.filter(event => {
        const duration = event.duration;
        switch (filter.duration) {
          case 'short': return duration <= 120;
          case 'medium': return duration > 120 && duration <= 360;
          case 'long': return duration > 360;
          default: return true;
        }
      });
    }
    
    return events;
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }
}

export const storage = new MemStorage();
