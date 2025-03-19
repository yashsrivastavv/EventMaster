import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Event } from "@shared/schema";
import { format } from "date-fns";
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from "lucide-react";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const statusColors = {
    upcoming: "bg-blue-500",
    ongoing: "bg-green-500",
    completed: "bg-gray-500"
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="relative">
        <Badge
          className={`absolute top-4 right-4 ${statusColors[event.status]}`}
        >
          {event.status}
        </Badge>
        <CardTitle>{event.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarIcon className="h-4 w-4" />
          <span>{format(new Date(event.startDate), "PPP")}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ClockIcon className="h-4 w-4" />
          <span>{event.duration} minutes</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPinIcon className="h-4 w-4" />
          <span>{event.location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <UsersIcon className="h-4 w-4" />
          <span>{event.guestCapacity} guests</span>
        </div>

        <p className="text-sm line-clamp-2">{event.description}</p>
      </CardContent>
    </Card>
  );
}
