import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEventSchema, eventFilterSchema } from "@shared/schema";
import { ZodError } from "zod";
import fetch from "node-fetch";
const CHATBOT_URL = "http://localhost:8000";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/events", async (req, res) => {
    try {
      const eventData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(eventData);
      res.json(event);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid event data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create event" });
      }
    }
  });

  app.get("/api/events", async (req, res) => {
    try {
      const filter = eventFilterSchema.parse(req.query);
      const events = await storage.getEvents(filter);
      res.json(events);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid filter parameters", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to fetch events" });
      }
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getEvent(id);
      
      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }
      
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const response = await fetch(`${CHATBOT_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to process chat message" });
    }
  });

  app.delete("/api/chat/:sessionId", async (req, res) => {
    try {
      const response = await fetch(`${CHATBOT_URL}/chat/${req.params.sessionId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to end chat session" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
