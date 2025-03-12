import { pgTable, text, serial, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  startDate: timestamp("start_date").notNull(),
  duration: integer("duration").notNull(), // in minutes
  location: text("location").notNull(),
  description: text("description").notNull(),
  guestCapacity: integer("guest_capacity").notNull(),
  guests: jsonb("guests").$type<string[]>().notNull(),
  agenda: jsonb("agenda").$type<string[]>().notNull(),
  status: text("status", { enum: ["upcoming", "ongoing", "completed"] }).notNull().default("upcoming"),
});

export const insertEventSchema = createInsertSchema(events)
  .pick({
    name: true,
    startDate: true,
    duration: true,
    location: true,
    description: true,
    guestCapacity: true,
    guests: true,
    agenda: true
  })
  .extend({
    startDate: z.coerce.date(),
    duration: z.number().min(30).max(1440),
    guestCapacity: z.number().min(1).max(1000),
    guests: z.array(z.string().email()),
    agenda: z.array(z.string()).min(1)
  });

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

export const eventFilterSchema = z.object({
  duration: z.enum(['short', 'medium', 'long']).optional(),
  status: z.enum(['upcoming', 'ongoing', 'completed']).optional()
});

export type EventFilter = z.infer<typeof eventFilterSchema>;