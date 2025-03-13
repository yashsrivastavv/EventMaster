import { useQuery } from "@tanstack/react-query";
import { type Event, type EventFilter } from "@shared/schema";
import { EventCard } from "@/components/event-card";
import { EventFilter as EventFilterComponent } from "@/components/event-filter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { PlusIcon } from "lucide-react";

export default function Events() {
  const [filter, setFilter] = useState<EventFilter>({});

  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events", filter],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Events</h1>
        <div className="flex items-center gap-4">
          <EventFilterComponent value={filter} onChange={setFilter} />
          <Link href="/create-event">
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events?.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {events?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No events found</p>
        </div>
      )}
    </div>
  );
}